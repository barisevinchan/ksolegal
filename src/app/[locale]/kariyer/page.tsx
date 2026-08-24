import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { careerParagraphs, office, pick } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });

  // Nötr, açıklayıcı başlık ve açıklama — anahtar kelime yığmadan
  // (TBB Reklam Yasağı Yönetmeliği Madde 7/e).
  return { title: t("title"), description: t("metaDescription") };
}

/**
 * Kariyer: üç paragraf + başvuru e-postasına mailto linki, tek sütun.
 * Şablon `/biz-kimiz` ile birebir aynıdır — yeni düzen icat edilmez.
 *
 * Metin kullanıcının 24.08.2026 talimatıyla geldi ve
 * `content/kariyer.json` içinde durur. Form YOK — düz metindir.
 *
 * E-posta ayrı bir alanda tutulmaz: `office.email` (`content/buro.json`)
 * doğrudan kullanılır, kullanıcı kararıyla ayrı bir kariyer kutusu
 * tanımlanmadı.
 *
 * Sayfa başlığı nav etiketiyle aynı kalır ("Kariyer" / "Careers").
 *
 * ⚠️ Dil bilgilendiricidir: "uzman", üstünlük iddiası, rakam, kazanılmış
 * dava veya müvekkil örneği YOKTUR (TBB Reklam Yasağı Yönetmeliği).
 */
export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Careers");

  return (
    <>
      <PageHeader title={t("title")} />

      <Container>
        <div className="justify-prose max-w-prose space-y-6 pb-16 text-body text-grey-800 md:pb-24">
          {careerParagraphs.map((paragraph, index) => (
            <p key={index}>{pick(paragraph, locale)}</p>
          ))}
          <p>
            <a
              href={`mailto:${office.email}`}
              className="underline underline-offset-4 transition-text hover:text-primary"
            >
              {office.email}
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
