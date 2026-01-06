export function createApp() {
  const routes = new Map<
    string,
    (req: Request) => Response | Promise<Response>
  >();

  return {
    get(path: string, handler: any) {
      routes.set(`GET ${path}`, handler);
    },

    async fetch(req: Request) {
      const key = req.method + " " + new URL(req.url).pathname;
      const handler = routes.get(key);
      return handler
        ? await handler(req)
        : new Response("Not Found", { status: 404 });
    },
  };
}
