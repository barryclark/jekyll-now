import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "../src/worker.js";

const BODY = new Uint8Array([...Array(100).keys()]);
const env = {
  ASSETS: {
    fetch: async () =>
      new Response(BODY, { headers: { "Content-Type": "audio/mpeg" } }),
  },
};

function get(path, headers = {}, host = "mostlywrong.net") {
  return worker.fetch(new Request(`https://${host}${path}`, { headers }), env);
}

test("www redirects to the apex, keeping path and query", async () => {
  const res = await get("/machine-gun/?x=1", {}, "www.mostlywrong.net");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("Location"), "https://mostlywrong.net/machine-gun/?x=1");
});

test("no Range header returns the whole asset", async () => {
  const res = await get("/a.mp3");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Accept-Ranges"), "bytes");
  assert.equal((await res.arrayBuffer()).byteLength, 100);
});

for (const [range, start, end] of [
  ["bytes=10-19", 10, 19],
  ["bytes=90-", 90, 99],
  ["bytes=-5", 95, 99],
  ["bytes=95-500", 95, 99],
]) {
  test(`${range} returns 206 with bytes ${start}-${end}`, async () => {
    const res = await get("/a.mp3", { Range: range });
    assert.equal(res.status, 206);
    assert.equal(res.headers.get("Content-Range"), `bytes ${start}-${end}/100`);
    assert.equal(res.headers.get("Content-Type"), "audio/mpeg");
    assert.deepEqual(new Uint8Array(await res.arrayBuffer()), BODY.slice(start, end + 1));
  });
}

test("a range past the end is 416", async () => {
  const res = await get("/a.mp3", { Range: "bytes=100-" });
  assert.equal(res.status, 416);
  assert.equal(res.headers.get("Content-Range"), "bytes */100");
});

test("multi-range and If-Range fall back to the full asset", async () => {
  for (const headers of [{ Range: "bytes=0-1,5-6" }, { Range: "bytes=0-1", "If-Range": '"x"' }]) {
    const res = await get("/a.mp3", headers);
    assert.equal(res.status, 200);
    assert.equal((await res.arrayBuffer()).byteLength, 100);
  }
});
