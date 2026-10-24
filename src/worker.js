const CANONICAL_HOST = "mostlywrong.net";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GitHub Pages used to do this for us.
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
