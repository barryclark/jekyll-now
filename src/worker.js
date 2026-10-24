const CANONICAL_HOST = "mostlywrong.net";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GitHub Pages used to do this for us.
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    return withRangeSupport(request, response);
  },
};

// The assets binding ignores Range headers, which breaks seeking in <audio>
// players. Answer single byte ranges ourselves. Assets are capped at 25 MiB so
// buffering one is bounded; anything fancier (multi-range, If-Range) gets the
// full 200 response, which is always a valid reply.
export async function withRangeSupport(request, response) {
  if (response.status !== 200) return response;

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");

  const range = request.headers.get("Range");
  if (request.method !== "GET" || !range || request.headers.has("If-Range")) {
    return new Response(response.body, { status: 200, headers });
  }

  const body = await response.arrayBuffer();
  const size = body.byteLength;
  const bounds = parseRange(range, size);

  if (bounds === null) {
    return new Response(body, { status: 200, headers });
  }
  if (bounds === "unsatisfiable") {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" },
    });
  }

  const [start, end] = bounds;
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}

// Returns [start, end] (inclusive), "unsatisfiable", or null when the header
// isn't a single byte range we understand.
function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (match[1] === "" && match[2] === "")) return null;

  let start;
  let end;
  if (match[1] === "") {
    // Suffix range: the last N bytes.
    const suffix = Number(match[2]);
    if (suffix === 0) return "unsatisfiable";
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
  }

  if (start >= size || start > end) return "unsatisfiable";
  return [start, end];
}
