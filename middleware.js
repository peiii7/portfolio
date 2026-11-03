export const config = {
    matcher: ['/((?!password.html|api/|favicon.ico|_vercel|robots.txt|assets|css|images|js|resume).*)'],
};

export default async function middleware(request) {
    const url = new URL(request.url);
    const cookieHeader = request.headers.get('cookie') || '';
    const isAuthenticated = cookieHeader.split(';').some(c => c.trim() === 'site-auth=ok');

  if (!isAuthenticated) {
        return Response.redirect(new URL('/password.html', request.url));
  }
}
