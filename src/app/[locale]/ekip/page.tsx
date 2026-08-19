import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderBox from "@/components/PlaceholderBox";
import { Link } from "@/i18n/navigation";
import { teamSlugs } from "@/lib/placeholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Team" });

  return { title: t("title"), description: t("metaDescription") };
}

/**
 * Fotoğraflı 3'lü grid (docs/design-system.md §5.2): masaüstünde 3,
 * tablette 2, mobilde 1 kolon.
 *
 * ⚠️ Kart içeriği CLAUDE.md "İzin verilen içerik" listesiyle SINIRLIDIR.
 * Bu listede olmayan hiçbir alan (görülen dava, ilgi alanı, kısa özgeçmiş,
 * unvan dışı sıfat) karta eklenmez.
 */
export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Team");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <ul className="grid gap-8 pb-16 sm:grid-cols-2 md:gap-12 md:pb-24 lg:grid-cols-3">
          {teamSlugs.map((slug, index) => (
            <li key={slug}>
              <article>
                <Link
                  href={{ pathname: "/ekip/[slug]", params: { slug } }}
                  className="group block"
                >
                  {/* Portre fotoğrafı yer tutucusu — 3:4 dikey oran */}
                  <PlaceholderBox aspect="portrait" />

                  <h2 className="mt-6 text-h4 text-primary underline-offset-4 group-hover:underline">
                    {t("memberName", { index: index + 1 })}
                  </h2>
                </Link>

                {/* İzin verilen alanlardan yalnızca akademik unvan kartta
                    gösterilir; kalanı detay sayfasında. Değer yer tutucu. */}
                <dl className="mt-3 text-body-sm text-grey-600">
                  <dt className="sr-only">{t("fields.academicTitle")}</dt>
                  <dd>{tCommon("placeholderValue")}</dd>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
