// ZapTap game rules on the server: the daily puzzle, scoring and days. The
// client has the same curve and picking logic for its offline mode.

import { createRequire } from "node:module";
import { createHash, createHmac } from "node:crypto";
import { geoBounds, geoContains, geoDistance } from "d3-geo";

const require = createRequire(import.meta.url);
const topojson = require("topojson-client");
const world = require("world-atlas/countries-50m.json");
const DATA = require("./places.json");

const EARTH_KM = 6371;
export const WEIGHTS = [1, 1, 2, 3, 3];
const TIERS = [1, 1, 2, 3, 3];
const EPOCH = "2026-10-29"; // ZapTap #1
const TZ = "Europe/Oslo";

// ---------------------------------------------------------------- geography

// Same synthetic ids as the build script for features without an ISO code.
const SHAPES = topojson.feature(world, world.objects.countries).features.map((f, i) => ({
  id: f.id || "x" + i,
  feature: f,
  bounds: geoBounds(f),
}));

function countryAt(lonlat) {
  const [lon, lat] = lonlat;
  for (const { id, feature, bounds: [[w, s], [e, n]] } of SHAPES) {
    if (lat < s || lat > n) continue;
    if (w <= e ? lon < w || lon > e : lon < w && lon > e) continue;
    if (geoContains(feature, lonlat)) return id;
  }
  return null;
}
const continentOf = (id) => (id && DATA.countries[id] ? DATA.countries[id][1] : null);

// 100 within 22 km, 0 past 16,250 km, 81 at 1,000 km. Same curve as the client.
function distanceScore(km) {
  if (km <= 22) return 100;
  if (km >= 16250) return 0;
  return Math.round(100 * (1 - Math.pow((km - 22) / (16250 - 22), 0.591)));
}

export function scoreGuess(target, lon, lat) {
  const km = geoDistance([lon, lat], [target.lon, target.lat]) * EARTH_KM;
  let score = distanceScore(km);
  let bonus = null;
  const hit = countryAt([lon, lat]);
  const inCountry = hit === target.id && !target.contested; // contested places have no "right country"
  if (inCountry && score < 25) {
    score = 25;
    bonus = "country";
  } else if (hit && !inCountry && continentOf(hit) === continentOf(target.id) && score < 10) {
    score = 10;
    bonus = "continent";
  }
  return { km: Math.round(km * 10) / 10, score, bonus, inCountry };
}

// ---------------------------------------------------------------- days

const dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });

export const today = (d = new Date()) => dayFormat.format(d);

export const osloHour = (d = new Date()) => Number(timeFormat.format(d).split(":")[0]);

export function secondsToMidnight(d = new Date()) {
  const [h, m, s] = timeFormat.format(d).split(":").map(Number);
  return 86400 - (h * 3600 + m * 60 + s);
}

export function dayNumber(key) {
  const [y, m, d] = key.split("-").map(Number);
  const [ey, em, ed] = EPOCH.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ey, em - 1, ed)) / 864e5) + 1;
}

// ---------------------------------------------------------------- puzzle

function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const byTier = { 1: [], 2: [], 3: [] };
DATA.places.forEach((p, i) => byTier[p[3]].push(i));

// Five places from five different countries, at most two per continent.
function pickTargets(rand) {
  const usedCountries = new Set();
  const perContinent = {};
  return TIERS.map((tier) => {
    const pool = byTier[tier];
    let pick = null;
    for (let tries = 0; tries < 500 && !pick; tries++) {
      const p = DATA.places[pool[Math.floor(rand() * pool.length)]];
      const cont = DATA.countries[p[4]][1];
      if (usedCountries.has(p[4])) continue;
      if ((perContinent[cont] || 0) >= 2 && tries < 400) continue;
      pick = p;
    }
    usedCountries.add(pick[4]);
    const cont = DATA.countries[pick[4]][1];
    perContinent[cont] = (perContinent[cont] || 0) + 1;
    return { name: pick[0], lat: pick[1], lon: pick[2], id: pick[4], country: pick.length > 6 ? pick[6] : DATA.countries[pick[4]][0], contested: pick.length > 6 };
  });
}

// Picked with an HMAC of the date under a secret, so future puzzles can't be
// worked out from the public code.
const puzzles = new Map();
export function puzzleFor(secret, day) {
  if (!secret) throw new Error("SEED_SECRET is not set");
  if (!puzzles.has(day)) {
    const mac = createHmac("sha256", secret).update("zaptap:" + day).digest();
    puzzles.set(day, pickTargets(mulberry32(mac.readUInt32BE(0))));
    if (puzzles.size > 8) puzzles.delete(puzzles.keys().next().value);
  }
  return puzzles.get(day);
}

export function roundView(target, i, guess) {
  const r = { round: i, name: target.name, country: target.country, countryId: target.id, contested: !!target.contested, weight: WEIGHTS[i] };
  if (guess) {
    Object.assign(r, {
      guess: [guess.lon, guess.lat],
      km: guess.km,
      score: guess.score,
      points: guess.points,
      bonus: guess.bonus || null,
      inCountry: !!guess.inCountry,
      answer: [target.lon, target.lat],
    });
  }
  return r;
}

export const sha256Hex = (s) => createHash("sha256").update(s).digest("hex");
