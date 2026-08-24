"""
notes2blog — turn photos of handwritten notes into a tagged Jekyll blog post.

Flow:  upload images -> Claude vision transcribes + drafts -> you edit & preview
       -> "Approve & Publish" writes _posts/*.md, commits and pushes.

Run:   cd tools/notes2blog && ./run.sh
"""

from __future__ import annotations

import base64
import datetime as dt
import io
import json
import os
import re
import secrets
import subprocess
import unicodedata
from pathlib import Path
from typing import Any

import httpx
import markdown as md
import yaml
from dotenv import load_dotenv
from fastapi import FastAPI, Form, HTTPException, Request, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:  # pragma: no cover - degrade gracefully if not installed
    pillow_heif = None

# --------------------------------------------------------------------------
# config
# --------------------------------------------------------------------------

HERE = Path(__file__).resolve().parent
load_dotenv(HERE / ".env")

REPO_ROOT = Path(os.getenv("SITE_REPO", HERE.parent.parent)).resolve()
POSTS_DIR = REPO_ROOT / "_posts"
IMAGES_DIR = REPO_ROOT / "images" / "notes"

API_KEY = os.getenv("ANTHROPIC_API_KEY", "").strip()
API_URL = "https://api.anthropic.com/v1/messages"
API_VERSION = "2023-06-01"

# Tried in order; the first one the API accepts is cached for the process.
MODEL_CANDIDATES = [
    m.strip()
    for m in os.getenv(
        "ANTHROPIC_MODEL",
        "claude-sonnet-4-5,claude-sonnet-4-20250514,claude-3-7-sonnet-latest,claude-3-5-sonnet-latest",
    ).split(",")
    if m.strip()
]

PUBLISH_BRANCH = os.getenv("PUBLISH_BRANCH", "").strip()  # empty = current branch
AUTO_PUSH = os.getenv("AUTO_PUSH", "true").lower() not in ("0", "false", "no")
MAX_EDGE = 1568  # Anthropic's recommended max image edge

_resolved_model: str | None = None

app = FastAPI(title="notes2blog")

# --------------------------------------------------------------------------
# local-origin guard
#
# This process can commit and push to git and spend API credits, so any
# browser reachable at all — including a page from an unrelated origin that
# a malicious site DNS-rebinds to 127.0.0.1 — must not be able to drive it.
# Binding uvicorn to 127.0.0.1 only keeps *other machines* out; it does
# nothing against a same-machine browser tab making a fetch() here. Three
# independent checks guard the mutating/expensive routes below: the Host
# header must name this exact origin (defeats a rebound hostname), the
# Origin header (browsers always send it on POST fetches, and can't be
# spoofed by page script) must match too (defeats the case where the
# attacker page fetches 127.0.0.1 directly by IP), and a random per-process
# token — never exposed to any origin but this one's own served HTML — is
# required as a header on every call, as a backstop if either header check
# is ever bypassed.
# --------------------------------------------------------------------------

RUN_TOKEN = secrets.token_urlsafe(32)
TOKEN_HEADER = "x-notes2blog-token"

_PORT = os.getenv("PORT", "8765").strip()
ALLOWED_HOSTS = {f"127.0.0.1:{_PORT}", f"localhost:{_PORT}"}
ALLOWED_ORIGINS = {f"http://127.0.0.1:{_PORT}", f"http://localhost:{_PORT}"}
GUARDED_PATHS = {"/api/publish", "/api/transcribe"}

print(f"→ per-run auth token (the page injects this for you automatically): {RUN_TOKEN}")


@app.middleware("http")
async def guard_local_origin(request: Request, call_next):
    if request.url.path in GUARDED_PATHS:
        if request.headers.get("host", "") not in ALLOWED_HOSTS:
            return JSONResponse({"detail": "Forbidden: unexpected Host header."}, status_code=403)
        origin = request.headers.get("origin")
        if origin is not None and origin not in ALLOWED_ORIGINS:
            return JSONResponse({"detail": "Forbidden: unexpected Origin header."}, status_code=403)
        token = request.headers.get(TOKEN_HEADER, "")
        if not secrets.compare_digest(token, RUN_TOKEN):
            return JSONResponse({"detail": "Forbidden: missing or invalid token."}, status_code=403)
    return await call_next(request)


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------


def slugify(text: Any) -> str:
    text = str(text if text is not None else "")
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-") or "untitled"


def coerce_tags(raw: Any, limit: int | None = None) -> list[str]:
    """Normalise an untrusted 'tags' value into a deduped slug list.

    Both the model's JSON and the browser payload land here, so a bare string
    must become one tag rather than iterating into one tag per character, and
    any non-list shape degrades to no tags instead of raising. `limit` caps the
    model's suggestions; the user's own edited list is left uncapped.
    """
    if isinstance(raw, str):
        raw = [raw]
    elif not isinstance(raw, list):
        raw = []
    out: list[str] = []
    for t in raw:
        if not str(t).strip():
            continue
        slug = slugify(t)
        if slug not in out:
            out.append(slug)
    return out[:limit] if limit is not None else out


def existing_tags() -> list[str]:
    """Collect tags already used on the site so the model reuses them."""
    tags: dict[str, int] = {}
    for p in POSTS_DIR.glob("*.md") if POSTS_DIR.exists() else []:
        try:
            raw = p.read_text(encoding="utf-8")
            if not raw.startswith("---"):
                continue
            fm = yaml.safe_load(raw.split("---", 2)[1]) or {}
            for t in fm.get("tags") or []:
                tags[str(t)] = tags.get(str(t), 0) + 1
        except Exception:
            continue
    return [t for t, _ in sorted(tags.items(), key=lambda kv: -kv[1])]


def encode_image(data: bytes) -> dict[str, Any]:
    """Downscale, strip EXIF rotation, and base64-encode as JPEG."""
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    if max(img.size) > MAX_EDGE:
        img.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=88, optimize=True)
    return {
        "type": "image",
        "source": {
            "type": "base64",
            "media_type": "image/jpeg",
            "data": base64.standard_b64encode(buf.getvalue()).decode(),
        },
    }


def call_claude(blocks: list[dict], system: str, max_tokens: int = 4096) -> str:
    global _resolved_model
    if not API_KEY:
        raise HTTPException(
            400,
            "ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.",
        )

    candidates = [_resolved_model] if _resolved_model else MODEL_CANDIDATES
    last_err = ""
    for model in candidates:
        payload = {
            "model": model,
            "max_tokens": max_tokens,
            "system": system,
            "messages": [{"role": "user", "content": blocks}],
        }
        try:
            r = httpx.post(
                API_URL,
                json=payload,
                timeout=240.0,
                headers={
                    "x-api-key": API_KEY,
                    "anthropic-version": API_VERSION,
                    "content-type": "application/json",
                },
            )
        except httpx.HTTPError as e:
            raise HTTPException(502, f"Could not reach the Anthropic API: {e}")

        if r.status_code == 200:
            _resolved_model = model
            body = r.json()
            return "".join(
                b.get("text", "") for b in body.get("content", []) if b.get("type") == "text"
            )

        try:
            last_err = r.json().get("error", {}).get("message", r.text)
        except Exception:
            last_err = r.text
        # 404 = unknown model, try the next candidate. Anything else is fatal.
        if r.status_code != 404:
            raise HTTPException(r.status_code, f"Anthropic API error: {last_err}")

    raise HTTPException(
        502,
        f"No usable model. Tried: {', '.join(MODEL_CANDIDATES)}. "
        f"Last error: {last_err}. Set ANTHROPIC_MODEL in .env.",
    )


SYSTEM_PROMPT = """You are the writing assistant for Jalem Raj Rohit, a data and \
machine learning engineer who blogs at jrajrohit.me.

You are given photographs of his handwritten notes, in order. Your job:

1. TRANSCRIBE the handwriting faithfully first, in your head. Handle arrows, boxes,
   marginalia, crossed-out text (ignore crossed-out material), bullet trees, diagrams
   and equations. If several pages are given they are ONE continuous train of thought
   in the order supplied.
2. WORK OUT THE ARGUMENT. Notes are compressed. Find the actual claim, the supporting
   points, and the conclusion. Do not invent facts, numbers, benchmarks, citations,
   library names or anecdotes that are not in the notes. If something is illegible or
   incomplete, use the marker [?] inline rather than guessing.
3. WRITE THE POST as finished prose in his voice: direct, technically literate,
   unpretentious, short paragraphs, dry humour used sparingly, no marketing language,
   no "In today's fast-paced world", no "delve", no bulleted summary of what you just
   said. Prefer concrete specifics over abstraction. Use `##` for section headings
   (never `#` — the title is rendered separately), fenced code blocks with a language
   for any code, and markdown tables where they genuinely help.
4. If a diagram appears in the notes, describe its content in prose or reproduce it as
   an ASCII/mermaid-free code block — do not reference "the image".

Return ONLY a single JSON object, no prose around it, no markdown fence:

{
  "title":       "Sentence-case title, under 70 chars, specific not clickbait",
  "slug":        "url-safe-slug",
  "description": "One sentence, under 160 chars, for meta tags and post lists",
  "tags":        ["3-5 lowercase-hyphenated tags"],
  "body":        "The full post in markdown, starting with a paragraph (no title, no front matter)",
  "confidence":  "high | medium | low",
  "notes":       "Anything you couldn't read, guessed at, or think he should check"
}"""


def extract_json(text: str) -> dict:
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    # Fall back to locating the first '{' and decoding from there. raw_decode
    # respects JSON string quoting/escaping, so braces inside string values
    # (a code block in the post body, "function() { }" in transcribed text)
    # don't throw off where the object actually ends the way a naive
    # brace-counting scan would.
    start = text.find("{")
    if start == -1:
        raise HTTPException(502, f"Model did not return JSON:\n\n{text[:800]}")
    try:
        obj, _ = json.JSONDecoder().raw_decode(text, start)
        return obj
    except json.JSONDecodeError as e:
        # A response cut off mid-object either runs out of input right where
        # the error is raised (pos lands at/near the end of the text) or ends
        # inside an open string literal ("Unterminated string..."); anything
        # else is JSON that's simply malformed, not just incomplete.
        if e.msg.startswith("Unterminated string") or e.pos >= len(text) - 1:
            raise HTTPException(502, f"Truncated JSON from model:\n\n{text[:800]}")
        raise HTTPException(502, f"Malformed JSON from model: {e}")


def git(*args: str) -> str:
    r = subprocess.run(
        ["git", *args], cwd=REPO_ROOT, capture_output=True, text=True, timeout=180
    )
    if r.returncode != 0:
        err = r.stderr or r.stdout
        if "Author identity unknown" in err or "unable to auto-detect email" in err:
            raise HTTPException(
                500,
                "git doesn't know who you are. Run this once in the repo:\n"
                '  git config user.name "Jalem Raj Rohit"\n'
                '  git config user.email "jrajrohit33@gmail.com"',
            )
        if "could not read Username" in err or "Authentication failed" in err:
            raise HTTPException(
                500,
                "The post was committed but the push failed — git couldn't authenticate "
                "to GitHub. Push manually, or set up a credential helper / SSH remote.\n\n"
                + err,
            )
        raise HTTPException(500, f"git {' '.join(args)} failed:\n{err}")
    return r.stdout.strip()


# --------------------------------------------------------------------------
# routes
# --------------------------------------------------------------------------


@app.get("/", response_class=HTMLResponse)
def index() -> str:
    html = (HERE / "static" / "index.html").read_text(encoding="utf-8")
    return html.replace("__NOTES2BLOG_TOKEN__", RUN_TOKEN)


@app.get("/api/status")
def status() -> dict:
    try:
        branch = git("rev-parse", "--abbrev-ref", "HEAD")
    except Exception:
        branch = "unknown"
    return {
        "repo": str(REPO_ROOT),
        "branch": branch,
        "publish_branch": PUBLISH_BRANCH or branch,
        "auto_push": AUTO_PUSH,
        "key_set": bool(API_KEY),
        "known_tags": existing_tags(),
        "post_count": len(list(POSTS_DIR.glob("*.md"))) if POSTS_DIR.exists() else 0,
    }


@app.post("/api/transcribe")
async def transcribe(
    files: list[UploadFile], instructions: str = Form("")
) -> JSONResponse:
    if not files:
        raise HTTPException(400, "No images uploaded.")
    if len(files) > 20:
        raise HTTPException(400, "Max 20 images per post.")

    blocks: list[dict] = []
    for i, f in enumerate(files, 1):
        data = await f.read()
        if not data:
            continue
        if len(data) > 25 * 1024 * 1024:
            raise HTTPException(400, f"{f.filename} is larger than 25 MB.")
        blocks.append({"type": "text", "text": f"--- Page {i} ({f.filename}) ---"})
        try:
            blocks.append(encode_image(data))
        except Exception as e:
            raise HTTPException(400, f"Could not read {f.filename} as an image: {e}")

    if not blocks:
        raise HTTPException(400, "No readable images uploaded.")

    tags = existing_tags()
    tail = (
        f"\n\nTags already used on this site (strongly prefer reusing these where they "
        f"fit, invent a new one only if nothing matches): {', '.join(tags) or '(none yet)'}"
    )
    if instructions.strip():
        tail += f"\n\nExtra instructions from the author for this post: {instructions.strip()}"
    tail += "\n\nNow produce the JSON object."
    blocks.append({"type": "text", "text": tail})

    draft = extract_json(call_claude(blocks, SYSTEM_PROMPT, max_tokens=8000))
    if not isinstance(draft, dict):
        raise HTTPException(502, f"Model did not return a JSON object: {draft!r}")

    # The model's JSON is untrusted input past this point: coerce every field to
    # the shape the rest of the app assumes so a malformed/odd response (a null
    # title, a string instead of a tag list, etc.) can't crash or corrupt state.
    title = draft.get("title")
    title = str(title).strip() if title else "Untitled"
    draft["title"] = title or "Untitled"

    draft["slug"] = slugify(draft.get("slug") or draft["title"])

    desc = draft.get("description")
    draft["description"] = str(desc).strip() if desc else ""

    draft["tags"] = coerce_tags(draft.get("tags"), limit=6)

    body = draft.get("body")
    draft["body"] = str(body) if body else ""

    draft["date"] = dt.date.today().isoformat()
    return JSONResponse(draft)


# Attribution footer appended to every published post (and to the preview so it
# matches). Defined once here so the model output, preview and published file
# can never drift apart.
DISCLAIMER = (
    "\n\n---\n\n*This article was drafted with the assistance of an automated "
    "Hermes agent and reviewed by the author before publishing.*\n"
)


@app.post("/api/render")
async def render(payload: dict) -> dict:
    html = md.markdown(
        payload.get("body", ""),
        extensions=["fenced_code", "codehilite", "tables", "sane_lists"],
        extension_configs={"codehilite": {"noclasses": False, "css_class": "highlight"}},
    )
    disclaimer_html = md.markdown(DISCLAIMER)
    return {"html": html + disclaimer_html}


@app.post("/api/publish")
async def publish(payload: dict) -> dict:
    title = (payload.get("title") or "").strip()
    body = (payload.get("body") or "").strip()
    if not title:
        raise HTTPException(400, "A title is required.")
    if not body:
        raise HTTPException(400, "The post body is empty.")
    body += DISCLAIMER

    date_str = (payload.get("date") or dt.date.today().isoformat()).strip()
    try:
        date = dt.date.fromisoformat(date_str)
    except ValueError:
        raise HTTPException(400, f"Bad date '{date_str}'. Use YYYY-MM-DD.")

    slug = slugify(payload.get("slug") or title)
    tags = coerce_tags(payload.get("tags"))
    desc = (payload.get("description") or "").strip()

    # Switch to the target branch BEFORE touching the filesystem, so the
    # overwrite check and the write itself both happen against the branch
    # the post will actually land on.
    branch = PUBLISH_BRANCH or git("rev-parse", "--abbrev-ref", "HEAD")
    if PUBLISH_BRANCH and git("rev-parse", "--abbrev-ref", "HEAD") != PUBLISH_BRANCH:
        git("checkout", PUBLISH_BRANCH)

    if AUTO_PUSH:
        # `git push` sends every commit the local branch has that origin
        # doesn't, not just the one this endpoint is about to make. If the
        # user already has unrelated unpushed local work on this branch,
        # auto-pushing would carry that out too - so refuse before writing
        # anything unless local is already exactly in sync with origin.
        # Fetching only this one ref (not the whole remote) keeps it fast.
        try:
            git("fetch", "origin", branch)
            remote_head = git("rev-parse", f"origin/{branch}")
        except HTTPException as e:
            raise HTTPException(
                409,
                f"Could not verify origin/{branch} is in sync before publishing "
                f"(fetch/rev-parse failed):\n{e.detail}\n\n"
                "Refusing to auto-push. Push manually once, or set AUTO_PUSH=false.",
            )
        local_head = git("rev-parse", "HEAD")
        if local_head != remote_head:
            raise HTTPException(
                409,
                f"Local '{branch}' ({local_head[:7]}) has commits origin/{branch} "
                f"({remote_head[:7]}) doesn't. AUTO_PUSH would push those too, not "
                "just this post, so refusing to publish - push your existing local "
                "work manually first, or set AUTO_PUSH=false and push everything "
                "yourself when you're ready.",
            )

    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    path = POSTS_DIR / f"{date.isoformat()}-{slug}.md"
    if path.exists() and not payload.get("overwrite"):
        raise HTTPException(
            409, f"{path.name} already exists. Change the slug or tick 'overwrite'."
        )

    front = {
        "title": title,
        "date": f"{date.isoformat()} 09:00:00 +0530",
        "tags": tags,
    }
    if desc:
        front["description"] = desc

    fm = yaml.safe_dump(front, sort_keys=False, allow_unicode=True, default_flow_style=None)
    path.write_text(f"---\n{fm}---\n\n{body}\n", encoding="utf-8")

    result: dict[str, Any] = {"file": str(path.relative_to(REPO_ROOT))}

    rel_path = str(path.relative_to(REPO_ROOT))
    git("add", rel_path)
    # --only restricts the commit to this path's changes even if other files are
    # already staged in the index, so publishing a post can never sweep in
    # unrelated work-in-progress from the same working tree. It does mean an
    # empty diff is a hard error rather than a silent success on someone else's
    # staged changes, so skip the commit outright when nothing changed.
    if git("diff", "--cached", "--name-only", "--", rel_path):
        git("commit", "--only", "-m", f"post: {title}", "--", rel_path)
        result["committed"] = True
    else:
        result["committed"] = False
    result["commit"] = git("rev-parse", "--short", "HEAD")
    result["branch"] = branch

    if AUTO_PUSH:
        git("push", "origin", branch)
        result["pushed"] = True
        result["url"] = f"https://jrajrohit.me/{date.year}/{date.month:02d}/{slug}/"
    else:
        result["pushed"] = False
        result["url"] = None

    return result


app.mount("/static", StaticFiles(directory=HERE / "static"), name="static")
