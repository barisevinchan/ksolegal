import { defineRouting } from "next-intl/routing";

/**
 * İngilizce varsayılan dildir ve önek almaz: /who-we-are
 * Türkçe önekli ve slug'ları çevrilmiştir: /tr/biz-kimiz
 *
 * pathnames'teki rotaların bir kısmının dosyası henüz yok; kabuk
 * aşamasında bu beklenen durumdur (typecheck geçer, runtime 404 verir).
 */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  /**
   * Otomatik dil tespiti kapalı: middleware ne `NEXT_LOCALE` cookie'sine
   * ne de `Accept-Language` başlığına bakar. Sonuç: `/` her koşulda
   * kesin İngilizce, `/tr` kesin Türkçe.
   *
   * Kazanç: öneksiz İngilizce yol hiçbir senaryoda yönlendirmez (yeni
   * sekme, yer imi, arama motoru, CDN önbelleği dahil) ve `/` cookie'ye
   * bağımlı olmadığı için tam önbelleklenebilir.
   *
   * Bedel: Türkçe ziyaretçiye tarayıcı diline göre otomatik Türkçe
   * sunulmaz; kullanıcı dil değiştiriciden TR'ye geçer.
   */
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/biz-kimiz": { tr: "/biz-kimiz", en: "/who-we-are" },
    "/ekibimiz": { tr: "/ekibimiz", en: "/our-people" },
    "/ekibimiz/[slug]": { tr: "/ekibimiz/[slug]", en: "/our-people/[slug]" },
    "/faaliyet-alanlari": { tr: "/faaliyet-alanlari", en: "/practice-areas" },
    "/faaliyet-alanlari/[slug]": {
      tr: "/faaliyet-alanlari/[slug]",
      en: "/practice-areas/[slug]",
    },
    "/kariyer": { tr: "/kariyer", en: "/careers" },
    "/iletisim": { tr: "/iletisim", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
