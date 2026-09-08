import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import LegalBlocks from "@/components/LegalBlocks";
import PageHeader from "@/components/PageHeader";
import type { Locale } from "@/i18n/routing";
import { pick, pickBlocks, privacyNotice } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/gizlilik-politikasi",
  });
}

/**
 * Metin müşterinin kaynak/icerik/Gizlilik.docx dosyasından birebir
 * alınmıştır (bkz. `content/gizlilik.json` `_note`) — kısaltılmadı,
 * değiştirilmedi. Başlık (`PrivacyPolicy.title`) docx'te TAMAMI BÜYÜK
 * HARFLE yazılıydı; site genelindeki normal başlık büyük/küçük harf
 * kuralıyla tutarlı kalması için 05.09.2026'da kullanıcı talimatıyla
 * normal yazıma çevrildi — Word stilinin harf büyüklüğü, içeriğin
 * kendisi değil.
 *
 * "Son Güncelleme" satırı `PageHeader`'ın `lead` alanına verilir —
 * diğer sayfalarda büro tanıtım cümlesinin durduğu yerdir, burada
 * güncellik bilgisi aynı görsel ağırlıkla oturur.
 *
 * Bölüm içerikleri (`sections[].tr` / `.en`) BAĞIMSIZ dizilerdir: aynı
 * bölümde TR liste kullanırken EN tek paragrafa sığdırabiliyor (kaynak
 * docx'te iki dil ayrı yazılmış). `pickBlocks` bu ayrımı yapar.
 */
export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("PrivacyPolicy");

  return (
    <>
      <PageHeader title={t("title")} lead={pick(privacyNotice.updated, locale)} />

      <Container>
        <div className="space-y-12 pb-16 md:pb-24">
          <LegalBlocks blocks={pickBlocks(privacyNotice.intro, locale)} />

          {privacyNotice.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-h3 text-primary">
                {pick(section.heading, locale)}
              </h2>
              <LegalBlocks blocks={pickBlocks(section, locale)} />
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
