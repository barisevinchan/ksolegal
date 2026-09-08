import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

/** Verilen rota için her locale'in mutlak URL'ini üretir. */
export function localizedUrls(
  hrefForLocale: (locale: Locale) => Href,
): Record<Locale, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(getPathname({ locale, href: hrefForLocale(locale) })),
    ]),
  ) as Record<Locale, string>;
}

/**
 * Önceden hesaplanmış URL'lerden canonical + hreflang (tr, en, x-default)
 * üretir. `x-default` `routing.defaultLocale`'in URL'ine eşlenir.
 */
export function alternatesFromUrls(
  urls: Record<Locale, string>,
  currentLocale: Locale,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: urls[currentLocale],
    languages: { ...urls, "x-default": urls[routing.defaultLocale] },
  };
}

/** canonical + hreflang (tr, en, x-default) üretir. */
export function buildAlternates(
  hrefForLocale: (locale: Locale) => Href,
  currentLocale: Locale,
): NonNullable<Metadata["alternates"]> {
  return alternatesFromUrls(localizedUrls(hrefForLocale), currentLocale);
}

/**
 * Sayfa adı 40 karakteri aşarsa sonek tamamen düşer. Eşik matematiksel
 * olarak seçildi: 40 + " - Koçak Sayım Örnek" (20 karakter) = 60 —
 * Google'ın SERP'te kırpma sınırını aşmayı garanti dışı bırakır.
 */
const TITLE_SUFFIX_THRESHOLD = 40;

export function buildPageTitle(pageTitle: string, suffix: string): string {
  return pageTitle.length > TITLE_SUFFIX_THRESHOLD
    ? pageTitle
    : `${pageTitle} - ${suffix}`;
}

/**
 * Next.js, `openGraph` gibi nesne alanlarını layout → sayfa arasında derin
 * birleştirmez — sayfanın döndürdüğü `openGraph` nesnesi layout'unkini
 * TAMAMEN değiştirir. Bu yüzden `siteName`/`locale`/`type` her sayfada
 * tekrar verilir, yoksa `og:site_name` kaybolur.
 */
export function openGraphLocaleTag(locale: Locale): "tr_TR" | "en_US" {
  return locale === "tr" ? "tr_TR" : "en_US";
}

/**
 * 8 statik + 2 dinamik sayfanın `generateMetadata`'sının ortak kalıbı:
 * mutlak title (sonekli), canonical/hreflang ve openGraph bir arada.
 */
export async function buildPageMetadata({
  locale,
  title,
  description,
  hrefForLocale,
}: {
  locale: Locale;
  title: string;
  description: string;
  hrefForLocale: (locale: Locale) => Href;
}): Promise<Metadata> {
  const tMetadata = await getTranslations({ locale, namespace: "Metadata" });
  const finalTitle = buildPageTitle(title, tMetadata("titleSuffix"));
  const urls = localizedUrls(hrefForLocale);
  const canonicalUrl = urls[locale];

  return {
    title: { absolute: finalTitle },
    description,
    alternates: alternatesFromUrls(urls, locale),
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: tMetadata("title"),
      locale: openGraphLocaleTag(locale),
      type: "website",
    },
  };
}
