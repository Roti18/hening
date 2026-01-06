# Hening

**hening** is an ultra-minimal, edge-first backend engine focused on achieving the lowest possible latency.

Not a framework.  
Not a replacement for Express or Nest.  
It is a **small routing engine** built for fast APIs on the **Edge Runtime**.

---

## Goals

- Near-zero latency on the hot path
- Cold-start friendly (Edge-first)
- No middleware stack
- Zero dependencies
- Native Web Standards (`fetch`, `Request`, `Response`)

---

## Features (v0.1)

- Static routing based on `Map`
- O(1) route lookup
- Edge Runtime compatible (Vercel)
- Node compatible (for development and benchmarking)
- No:
  - middleware
  - plugins
  - body parsers
  - regex-based routing

---

## Usage Example

```ts
import { createApp } from "./app";

const app = createApp();

app.get("/ping", () => new Response("pong"));

export default app;
```
