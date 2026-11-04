// ZapTap's data in Azure Table Storage (ZAPTAP_STORAGE connection string).
//
// players  PK "p", RK sha256(email)        name, nameKey
// names    PK "n", RK nameKey (encoded)    player   -- makes names unique
// guesses  PK day, RK "<player>-<round>"   lon, lat, km, score, points, bonus, inCountry, createdAt
// reports  PK "r", RK day                  postedAt

import { TableClient, odata } from "@azure/data-tables";

const clients = new Map();
async function table(name) {
  if (!clients.has(name)) {
    const conn = process.env.ZAPTAP_STORAGE;
    if (!conn) throw new Error("ZAPTAP_STORAGE is not set");
    const local = conn.startsWith("UseDevelopmentStorage") || conn.includes("127.0.0.1");
    const client = TableClient.fromConnectionString(conn, name, { allowInsecureConnection: local });
    await client.createTable(); // no-op if it exists
    clients.set(name, client);
  }
  return clients.get(name);
}

const conflict = (e) => e && e.statusCode === 409;
const notFound = (e) => e && e.statusCode === 404;
const nameRow = (nameKey) => encodeURIComponent(nameKey); // RowKeys can't hold / \ # ?

// ---------------------------------------------------------------- players

export async function getPlayer(id) {
  try {
    return await (await table("players")).getEntity("p", id);
  } catch (e) {
    if (notFound(e)) return null;
    throw e;
  }
}

export async function listPlayers() {
  const out = new Map();
  for await (const e of (await table("players")).listEntities({ queryOptions: { filter: odata`PartitionKey eq 'p'` } })) out.set(e.rowKey, e);
  return out;
}

// Claims a name for a player; false if someone else has it.
export async function claimName(nameKey, id) {
  const names = await table("names");
  try {
    await names.createEntity({ partitionKey: "n", rowKey: nameRow(nameKey), player: id });
    return true;
  } catch (e) {
    if (!conflict(e)) throw e;
    const owner = await names.getEntity("n", nameRow(nameKey));
    return owner.player === id;
  }
}

export async function releaseName(nameKey) {
  try {
    await (await table("names")).deleteEntity("n", nameRow(nameKey));
  } catch (e) {
    if (!notFound(e)) throw e;
  }
}

// false if the player already exists (created by a parallel request)
export async function createPlayer(id, name) {
  try {
    await (await table("players")).createEntity({ partitionKey: "p", rowKey: id, name, nameKey: name.toLowerCase(), createdAt: Date.now() });
    return true;
  } catch (e) {
    if (conflict(e)) return false;
    throw e;
  }
}

export async function renamePlayer(id, name) {
  await (await table("players")).updateEntity({ partitionKey: "p", rowKey: id, name, nameKey: name.toLowerCase() }, "Merge");
}

// ---------------------------------------------------------------- guesses

export async function playerGuesses(day, id) {
  const out = [];
  const filter = odata`PartitionKey eq ${day} and RowKey ge ${id + "-"} and RowKey lt ${id + "."}`;
  for await (const e of (await table("guesses")).listEntities({ queryOptions: { filter } })) out.push(e);
  return out.sort((a, b) => a.round - b.round);
}

export async function dayGuesses(day) {
  const out = [];
  for await (const e of (await table("guesses")).listEntities({ queryOptions: { filter: odata`PartitionKey eq ${day}` } })) out.push(e);
  return out;
}

// false if that round was already played (e.g. a double click)
export async function insertGuess(day, id, round, g) {
  try {
    await (await table("guesses")).createEntity({ partitionKey: day, rowKey: `${id}-${round}`, player: id, round, ...g, createdAt: Date.now() });
    return true;
  } catch (e) {
    if (conflict(e)) return false;
    throw e;
  }
}

// ---------------------------------------------------------------- reports

export async function reportSent(day) {
  try {
    await (await table("reports")).getEntity("r", day);
    return true;
  } catch (e) {
    if (notFound(e)) return false;
    throw e;
  }
}

export async function markReportSent(day) {
  await (await table("reports")).upsertEntity({ partitionKey: "r", rowKey: day, postedAt: Date.now() }, "Replace");
}
