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
  everything else from assets.
- `.github/workflows/deploy.yml`: builds Jekyll, deploys on push to `master` and uploads
  a preview version for PRs.
- `404.md` now builds to `/404.html`, which Workers' `404-page` handling expects.
- `Gemfile` adds the stdlib gems that Ruby 4.0 unbundled.

### Cutover

1. Create a Cloudflare API token from the "Edit Cloudflare Workers" template. Add it as
   repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
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
   - MP3s play and seek (also check whether R2 range responses return a 206)
5. Turn off GitHub Pages in the repo settings and delete `CNAME`.

Rollback: delete the Worker's custom domains and restore the DNS records from step 2.

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
