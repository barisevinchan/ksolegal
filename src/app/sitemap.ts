import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { lawyers, pick, practiceAreas } from "@/lib/content";
import { localizedUrls } from "@/lib/seo";

/** Parametresiz statik rotalar — `routing.pathnames` içindeki [slug] içermeyenler. */
const staticPathnames = [
  "/",
  "/biz-kimiz",
  "/ekibimiz",
  "/faaliyet-alanlari",
  "/kariyer",
  "/iletisim",
] as const;

/**
 * Her locale için URL üretir ve diğer locale'lere `alternates.languages` ile
 * işaret eder (next-intl'in önerdiği hreflang kalıbı), `x-default` dahil.
 */
function buildEntries(
  hrefForLocale: (locale: Locale) => Parameters<typeof getPathname>[0]["href"],
): MetadataRoute.Sitemap {
  const urls = localizedUrls(hrefForLocale);

  return routing.locales.map((locale) => ({
    url: urls[locale],
    alternates: {
      languages: { ...urls, "x-default": urls[routing.defaultLocale] },
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
