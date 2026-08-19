import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderText from "@/components/PlaceholderText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CookiePolicy" });

  return { title: t("title"), description: t("metaDescription") };
}

/**
 * Yasal metin iskeleti. Nihai metin hukuki denetimden geçtikten sonra
 * girilir; şimdilik bölüm başlıkları ve yer tutucu paragraflar var.
 */
export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("CookiePolicy");
  const tCommon = await getTranslations("Common");

  const sections = [1, 2, 3, 4];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <div className="max-w-prose pb-16 md:pb-24">
          <p className="text-body-sm text-grey-600">{t("pendingNotice")}</p>

          {sections.map((index) => (
            <section key={index} className="mt-12">
              <h2 className="text-h3 text-primary md:text-h2">
                {tCommon("sectionTitle", { index })}
              </h2>
              <PlaceholderText className="mt-6" paragraphs={2} />
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
