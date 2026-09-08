import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import LegalBlocks from "@/components/LegalBlocks";
import PageHeader from "@/components/PageHeader";
import type { Locale } from "@/i18n/routing";
import { legalNotice, pick, type PrivacyBlock } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegalNotice" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/yasal-uyari",
  });
}

/**
 * Metin müşterinin kaynak/icerik/Yasal Uyarı.docx dosyasından birebir
 * alınmıştır (bkz. `content/yasal-uyari.json` `_note`) — kısaltılmadı,
 * değiştirilmedi. Başlık (`LegalNotice.title`) docx'te TAMAMI BÜYÜK
 * HARFLE yazılıydı; site genelindeki normal başlık büyük/küçük harf
 * kuralıyla tutarlı kalması için 05.09.2026'da kullanıcı talimatıyla
 * normal yazıma çevrildi — Word stilinin harf büyüklüğü, içeriğin
 * kendisi değil.
 *
 * İmza bloğu (ad / web sitesi / e-posta) iki dilde de aynı olduğu için
 * `contactLines` tek dizi olarak tutulur; burada son blok olarak
 * paragraflara eklenir.
 */
export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("LegalNotice");

  const blocks: PrivacyBlock[] = [
    ...legalNotice.paragraphs.map(
      (paragraph): PrivacyBlock => ({ type: "p", text: pick(paragraph, locale) }),
    ),
    { type: "lines", items: [...legalNotice.contactLines] },
  ];

  return (
    <>
      <PageHeader title={t("title")} />

      <Container>
        <div className="pb-16 md:pb-24">
          <LegalBlocks blocks={blocks} />
        </div>
      </Container>
    </>
  );
}
