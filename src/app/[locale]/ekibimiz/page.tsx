import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  displayName,
  lawyers,
  pick,
  titleLine,
  type Lawyer,
} from "@/lib/content";
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

  const renderCard = (lawyer: Lawyer, className?: string) => (
    <li key={lawyer.slug} className={className}>
      <article>
        <Link
          href={{
            pathname: "/ekibimiz/[slug]",
            params: { slug: lawyer.slug },
          }}
          className="group block"
        >
          <Portrait src={lawyer.photo} alt={lawyer.name} size="card" />

          {/* Ad + unvan biçimi detay sayfasıyla AYNI kalıptır;
              ikisi de `displayName` / `titleLine` üzerinden
              gelir, tek yerden değişir. */}
          <h2 className="mt-6 text-h4 text-primary underline-offset-4 group-hover:underline">
            {displayName(
              lawyer,
              (values) => t("nameWithDegree", values),
              locale,
            )}
          </h2>
        </Link>

        <p className="mt-2 text-body-sm text-grey-600">
          {titleLine(lawyer, {
            attorney: t("titles.attorney"),
            mediator: t("titles.mediator"),
            partner: t("titles.partner"),
            counsel: t("titles.counsel"),
            academicAdvisor: t("titles.academicAdvisor"),
          })}
        </p>

        {lawyer.practiceLabels.length > 0 && (
          <ul className="mt-3 space-y-1">
            {lawyer.practiceLabels.map((label) => (
              <li key={label.en} className="text-body-sm text-grey-600">
                {pick(label, locale)}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );

  return (
    <>
      <PageHeader title={t("title")} />

      <Container>
        <ul className="grid gap-12 pb-16 sm:grid-cols-2 md:pb-24 lg:grid-cols-3">
          {lawyers.filter((lawyer) => !lawyer.counsel).map((lawyer) =>
            renderCard(lawyer),
          )}
        </ul>

        {/* Of Counsel: ana grid'in altında, yatayda ortalı. 6 kolonlu grid'de
            `col-span-2` genişliği (W−2g)/3'tür — üstteki 3 kolonlu gridle
            BİREBİR aynı kart boyutu; 2. ve 4. kolondan başlamak iki kartı
            tam ortalar. Negatif üst boşluk, üst listenin alt padding'ini
            satır aralığına (48px) indirir. */}
        <ul className="-mt-4 grid gap-12 pb-16 sm:grid-cols-2 md:-mt-12 md:pb-24 lg:grid-cols-6">
          {lawyers
            .filter((lawyer) => lawyer.counsel)
            .map((lawyer, index) =>
              renderCard(
                lawyer,
                index === 0
                  ? "lg:col-span-2 lg:col-start-2"
                  : "lg:col-span-2 lg:col-start-4",
              ),
            )}
        </ul>
      </Container>
    </>
  );
}
