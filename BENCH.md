# Benchmark

## Environment

- Node.js v22+
- OS: Windows
- Runtime: single process
- Tanpa network
- Tanpa TLS
- Tanpa IO

---

## Benchmark Results

![Benchmark Result](./assets/bench.png)

hening-1: 26.862 ms
hening-2: 22.059 ms
hening-3: 22.378 ms
hening-4: 26.739 ms
hening-5: 23.615 ms

Total:
26.862 + 22.059 + 22.378 + 26.739 + 23.615 = 121.653 ms

Average:
121.653 ms / 5 ≈ 24.33 ms

Per request:
24.33 ms / 100.100 ≈ 0.000243 ms ≈ 0.243 mikrodetik
