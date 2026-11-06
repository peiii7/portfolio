import { isUnlocked } from "./_private/token.js";
import { CTBC } from "./_private/ctbc.js";

/* GET /api/case?slug=ctbc-bank → the locked case study's text, only after the
   password has been entered (same cookie check as middleware.js). */
const LOCKED = { "ctbc-bank": CTBC };

export default async function handler(req, res) {
  const data = LOCKED[req.query.slug];
  if (!data) return res.status(404).json({ error: "Not found" });
  res.setHeader("Cache-Control", "private, no-store");
  if (!(await isUnlocked(req.headers.cookie))) return res.status(401).json({ error: "Locked" });
  return res.status(200).json(data);
}
