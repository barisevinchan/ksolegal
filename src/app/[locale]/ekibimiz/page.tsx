import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { displayName, lawyers, pick, titleLine } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Team" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/ekibimiz",
  });
}

/**
 * Fotoğraflı 3'lü grid: masaüstünde 3, tablette 2, mobilde 1 kolon.
 *
 * Etiketler müşteri PDF'indeki ("OUR PEOPLE" / ilk kısım) tanıtım
 * satırından gelir ve DÜZ METİNDİR — link üretilmez. "Mediation",
 * "Regulatory" gibi başlıkların sitede karşılık gelen faaliyet alanı
 * sayfası yok; link kurmak kırık ya da yanlış eşleşme üretirdi. Gerçek
 * çapraz linkler detay sayfasındaki "Faaliyet Alanları" bölümündedir.
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
      <PageHeader title={t("title")} />

      <Container>
        <ul className="grid gap-12 pb-16 sm:grid-cols-2 md:pb-24 lg:grid-cols-3">
          {lawyers.map((lawyer) => {
            return (
              <li key={lawyer.slug}>
                <article>
                  <Link
                    href={{
                      pathname: "/ekibimiz/[slug]",
                      params: { slug: lawyer.slug },
                    }}
                    className="group block"
                  >
                    <Portrait
                      src={lawyer.photo}
                      alt={lawyer.name}
                      size="card"
                    />

                    {/* Ad + unvan biçimi detay sayfasıyla AYNI kalıptır;
                        ikisi de `displayName` / `titleLine` üzerinden
                        gelir, tek yerden değişir. */}
                    <h2 className="mt-6 text-h4 text-primary underline-offset-4 group-hover:underline">
                      {displayName(lawyer, (values) =>
                        t("nameWithDegree", values),
                      )}
                    </h2>
                  </Link>

                  <p className="mt-2 text-body-sm text-grey-600">
                    {titleLine(lawyer, {
                      attorney: t("titles.attorney"),
                      mediator: t("titles.mediator"),
                      partner: t("titles.partner"),
                    })}
                  </p>

                  {lawyer.practiceLabels.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {lawyer.practiceLabels.map((label) => (
                        <li
                          key={label.en}
                          className="text-body-sm text-grey-600"
                        >
                          {pick(label, locale)}
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
