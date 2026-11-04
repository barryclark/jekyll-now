# ZapTap on Azure

ZapTap runs on Azure Static Web Apps (Free plan): it serves the game from
`zaptap/`, runs this folder as its API (Azure Functions), and signs people in
with their Microsoft account. Leaderboard data lives in Azure Table Storage,
which costs a few cents a month at this size.

What the API does:

- Picks each day's five places with an HMAC of the date under `SEED_SECRET`,
  so future puzzles can't be worked out from the public code.
- Hands out one place at a time and returns its answer only after you guess.
- Scores guesses itself (distance, round weights, country/continent bonus), so
  leaderboard scores can't be typed in by hand.
- One game per person per day. Days and the leaderboard roll over at midnight
  Oslo time.

Sign-in: every page needs a signed-in Microsoft account
(`staticwebapp.config.json`), and the API only accepts emails ending in
`ALLOWED_EMAIL_DOMAIN` (`zivid.com`). The Free plan's built-in Microsoft login
lets any Microsoft account reach the pages themselves, which are just the
public game; locking those to the Zivid tenant too needs the Standard plan and
a custom Entra ID provider.

Players are keyed by a SHA-256 of their email. Their display name starts as
the Microsoft account name and can be changed in the game; names are unique.

## Deploy

From the repository root, in Azure Cloud Shell or anywhere with the az CLI
and Node:

```sh
bash zaptap/api/deploy.sh
```

It creates (or updates) the resource group `zaptap-rg`, a storage account and
the static web app `zaptap` in West Europe, sets the app settings, and deploys.
Override the names with `ZAPTAP_RG`, `ZAPTAP_APP`, `ZAPTAP_LOCATION`.

It prints the URL, e.g. `https://<name>.azurestaticapps.net`. To send
rmpr.xyz/zaptap there, put it in `../config.js`:

```js
window.ZAPTAP_HOME = "https://<name>.azurestaticapps.net";
```

App settings (set by the script):

| Setting | |
| --- | --- |
| `SEED_SECRET` | Picks the daily puzzles. Generated once; never change it, or today's puzzle changes under people's feet. |
| `ZAPTAP_STORAGE` | Storage account connection string. |
| `ALLOWED_EMAIL_DOMAIN` | Who may play. |
| `TEAMS_WEBHOOK_URL` | Optional: the Teams Workflow URL for the daily results post (see below). Treat it like a password. |
| `ZAPTAP_REPORT_KEY` | Optional: a long random string the scheduled workflow uses to ask for that post. |

## Daily results in Teams

At 16:00 Oslo time on working days (not weekends, Norwegian public holidays,
Christmas Eve or New Year's Eve), today's leaderboard is posted to a Teams
chat: whoever finished by then, best first. It never names today's places.

How it fits together:

- A Teams Workflow made from the "Send webhook alerts to a chat" template
  gives a URL that posts what it receives into the chat.
- `POST /api/report` (with the `X-ZapTap-Key` header) builds the leaderboard
  card and sends it there, once it's due and at most once a day.
- `.github/workflows/zaptap-daily-results.yml` calls it at 14:00 and 15:00 UTC
  on weekdays (16:00 Oslo in summer and winter); the API works out which run
  is the real one. GitHub only runs scheduled workflows from the default
  branch, so the workflow must be on `master`.

Setup:

1. Static Web App → **Settings → Environment variables**: add
   `TEAMS_WEBHOOK_URL` (the Workflow URL) and `ZAPTAP_REPORT_KEY` (a long
   random string, e.g. from a password generator).
2. GitHub repository → **Settings → Secrets and variables → Actions**: add the
   secret `ZAPTAP_REPORT_KEY` with the same value, and the variable
   `ZAPTAP_URL` with the site's address (`https://<name>.azurestaticapps.net`).
3. Test it: **Actions → ZapTap daily results → Run workflow** with "test"
   ticked posts a test card to the chat right away.

## Updating places

`src/places.json` is generated together with `../places.js` by
`../tools/build.js`. Deploy again after regenerating it.

## API

All endpoints need a signed-in Zivid account.

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| POST | `/api/state` | `{}` | today's played rounds (with answers) and the next place |
| POST | `/api/guess` | `{day, round, lon, lat}` | the scored round, its answer, and the next place |
| POST | `/api/name` | `{name}` | the new display name, or `409 name_taken` |
| GET | `/api/leaderboard?day=YYYY-MM-DD` | | finished games for that day, best first |
| GET | `/config.js` | | rewritten to `/api/config`: tells the page it's online |
| POST | `/api/report` | `{test?, url?}` | posts today's results to Teams if due; needs `X-ZapTap-Key` instead of a player |
