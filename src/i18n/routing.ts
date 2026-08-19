import { defineRouting } from "next-intl/routing";

/**
 * Türkçe varsayılan dildir ve önek almaz: /hakkimizda
 * İngilizce önekli ve slug'ları çevrilmiştir: /en/about
 *
 * pathnames'teki rotaların bir kısmının dosyası henüz yok; kabuk
 * aşamasında bu beklenen durumdur (typecheck geçer, runtime 404 verir).
 */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  /**
   * Otomatik dil tespiti kapalı: middleware ne `NEXT_LOCALE` cookie'sine
   * ne de `Accept-Language` başlığına bakar. Sonuç: `/` her koşulda
   * kesin Türkçe, `/en` kesin İngilizce.
   *
   * Kazanç: öneksiz Türkçe yol hiçbir senaryoda yönlendirmez (yeni sekme,
   * yer imi, arama motoru, CDN önbelleği dahil) ve `/` cookie'ye bağımlı
   * olmadığı için tam önbelleklenebilir.
   *
   * Bedel: İngilizce ziyaretçiye tarayıcı diline göre otomatik İngilizce
   * sunulmaz; kullanıcı dil değiştiriciden EN'e geçer.
   */
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/hakkimizda": { tr: "/hakkimizda", en: "/about" },
    "/ekip": { tr: "/ekip", en: "/team" },
    "/ekip/[slug]": { tr: "/ekip/[slug]", en: "/team/[slug]" },
    "/faaliyet-alanlari": { tr: "/faaliyet-alanlari", en: "/practice-areas" },
    "/faaliyet-alanlari/[slug]": {
      tr: "/faaliyet-alanlari/[slug]",
      en: "/practice-areas/[slug]",
    },
    "/iletisim": { tr: "/iletisim", en: "/contact" },
    "/kvkk": { tr: "/kvkk", en: "/privacy" },
    "/cerez-politikasi": { tr: "/cerez-politikasi", en: "/cookie-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
