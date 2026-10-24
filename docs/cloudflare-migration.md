# Migrating mostlywrong.net from GitHub Pages to Cloudflare

## Why

GitHub Pages can host any static output now, so "static" isn't the real constraint.
The real problems are:

- The 2016 Jekyll Now theme, where MP3s and YouTube are embedded by client-side JS that
  rewrites `<p>` tags (`_includes/open-embed.html`).
- 27MB of audio committed to git, growing with every post.
- Features that need a server: self-hosted comments (replacing Disqus), unlisted and
  private posts, and a richer audio player.

Cloudflare gives us R2 for media, D1 for comments, Access for private pages and a Worker
to tie them together. The DNS zone is already on Cloudflare.

## Phase 1: lift and shift (this branch)

Serve today's Jekyll output from a Worker with static assets. No visible change.

- `wrangler.jsonc`: Worker `mostlywrong`, assets from `_site`, custom domains for the
  apex and `www`.
- `src/worker.js`: redirects `www` to the apex (GitHub Pages did this before) and serves
  everything else from assets. It answers byte-range requests itself, because the assets
  binding ignores `Range` and `<audio>` seeking needs it. Tests are in `test/`, run with
  `npm test`.
- `.github/workflows/deploy.yml`: builds Jekyll, deploys on push to `master`, deploys a
  Workers Preview (public URL) for each PR and deletes it when the PR closes.
- `404.md` now builds to `/404.html`, which Workers' `404-page` handling expects.
- `Gemfile` adds the stdlib gems that Ruby 4.0 unbundled.

### Cutover

1. Create an account-owned API token in Chesal Information Alliance from the "Edit
   Cloudflare Workers" template, scoped to that account and the `mostlywrong.net` zone. Add
   it as the repo secret `CLOUDFLARE_API_TOKEN`. The account ID is pinned in
   `wrangler.jsonc`.
2. In the zone's DNS, delete the existing apex and `www` records that point at GitHub
   Pages. Worker custom domains won't attach while a conflicting record exists.
   **Note down the current values first, so you can roll back.**
3. Run `npm run deploy` locally, or merge to `master`. Wrangler creates the custom
   domains and their certificates.
4. Verify:
   - every post URL returns 200
   - `/feed.xml` works
   - `www` returns a 301
   - `/nope` returns a 404 page
   - MP3s play and seek (range requests return a 206)
5. Turn off GitHub Pages in the repo settings and delete `CNAME`.

Rollback: delete the Worker's custom domains and restore the DNS records from step 2.
Snapshot taken 2026-10-24, all proxied with automatic TTL:

| Type | Name | Content |
| --- | --- | --- |
| A | mostlywrong.net | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| AAAA | mostlywrong.net | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 |
| CNAME | www.mostlywrong.net | ianchesal.github.io |

The MX and TXT records (email forwarding, SPF, Keybase) aren't affected by the cutover.

The Worker is also deployed at https://mostlywrong.mostlywrong.workers.dev, without
custom domains, for testing before cutover. Every path, the feed, the 404 page and MP3
range requests match production.

## Phase 2: rebuild

Stack: **Astro** on the same Worker (`@astrojs/cloudflare`). Pages stay prerendered by
default, with server-rendered routes only where needed. Posts stay as Markdown or MDX in
git.

| Concern | Plan |
| --- | --- |
| URLs | Keep `/:slug/` for all 14 posts, plus `/feed.xml` and `/about/`. Add a sitemap. |
| Audio storage | R2 bucket, served at `/audio/*` by the Worker with Range support. A script uploads new clips. Remove the MP3s from git. |
| Audio player | `<Audio>` component with waveform peaks precomputed at build time. `<ABCompare>` component for the IR and phaser comparison posts. Download link. |
| Presets | `.syx` files move to R2 alongside the audio. |
| Comments | D1 table, POST endpoint protected by Turnstile, moderation queue, Disqus export imported. |
| Unlisted posts | `visibility: unlisted` in frontmatter: left out of the index, feed and sitemap, and served with `noindex`. |
| Private posts | Under `/private/*`, protected by Cloudflare Access (free for small user counts), so we write no auth code. |
| Analytics | Decide: keep GA4, or switch to Cloudflare Web Analytics. |
| Design | From scratch, with full control over typography and layout. No theme. |

### Open questions for phase 2

- Do you want comments on every post, or opt-in per post?
- Who gets access to private posts, and how do they log in (email OTP, Google)?
- Keep GA4 or drop it?
- Any design references you like?
