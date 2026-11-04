// ZapTap API, independent of Azure Functions so it can be tested on its own.
//
// Azure Static Web Apps signs players in with their Microsoft account and
// passes who they are in the x-ms-client-principal header; the platform sets
// it, browsers can't. Only accounts in ALLOWED_EMAIL_DOMAIN may play.

import { WEIGHTS, dayNumber, puzzleFor, roundView, scoreGuess, secondsToMidnight, sha256Hex, today } from "./game.js";
import * as store from "./store.js";
import { timingSafeEqual } from "node:crypto";
import { reportCard, reportDue, sendToTeams } from "./report.js";

class HttpError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
  }
}

// ---------------------------------------------------------------- players

function principal(headers) {
  const raw = headers["x-ms-client-principal"];
  // 403, not 401: Static Web Apps turns 401s into a login redirect, which a
  // fetch() can't follow. The client reloads the page on not_signed_in.
  if (!raw) throw new HttpError(403, "not_signed_in");
  let p;
  try {
    p = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch (e) {
    throw new HttpError(403, "not_signed_in");
  }
  if (!p || !(p.userRoles || []).includes("authenticated")) throw new HttpError(403, "not_signed_in");
  const email = String(p.userDetails || "").toLowerCase();
  const domain = (process.env.ALLOWED_EMAIL_DOMAIN || "").toLowerCase();
  if (p.identityProvider !== "aad" || !email.includes("@") || (domain && !email.endsWith("@" + domain))) {
    throw new HttpError(403, "not_allowed");
  }
  const claim = (p.claims || []).find((c) => c.typ === "name");
  return { email, name: claim ? claim.val : null };
}

function cleanName(name) {
  if (typeof name !== "string") return null;
  const n = name.normalize("NFC").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 24).trim();
  return n.length >= 1 ? n : null;
}

// The Microsoft account's name if we get it, else from the email address:
// paul.mairo@zivid.com -> Paul Mairo.
function defaultName(who) {
  const fromAccount = cleanName(who.name);
  if (fromAccount) return fromAccount;
  const local = who.email.split("@")[0];
  return cleanName(local.split(/[._-]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")) || "Zividian";
}

// Players are keyed by a hash of their email; the first visit creates them
// with a unique display name they can change later.
async function playerFor(headers) {
  const who = principal(headers);
  const id = sha256Hex(who.email);
  const existing = await store.getPlayer(id);
  if (existing) return { id, name: existing.name, nameKey: existing.nameKey };
  const base = defaultName(who);
  for (let n = 1; n < 100; n++) {
    const name = n === 1 ? base : `${base.slice(0, 21)} ${n}`;
    if (!(await store.claimName(name.toLowerCase(), id))) continue;
    if (!(await store.createPlayer(id, name))) {
      await store.releaseName(name.toLowerCase()); // a parallel request created the player first
      const again = await store.getPlayer(id);
      return { id, name: again.name, nameKey: again.nameKey };
    }
    return { id, name, nameKey: name.toLowerCase() };
  }
  throw new Error("couldn't find a free name for " + base);
}

// ---------------------------------------------------------------- game

const secret = () => process.env.SEED_SECRET;

// Played rounds (with answers) plus the next round's name, never further ahead.
async function state(player) {
  const day = today();
  const targets = puzzleFor(secret(), day);
  const guesses = await store.playerGuesses(day, player.id);
  const rounds = guesses.map((g) => roundView(targets[g.round], g.round, g));
  if (rounds.length < 5) rounds.push(roundView(targets[rounds.length], rounds.length));
  return {
    day,
    number: dayNumber(day),
    nextIn: secondsToMidnight(),
    name: player.name,
    rounds,
    done: guesses.length === 5,
    total: guesses.reduce((sum, g) => sum + g.points, 0),
  };
}

async function guess(player, body) {
  const day = today();
  if (body.day !== day) throw new HttpError(409, "day_over");
  const lon = Number(body.lon);
  const lat = Number(body.lat);
  if (!Number.isFinite(lon) || !Number.isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 90) throw new HttpError(400, "bad_guess");
  const targets = puzzleFor(secret(), day);
  const played = await store.playerGuesses(day, player.id);
  const round = played.length;
  if (round >= 5) throw new HttpError(409, "done");
  if (body.round !== round) throw new HttpError(409, "wrong_round");

  const t = targets[round];
  const { km, score, bonus, inCountry } = scoreGuess(t, lon, lat);
  const g = { lon: Math.round(lon * 1e4) / 1e4, lat: Math.round(lat * 1e4) / 1e4, km, score, points: score * WEIGHTS[round], inCountry };
  if (bonus) g.bonus = bonus; // Table Storage has no nulls
  if (!(await store.insertGuess(day, player.id, round, g))) throw new HttpError(409, "wrong_round");
  const total = played.reduce((sum, p) => sum + p.points, 0) + g.points;
  return {
    result: roundView(t, round, g),
    next: round < 4 ? roundView(targets[round + 1], round + 1) : null,
    total,
    done: round === 4,
  };
}

async function setName(player, body) {
  const name = cleanName(body.name);
  if (!name) throw new HttpError(400, "bad_name");
  const key = name.toLowerCase();
  if (key !== player.nameKey) {
    if (!(await store.claimName(key, player.id))) throw new HttpError(409, "name_taken");
    await store.renamePlayer(player.id, name);
    await store.releaseName(player.nameKey);
  } else {
    await store.renamePlayer(player.id, name); // only the capitalisation changed
  }
  return { name };
}

async function leaderboard(day) {
  const [guesses, players] = await Promise.all([store.dayGuesses(day), store.listPlayers()]);
  const byPlayer = new Map();
  for (const g of guesses.sort((a, b) => a.round - b.round)) {
    if (!byPlayer.has(g.player)) {
      const p = players.get(g.player);
      byPlayer.set(g.player, { name: p ? p.name : "?", scores: [], total: 0, finishedAt: 0 });
    }
    const e = byPlayer.get(g.player);
    e.scores.push(g.score);
    e.total += g.points;
    e.finishedAt = Math.max(e.finishedAt, g.createdAt);
  }
  const all = [...byPlayer.values()];
  const entries = all
    .filter((e) => e.scores.length === 5)
    .sort((a, b) => b.total - a.total || a.finishedAt - b.finishedAt)
    .map(({ name, scores, total }) => ({ name, scores, total }));
  return { day, number: dayNumber(day), final: day < today(), playing: all.length - entries.length, entries };
}

// ---------------------------------------------------------------- teams

// Called by the scheduled GitHub Actions workflow, not by players: it proves
// itself with the shared ZAPTAP_REPORT_KEY in the X-ZapTap-Key header.
function checkReportKey(headers) {
  const want = process.env.ZAPTAP_REPORT_KEY || "";
  if (!want || !process.env.TEAMS_WEBHOOK_URL) throw new HttpError(503, "report_not_configured");
  const got = Buffer.from(String(headers["x-zaptap-key"] || ""));
  if (got.length !== Buffer.byteLength(want) || !timingSafeEqual(got, Buffer.from(want))) throw new HttpError(403, "bad_key");
}

// Posts today's leaderboard to Teams once it's due (a working day, 16:00 or
// later in Oslo), at most once a day. {test: true} posts a test card right
// away, whatever the day or time, without counting as today's post.
async function report(headers, body) {
  checkReportKey(headers);
  const test = body.test === true;
  const { day, due, reason } = reportDue();
  if (!test) {
    if (!due) return { posted: false, day, reason };
    if (await store.reportSent(day)) return { posted: false, day, reason: "already_posted" };
  }
  const board = await leaderboard(day);
  const url = typeof body.url === "string" && /^https:\/\/[^\s"]+$/.test(body.url) ? body.url : null;
  await sendToTeams(reportCard(board, { test, url }));
  if (!test) await store.markReportSent(day);
  return { posted: true, test, day, finished: board.entries.length };
}

// ---------------------------------------------------------------- http

const json = (data, status = 200) => ({ status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(data) });

// path: the part after /api/; headers: lower-cased names.
export async function handle({ method, path, headers, query, body }) {
  try {
    // /config.js is rewritten here: it tells the page it's running on the server.
    if (path === "config") {
      return { status: 200, headers: { "Content-Type": "text/javascript", "Cache-Control": "no-store" }, body: "window.ZAPTAP_SERVER = true;\n" };
    }
    if (method === "POST" && path === "report") return json(await report(headers, body || {}));
    const player = await playerFor(headers);
    if (method === "GET" && path === "leaderboard") {
      const day = query.get("day") || today();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || day > today()) throw new HttpError(400, "bad_day");
      return json(await leaderboard(day));
    }
    if (method === "POST" && path === "state") return json(await state(player));
    if (method === "POST" && path === "guess") return json(await guess(player, body || {}));
    if (method === "POST" && path === "name") return json(await setName(player, body || {}));
    throw new HttpError(404, "not_found");
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.message }, e.status);
    console.error(e);
    return json({ error: "server_error" }, 500);
  }
}
