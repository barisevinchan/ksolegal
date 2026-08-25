import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

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
 * `**...**` ile işaretli bölümleri kalın, `email` metnini mailto linkine
 * çevirir. `content/kariyer.json` içindeki kaynak metnin kendi
 * biçimlendirmesidir (bkz. dosyanın `_note` alanı) — burada icat edilmedi.
 *
 * Gövde metninde 500/600 ağırlık kullanılmaz kuralının (CLAUDE.md
 * "Tipografi kararı") tek, açıkça onaylanmış istisnasıdır: kullanıcının
 * 25.08.2026 talimatı hangi ifadelerin kalın kalacağını kelime kelime
 * belirtti. En küçük sapma olması için başlıklarda zaten kullanılan
 * `font-medium` (500) ağırlığı kullanılır, yeni bir ağırlık eklenmez.
 */
function parseParagraph(text: string, email: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const boldParts = text.split(/\*\*(.+?)\*\*/g);

  boldParts.forEach((chunk, boldIndex) => {
    if (chunk === "") return;

    if (boldIndex % 2 === 1) {
      nodes.push(
        <strong key={`b${boldIndex}`} className="font-medium">
          {chunk}
        </strong>,
      );
      return;
    }

    chunk.split(email).forEach((piece, pieceIndex, pieces) => {
      if (piece !== "") {
        nodes.push(<span key={`b${boldIndex}t${pieceIndex}`}>{piece}</span>);
      }
      if (pieceIndex < pieces.length - 1) {
        nodes.push(
          <a
            key={`b${boldIndex}e${pieceIndex}`}
            href={`mailto:${email}`}
            className="underline underline-offset-4 transition-text hover:text-primary"
          >
            {email}
          </a>,
        );
      }
    });
  });

  return nodes;
}

/**
 * Kariyer: üç paragraf, tek sütun. Şablon `/biz-kimiz` ile birebir
 * aynıdır — yeni düzen icat edilmez.
 *
 * Metin kullanıcının 25.08.2026 talimatıyla geldi ve
 * `content/kariyer.json` içinde durur. Form YOK — düz metindir.
 *
 * E-posta ayrı bir alanda tutulmaz: paragraf metni içinde geçen
 * `office.email` (`content/buro.json`) `parseParagraph` tarafından
 * otomatik olarak mailto linkine çevrilir; ayrı bir kariyer kutusu
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
            <p key={index}>
              {parseParagraph(pick(paragraph, locale), office.email)}
            </p>
          ))}
        </div>
      </Container>
    </>
  );
}
