import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EB_Garamond } from "next/font/google";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

import "../globals.css";

/**
 * Tek font ailesi. `weight` verilmez: variable font (wght 400..800) tek
 * dosya olarak gelir ve 400/500/600'ün üçünü de karşılar.
 *
 * `latin-ext` ZORUNLUDUR — ğ Ğ ş Ş İ bu aralıktadır (ı ve ç/ö/ü ise
 * `latin` içinde). Kaldırılırsa tofu render olur.
 */
const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    // Sitemap/robots'un da kullandığı tek canonical domain — alt sayfaların
    // `alternates.canonical`/`openGraph.url`'i bağıl path verirse buna göre
    // çözülür (bkz. `src/lib/seo.ts`).
    metadataBase: new URL(siteUrl),
    // Düz string: yalnızca kendi title'ı olmayan bir sayfa için fallback
    // olarak kullanılır. Her sayfa artık `title: {absolute}` ile kendi
    // mutlak başlığını döndürüyor (bkz. `buildPageMetadata`), bu yüzden
    // `template` mekanizması kullanılmıyor.
    title: t("title"),
    description: t("description"),
    // `openGraph` burada tanımlanmaz: Next.js bu alanı layout → sayfa
    // arasında derin birleştirmiyor, her sayfa kendi `openGraph`'ını
    // (`buildPageMetadata`/Home) zaten tam olarak veriyor — burada
    // tanımlamak yalnızca hiç görünmeyecek ölü kod olurdu.
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // SSG: bu çağrı olmadan sayfa dinamik render'a düşer.
  setRequestLocale(locale);

  const t = await getTranslations("Nav");

  return (
    <html lang={locale} className={ebGaramond.variable}>
      <body className="flex min-h-screen flex-col">
        <OrganizationJsonLd locale={locale as Locale} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="focus-ring-inverse sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:bg-surface focus:px-4 focus:py-2 focus:text-primary"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
