import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/i18n/navigation";
import { practiceAreas, pick } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PracticeAreas" });

  return { title: t("title"), description: t("metaDescription") };
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
        <ul className="grid gap-12 pb-16 sm:grid-cols-2 md:pb-24">
          {practiceAreas.map((area) => (
            <li key={area.id}>
              <Link
                href={{
                  pathname: "/faaliyet-alanlari/[slug]",
                  params: { slug: pick(area.slug, locale) },
                }}
                className="group block border-t border-grey-500 pt-6"
              >
                <h2 className="text-h3 text-primary underline-offset-4 group-hover:underline">
                  {pick(area.title, locale)}
                </h2>
                <p className="mt-3 max-w-prose text-body text-grey-600">
                  {pick(area.lead, locale)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
