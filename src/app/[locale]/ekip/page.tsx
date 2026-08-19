import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import { getAreasForLawyer, lawyers, pick, titleLine } from "@/lib/content";

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
 * Fotoğraflı 3'lü grid: masaüstünde 3, tablette 2, mobilde 1 kolon.
 *
 * ⚠️ Kart içeriği CLAUDE.md "İzin verilen içerik" listesiyle SINIRLIDIR.
 * Etiket olarak yalnızca büronun faaliyet alanı adları yazılır — bunlar
 * uzmanlık iddiası değildir ve "uzmanı", "sorumlusu" gibi sıfat eklenmez.
 */
export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Team");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <ul className="grid gap-12 pb-16 sm:grid-cols-2 md:pb-24 lg:grid-cols-3">
          {lawyers.map((lawyer) => {
            const areas = getAreasForLawyer(lawyer);

            return (
              <li key={lawyer.slug}>
                <article>
                  <Link
                    href={{
                      pathname: "/ekip/[slug]",
                      params: { slug: lawyer.slug },
                    }}
                    className="group block"
                  >
                    <Portrait
                      src={lawyer.photo}
                      alt={lawyer.name}
                      size="card"
                    />

                    <h2 className="mt-6 text-h4 text-primary underline-offset-4 group-hover:underline">
                      {lawyer.name}
                    </h2>
                  </Link>

                  <p className="mt-2 text-body-sm text-grey-600">
                    {titleLine(lawyer, locale)}
                  </p>

                  {areas.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {areas.map((area) => (
                        <li
                          key={area.id}
                          className="text-body-sm text-grey-600"
                        >
                          {pick(area.title, locale)}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
