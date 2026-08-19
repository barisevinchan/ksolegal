import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderBox from "@/components/PlaceholderBox";
import PlaceholderText from "@/components/PlaceholderText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  // Nötr, açıklayıcı başlık ve açıklama — anahtar kelime yığmadan
  // (TBB Reklam Yasağı Yönetmeliği Madde 7/e).
  return { title: t("title"), description: t("metaDescription") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-2 md:items-start md:gap-16 md:pb-24">
          <section>
            <h2 className="text-h3 text-primary md:text-h2">
              {tCommon("sectionTitle", { index: 1 })}
            </h2>
            <PlaceholderText className="mt-6" paragraphs={2} />
          </section>

          <PlaceholderBox aspect="landscape" />
        </div>

        <section className="pb-16 md:pb-24">
          <h2 className="text-h3 text-primary md:text-h2">
            {tCommon("sectionTitle", { index: 2 })}
          </h2>
          <PlaceholderText className="mt-6" paragraphs={3} />
        </section>
      </Container>
    </>
  );
}
