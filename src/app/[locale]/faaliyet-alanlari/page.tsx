import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/i18n/navigation";
import { practiceAreaSlugs } from "@/lib/placeholder";

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
 * Faaliyet alanı listesi. Dil nötr ve bilgilendiricidir — "uzman",
 * "lider", "en iyi" gibi ifadeler ve başarı/sonuç iddiası içermez
 * (CLAUDE.md yasak listesi). Alanlar, uzmanlık anlamına gelmemek
 * kaydıyla verilebilir (Madde 7/d).
 */
export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("PracticeAreas");
  const tLorem = await getTranslations("Lorem");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <ul className="grid gap-8 pb-16 sm:grid-cols-2 md:gap-12 md:pb-24">
          {practiceAreaSlugs.map((slug, index) => (
            <li key={slug}>
              <Link
                href={{
                  pathname: "/faaliyet-alanlari/[slug]",
                  params: { slug },
                }}
                className="group block border-t border-grey-500 pt-6"
              >
                <h2 className="text-h3 text-primary underline-offset-4 group-hover:underline">
                  {t("areaTitle", { index: index + 1 })}
                </h2>
                <p className="mt-3 max-w-prose text-body text-grey-600">
                  {tLorem("sentence")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
