# jrajrohit.me

Personal site and blog of Jalem Raj Rohit. Jekyll, hosted on GitHub Pages.

- **[data__wizard](https://twitter.com/data__wizard)** on Twitter/X
- **[/in/jalemrajrohit](https://www.linkedin.com/in/jalemrajrohit)** on LinkedIn

---

## Writing a post by hand

Drop a markdown file into `_posts/` named `YYYY-MM-DD-some-slug.md`:

```markdown
---
title: The title of the post
date: 2026-08-24 09:00:00 +0530
tags: [machine-learning, data-engineering]
description: One sentence used in post lists and meta tags.
---

Your first paragraph. Use `##` for section headings — the title above is
rendered separately, so never use `#` in the body.
```

Tags are free-form: use lowercase and hyphens. Any new tag automatically gets its own
section and anchor on **/tags/** — there is nothing else to register.

## Writing a post from handwritten notes

The primary path: **send photos of your notes (and any comments) on WhatsApp** to the
Hermes agent. It transcribes the handwriting, drafts the post, shows you a rendered
preview, and only opens a PR after you approve.

Agent-free fallback: a local tool, `notes2blog`, kept *outside* this repo at
`~/tools/notes2blog`. You photograph your notebook, it transcribes the handwriting
with Claude, drafts the post in your voice with suggested tags, and shows you a
rendered preview. Nothing is published until you click **Approve & Publish**.

### One-time setup

```bash
cd ~/tools/notes2blog
cp .env.example .env
# open .env and paste your ANTHROPIC_API_KEY
```

Also make sure git knows who you are, since the tool commits on your behalf:

```bash
git config user.name  "Jalem Raj Rohit"
git config user.email "jrajrohit33@gmail.com"
```

### Using it

```bash
~/tools/notes2blog/run.sh
```

First run builds a virtualenv and installs dependencies; after that it starts in a
second. The terminal also prints a random per-run auth token — you don't need to do
anything with it, the page reads it automatically, but it's there so that only this
tool's own tab (not some other page open in your browser) can call its publish API;
see [Security model](#security-model) below. Open **http://127.0.0.1:8765** and:

1. **Drop in photos** of your notes — one or many. Multiple pages are treated as one
   continuous train of thought, in the order shown, so keep them in reading order
   (use the × on a thumbnail to remove one that's out of place; re-add it in the
   right position if you need to reorder).
2. Optionally add a line of direction ("keep it short", "this follows the pipelines post").
3. Hit **Read notes & draft post**. Takes 20-60s depending on page count.
4. The draft appears on the left, with an approximate rendered preview on the right
   (the tool previews with Python-Markdown; the live site renders with Jekyll's
   Kramdown/GFM, so formatting is close but not pixel-for-pixel identical — check
   anything unusual, like tables or nested lists, once it's published).
   Edit anything — title, slug, date, description, tags, body. The preview updates as
   you type. The tool also flags anything it couldn't read clearly with a confidence
   note and `[?]` markers inline.
5. Click **✓ Approve & Publish**. It writes `_posts/YYYY-MM-DD-slug.md`, commits, and
   pushes. GitHub Pages rebuilds within a minute or two.

### Configuration

All optional, in `~/tools/notes2blog/.env`:

| Variable | Default | Meaning |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | **Required.** From [console.anthropic.com](https://console.anthropic.com/settings/keys) |
| `ANTHROPIC_MODEL` | sonnet-4-5, then fallbacks | Comma-separated; first one the API accepts wins |
| `AUTO_PUSH` | `true` | Set `false` to commit locally without pushing |
| `PUBLISH_BRANCH` | current branch | Force posts onto a specific branch |
| `PORT` | `8765` | Server port |

The tool never publishes without an explicit click, and it reuses tags already present
on the site rather than inventing near-duplicates.

### Security model

The server can commit and push to this repo, so it treats every request to its
publish/transcribe endpoints as untrusted unless it can prove three things: the
request's `Host` header names this exact `127.0.0.1:<port>` (or `localhost:<port>`)
origin, its `Origin` header (when present — browsers always send one on these
POSTs) matches too, and it carries the random token printed to the terminal on
startup as an `X-Notes2Blog-Token` header. The page you open in your browser sets
all of this up for you automatically. This exists because binding to `127.0.0.1`
only keeps other machines out — it does nothing to stop a malicious page open in
another tab from using a rebound DNS name to reach this server and fire off a
publish while you're not looking. Don't share the printed token or the tool's URL.

---

## Local preview

The system Ruby on macOS (2.6) is too old for current `github-pages`/Jekyll. The
committed `Gemfile` is already pinned to older, Ruby 2.6-compatible gem versions
(`jekyll ~> 3.9`, `ffi ~> 1.15.5`, `google-protobuf ~> 3.21.0`), so this works
out of the box:

```bash
bundle install --path vendor/bundle
bundle exec jekyll serve
```

If you upgrade to a modern Ruby (`brew install ruby` → 3.x), you can switch the
Gemfile back to plain `gem "github-pages", group: :jekyll_plugins`, which tracks
whatever Jekyll/plugin versions GitHub Pages actually runs in production.

## Layout

```
_layouts/      default, post, page
_includes/     header, footer, post-list-item
_posts/        the blog posts
assets/        main.scss (all styling), site.js (theme toggle)
tags.html      auto-generated tag index — no maintenance needed
```

Styling is one file, `assets/css/main.scss`, driven by CSS custom properties at the
top. Light and dark palettes are the two token blocks — change a colour there and it
propagates everywhere.
