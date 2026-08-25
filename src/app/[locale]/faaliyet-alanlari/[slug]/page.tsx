import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  areaSummary,
  getAreaBySlug,
  getLawyersForArea,
  practiceAreas,
  pick,
} from "@/lib/content";

type Params = { locale: string; slug: string };

/**
 * Slug dile göre değiştiği için her dil kendi slug'ıyla üretilir:
 * /faaliyet-alanlari/is-hukuku ve /en/practice-areas/employment-law.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceAreas.map((area) => ({ locale, slug: area.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = getAreaBySlug(slug, locale);
  if (!area) return {};

  // Nötr, açıklayıcı meta açıklama — anahtar kelime yığmadan (Madde 7/e).
  // Overview'ın ilk cümlesi; 14 alanda 116–171 karakter aralığında.
  return {
    title: pick(area.title, locale),
    description: areaSummary(area, locale),
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Slug yalnızca AKTİF dilin slug'ıyla eşleşir; diğer dilin slug'ıyla
  // gelinirse 404 verilir, iki dilde aynı içeriğin iki yoldan açılması
  // (yinelenen içerik) önlenir.
  const area = getAreaBySlug(slug, locale);
  if (!area) {
    notFound();
  }

  const t = await getTranslations("PracticeAreas");
  const tCommon = await getTranslations("Common");

  // Alanda çalışan avukatlar avukatlar.json'dan türetilir; alan
  // dosyasında ayrıca liste tutulmaz, böylece iki liste kayamaz.
  const areaLawyers = getLawyersForArea(area.id);

  return (
    <>
      {/* PageHeader'da `lead` YOK: özet cümlesi zaten Overview'ın ilk
          cümlesidir, ikisini üst üste göstermek metni tekrar ederdi. */}
      <PageHeader title={pick(area.title, locale)} />

      <Container>
        <div className="pb-16 md:pb-24">
          {/* Bölümleme müşteri PDF'iyle birebir: Overview + Core Services. */}
          <div className="space-y-12">
            <section>
              <h2 className="text-h3 text-primary">{t("overviewHeading")}</h2>
              <div className="justify-prose mt-4 max-w-prose space-y-4 text-body text-grey-800">
                {area.overview.map((paragraph, index) => (
                  <p key={index}>{pick(paragraph, locale)}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-h3 text-primary">
                {t("coreServicesHeading")}
              </h2>
              <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-body text-grey-800 marker:text-grey-500">
                {area.coreServices.map((item) => (
                  <li key={item.en}>{pick(item, locale)}</li>
                ))}
              </ul>
            </section>
          </div>

          {areaLawyers.length > 0 && (
            <section className="mt-16 border-t border-grey-500 pt-12">
              {/* Etiket YOK: "uzmanı", "sorumlusu" gibi sıfatlar
                  kullanılmaz — yalnızca ad ve fotoğraf. */}
              <h2 className="text-h3 text-primary">{t("lawyersHeading")}</h2>

              <ul className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                {areaLawyers.map((lawyer) => (
                  <li key={lawyer.slug}>
                    <Link
                      href={{
                        pathname: "/ekibimiz/[slug]",
                        params: { slug: lawyer.slug },
                      }}
                      className="group flex min-h-11 items-center gap-4"
                    >
                      <Portrait
                        src={lawyer.photo}
                        alt={lawyer.name}
                        size="compact"
                      />
                      <span className="text-body text-grey-800 underline-offset-4 group-hover:underline">
                        {lawyer.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
