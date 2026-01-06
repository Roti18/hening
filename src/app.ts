export type Handler = (req: Request) => Response | Promise<Response>;

type Method = "GET" | "POST" | "ALL";

const NOT_FOUND = new Response("Not Found", { status: 404 });

export function createApp() {
  const routes = new Map<string, Handler>();

  function add(method: Method, path: string, handler: Handler) {
    routes.set(method + " " + path, handler);
  }

  return {
    get(path: string, handler: Handler) {
      add("GET", path, handler);
    },

    post(path: string, handler: Handler) {
      add("POST", path, handler);
    },

    all(path: string, handler: Handler) {
      add("ALL", path, handler);
    },

    async fetch(req: Request): Promise<Response> {
      const url = req.url;
      const q = url.indexOf("?");
      const pathname = q === -1 ? url : url.slice(0, q);

      const key = req.method + " " + pathname;
      let handler = routes.get(key);
      if (!handler) handler = routes.get("ALL " + pathname);

      return handler ? handler(req) : NOT_FOUND;
    },
  };
}
