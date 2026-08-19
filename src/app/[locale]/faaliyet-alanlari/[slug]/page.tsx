import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderText from "@/components/PlaceholderText";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { practiceAreaSlugs } from "@/lib/placeholder";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceAreaSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const index = practiceAreaSlugs.indexOf(slug);
  if (index === -1) return {};

  const t = await getTranslations({ locale, namespace: "PracticeAreas" });

  return {
    title: t("areaTitle", { index: index + 1 }),
    description: t("metaDescription"),
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = practiceAreaSlugs.indexOf(slug);
  if (index === -1) {
    notFound();
  }

  const t = await getTranslations("PracticeAreas");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHeader
        title={t("areaTitle", { index: index + 1 })}
        lead={t("lead")}
      />

      <Container>
        <div className="pb-16 md:pb-24">
          <PlaceholderText paragraphs={3} />

          <section className="mt-12">
            <h2 className="text-h3 text-primary md:text-h2">
              {tCommon("sectionTitle", { index: 1 })}
            </h2>
            <PlaceholderText className="mt-6" paragraphs={2} />
          </section>

          <p className="mt-12">
            <Link
              href="/faaliyet-alanlari"
              className="text-body-sm text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
            >
              {tCommon("backToList")}
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
