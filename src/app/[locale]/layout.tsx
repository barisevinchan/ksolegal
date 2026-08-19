import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EB_Garamond } from "next/font/google";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { routing } from "@/i18n/routing";

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
    // `template` alt sayfaların kendi <title>'ını marka adıyla tamamlar;
    // `default` yalnızca kendi title'ı olmayan sayfalarda kullanılır.
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
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
