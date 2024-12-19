import createMiddleware from "next-intl/middleware";
import { routing } from "./../_lib/i18n/routing";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export default function withLocale(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    if (
      request.nextUrl.pathname.match(/^\/$/) ||
      request.nextUrl.pathname.match(/^\/(ja|en)\//)
    ) {
      return createMiddleware(routing)(request);
    }
    return middleware(request, event);
  };
}

export const config = {
  matcher: ["/", "/(ja|en)/:path*"],
};
