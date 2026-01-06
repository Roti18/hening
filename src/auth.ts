const enc = new TextEncoder();

export async function hashPassword(password: string, salt: ArrayBuffer) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    key,
    256
  );

  return new Uint8Array(bits);
}

export async function sign(data: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function issueToken(userId: string, secret: string) {
  const payload = btoa(
    JSON.stringify({
      uid: userId,
      exp: Date.now() + 1000 * 60 * 60,
    })
  );

  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyToken(token: string, secret: string) {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = await sign(payload, secret);
  if (expected !== sig) return null;

  const data = JSON.parse(atob(payload));
  if (Date.now() > data.exp) return null;

  return data;
}
