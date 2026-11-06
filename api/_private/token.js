/* The cookie never holds the password. It holds a SHA-256 hash of the
   password (plus a fixed label), so:
   - nobody can unlock the page by hand-writing a cookie such as "auth=ok";
   - the password itself is never sent back to the browser or stored there;
   - changing SITE_PASSWORD in Vercel logs everyone out automatically. */
export const COOKIE = "case-auth";

export async function tokenFor(password) {
  const data = new TextEncoder().encode("peichi-portfolio:locked-case:" + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function readCookie(header, name) {
  for (const part of (header || "").split(";")) {
    const i = part.indexOf("=");
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return "";
}

export async function isUnlocked(cookieHeader) {
  const pw = process.env.SITE_PASSWORD;
  if (!pw) return false; // no password configured → stay locked
  const got = readCookie(cookieHeader, COOKIE);
  return !!got && got === (await tokenFor(pw));
}
