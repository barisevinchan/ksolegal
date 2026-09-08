import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import type { Locale } from "@/i18n/routing";
import { aboutParagraphs, pick } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  // Nötr, açıklayıcı başlık ve açıklama — anahtar kelime yığmadan
  // (TBB Reklam Yasağı Yönetmeliği Madde 7/e).
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/biz-kimiz",
  });
}

/**
 * Büro tanıtımı: iki paragraf, tek sütun.
 *
 * Metin müşterinin gönderdiği PDF'in "WHO WE ARE?" bölümünden gelir ve
 * `content/buro.json` içinde durur. Türkçe karşılıklar taslak çeviridir,
 * müşteri onayı beklemektedir.
 *
 * Sayfa başlığı nav etiketiyle aynı kalır ("Hakkımızda" / "About");
 * PDF'teki "WHO WE ARE?" başlığı kullanılmaz.
 *
 * ⚠️ Dil bilgilendiricidir: "uzman", üstünlük iddiası, rakam, kazanılmış
 * dava veya müvekkil örneği YOKTUR (TBB Reklam Yasağı Yönetmeliği).
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <>
      {/* `lead` verilmez — müşteri ayrı bir giriş cümlesi göndermedi. */}
      <PageHeader title={t("title")} />

      <Container>
        <div className="justify-prose max-w-prose space-y-6 pb-16 text-body text-grey-800 md:pb-24">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{pick(paragraph, locale)}</p>
          ))}
        </div>
      </Container>
    </>
  );
}
