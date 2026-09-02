import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { lawyers, pick, practiceAreas } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/** Parametresiz statik rotalar — `routing.pathnames` içindeki [slug] içermeyenler. */
const staticPathnames = [
  "/",
  "/biz-kimiz",
  "/ekibimiz",
  "/faaliyet-alanlari",
  "/kariyer",
  "/iletisim",
] as const;

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

/**
 * Her locale için URL üretir ve diğer locale'lere `alternates.languages` ile
 * işaret eder (next-intl'in önerdiği hreflang kalıbı).
 */
function buildEntries(
  hrefForLocale: (locale: Locale) => Parameters<typeof getPathname>[0]["href"],
): MetadataRoute.Sitemap {
  const pathnames = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      getPathname({ locale, href: hrefForLocale(locale) }),
    ]),
  ) as Record<Locale, string>;

  return routing.locales.map((locale) => ({
    url: absoluteUrl(pathnames[locale]),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, absoluteUrl(pathnames[cur])]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const pathname of staticPathnames) {
    entries.push(...buildEntries(() => pathname));
  }

  for (const area of practiceAreas) {
    entries.push(
      ...buildEntries((locale) => ({
        pathname: "/faaliyet-alanlari/[slug]",
        params: { slug: pick(area.slug, locale) },
      })),
    );
  }

  for (const lawyer of lawyers) {
    entries.push(
      ...buildEntries(() => ({
        pathname: "/ekibimiz/[slug]",
        params: { slug: lawyer.slug },
      })),
    );
  }

  return entries;
}
