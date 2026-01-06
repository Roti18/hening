import { createApp } from "./src/app.ts";

const app = createApp();

app.get("/ping", () => new Response("Pong"));

const req = new Request("https://x/ping");

for (let run = 1; run <= 5; run++) {
  console.time(`hening-${run}`);
  for (let i = 0; i < 100_100; i++) {
    await app.fetch(req);
  }
  console.timeEnd(`hening-${run}`);
}
