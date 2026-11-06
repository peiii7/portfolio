import { isUnlocked } from "./api/_private/token.js";

/* Only the CTBC case study is password-protected; the rest of the site is public.
   - /work/ctbc-bank        → page; without the password, redirect to the password page
   - /case/ctbc/*           → its images/videos; without the password, 401
     (except hero.webm, which the public home-page card uses)
   Note: moving between pages inside the site doesn't reach this file, so the page
   itself also asks /api/case, which applies the same check. */
export const config = {
  matcher: ["/work/ctbc-bank", "/work/ctbc-bank/:path*", "/case/ctbc/:path*"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const p = url.pathname;
  const isLocked = p === "/work/ctbc-bank" || p.startsWith("/work/ctbc-bank/") || p.startsWith("/case/ctbc/");
  if (!isLocked) return;                                         // everything else is public
  if (p === "/case/ctbc/hero.webm") return;                      // public home card
  if (await isUnlocked(request.headers.get("cookie"))) return;   // password entered

  if (p.startsWith("/case/")) return new Response("Locked", { status: 401 });
  const to = new URL("/password.html", request.url);
  to.searchParams.set("next", p);
  return Response.redirect(to, 302);
}
