import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * next-intl, yanlış locale'in slug'ıyla gelen istekleri (ör. `/faaliyet-alanlari`
 * — bu, `/practice-areas`'ın Türkçe pathname'idir ama İngilizce varsayılan
 * alanda karşılığı yoktur) her zaman 307 ile yönlendirir. `localeDetection:
 * false` olduğu için bu middleware'deki TÜM redirect'ler yapısaldır — tarayıcı
 * diline veya çerezine göre geçici bir tahmin değildir — bu yüzden Google'ın
 * eski URL'yi indeksten düşürüp kalıcı hedefi tanıması için 308'e yükseltilir.
 * Google'ın `/faaliyet-alanlari` ve `/kariyer` gibi önek'siz Türkçe slug'ları
 * İngilizce içerikle indekslemesi (307'nin kalıcı sayılmaması) bu düzeltmenin
 * asıl nedenidir.
 */
export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  if (response.status === 307 && response.headers.has("location")) {
    return new NextResponse(null, { status: 308, headers: response.headers });
  }

  return response;
}

export const config = {
  // API, Next.js dahilî yolları ve uzantılı dosyalar hariç her şey.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
