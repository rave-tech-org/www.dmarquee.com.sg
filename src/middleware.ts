import { type NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const res = NextResponse.next();
  res.headers.set('path', path);
  return res;
};

export const config = { matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'] };
