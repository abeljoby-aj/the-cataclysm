
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "the-cataclysm.abeljobyaj.workers.dev") {
      const destination = new URL(
        url.pathname + url.search,
        "https://oxcode.org"
      );

      return Response.redirect(destination.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
