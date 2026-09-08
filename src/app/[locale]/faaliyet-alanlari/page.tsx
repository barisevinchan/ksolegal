import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { areaSummary, practiceAreas, pick } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PracticeAreas" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/faaliyet-alanlari",
  });
}

/**
 * Faaliyet alanı listesi.
 *
 * ⚠️ Dil bilgilendiricidir, pazarlama dili değildir: "uzman", "deneyimli",
 * "başarılı" gibi sıfatlar, üstünlük iddiası, rakam, dava veya müvekkil
 * örneği KULLANILMAZ. Alanlar "uzmanlık anlamına gelmemek kaydıyla"
 * verilebilir (TBB Reklam Yasağı Yönetmeliği Madde 7/d).
 *
 * Slug'lar dile göre değişir ama ikisi de nötrdür; anahtar kelime içermez
 * (Madde 7/e).
 */
export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("PracticeAreas");

  return (
    <>
      <PageHeader title={t("title")} />

      <Container>
        {/*
          14 kart. Kırılımlar `/ekibimiz` ile aynı (sm:2, lg:3) — iki liste
          sayfası aynı ritmi paylaşsın diye.

          `sm:auto-rows-fr`: tüm satır izleri en uzun satıra eşitlenir,
          böylece 14 kartın hepsi aynı yükseklikte durur ve özet uzunluğu
          farkı satır bandını bozmaz. Son satırda iki kart kalır (14 = 4×3+2);
          grid'de bu iki öğe kendi kolon izinde durduğu için yatayda YAYILMAZ,
          `flex-grow` kullanılmaz.

          Mobilde uygulanmaz: tek kolonda yan yana kart olmadığı için
          eşitlemenin görsel karşılığı yok, yalnızca boşluk ve scroll
          üretirdi. Aynı gerekçeyle boşluk mobilde bir basamak dar.
        */}
        <ul className="grid gap-8 pb-16 sm:auto-rows-fr sm:grid-cols-2 sm:gap-12 md:pb-24 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <li key={area.id}>
              <Link
                href={{
                  pathname: "/faaliyet-alanlari/[slug]",
                  params: { slug: pick(area.slug, locale) },
                }}
                className="group block border-t border-grey-500 pt-6"
              >
                {/* h4: docs/design-system.md §3.2'de "kart başlığı".
                    /ekibimiz kartlarıyla aynı basamak. */}
                <h2 className="text-h4 text-primary underline-offset-4 group-hover:underline">
                  {pick(area.title, locale)}
                </h2>
                {/* Özet, Overview'ın YALNIZCA ilk cümlesidir — müşterinin
                    kendi cümlesi, kısaltılmadan (bkz. `areaSummary`). */}
                <p className="mt-3 text-body-sm text-grey-600">
                  {areaSummary(area, locale)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
