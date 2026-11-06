import { COOKIE, tokenFor } from "./_private/token.js";

/* POST { password } → sets the unlock cookie when it matches SITE_PASSWORD
   (set in Vercel → Project → Settings → Environment Variables; never in code). */
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const pw = process.env.SITE_PASSWORD;
  const { password } = req.body || {};
  if (!pw || typeof password !== "string" || password !== pw) return res.status(401).json({ ok: false });

  res.setHeader("Set-Cookie", `${COOKIE}=${await tokenFor(pw)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`);
  return res.status(200).json({ ok: true });
}
