export default async function handler(req, res) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

  const { password } = req.body;

  if (password === process.env.SITE_PASSWORD) {
        res.setHeader(
                'Set-Cookie',
                'site-auth=ok; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400'
              );
        return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
