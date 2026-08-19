import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // API, Next.js dahilî yolları ve uzantılı dosyalar hariç her şey.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
