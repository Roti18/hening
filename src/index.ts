import { createApp } from "./app";
import { verifyToken } from "./auth";

const app = createApp();
const SECRET = "CHANGE_ME_LATER";

app.get("/public", () => {
  return new Response("PUBLIC OK");
});

app.get("/private", async (req) => {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = auth.replace("Bearer ", "");
  const data = await verifyToken(token, SECRET);

  if (!data) {
    return new Response("Forbidden", { status: 403 });
  }

  return new Response("PRIVATE OK");
});

export default app;
