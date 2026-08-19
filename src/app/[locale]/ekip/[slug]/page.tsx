import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import PlaceholderBox from "@/components/PlaceholderBox";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { teamSlugs } from "@/lib/placeholder";

type Params = { locale: string; slug: string };

/**
 * Dil × slug kombinasyonlarının tamamı build sırasında üretilir; sayfa
 * dinamik render'a düşmez.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    teamSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const index = teamSlugs.indexOf(slug);
  if (index === -1) return {};

  const t = await getTranslations({ locale, namespace: "Team" });

  return {
    title: t("memberName", { index: index + 1 }),
    description: t("metaDescription"),
  };
}

/**
 * ⚠️ Bu sayfadaki alan listesi CLAUDE.md "İzin verilen içerik" maddesinin
 * birebir karşılığıdır ve GENİŞLETİLEMEZ: ad-soyad, akademik unvan,
 * fotoğraf, TBB ve baro sicil numarası, mesleğe başlama tarihi, mezun
 * olunan üniversite, bilinen yabancı diller, iletişim bilgileri.
 *
 * Değerler yer tutucudur; gerçek veri broşürlerden çıkarılıp
 * content/avukatlar.json'a yazıldıktan sonra bağlanır.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = teamSlugs.indexOf(slug);
  if (index === -1) {
    notFound();
  }

  const t = await getTranslations("Team");
  const tCommon = await getTranslations("Common");

  const fields = [
    "academicTitle",
    "tbbNo",
    "baroNo",
    "admission",
    "university",
    "languages",
    "email",
    "phone",
  ] as const;

  return (
    <Container>
      <article className="grid gap-12 py-16 md:grid-cols-3 md:gap-16 md:py-24">
        <div className="md:col-span-1">
          <PlaceholderBox aspect="portrait" />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-h2 text-primary md:text-h1">
            {t("memberName", { index: index + 1 })}
          </h1>

          <dl className="mt-8 space-y-4">
            {fields.map((field) => (
              <div key={field} className="sm:flex sm:gap-6">
                <dt className="text-body-sm text-grey-600 sm:w-56 sm:shrink-0">
                  {t(`fields.${field}`)}
                </dt>
                <dd className="text-body text-grey-800">
                  {tCommon("placeholderValue")}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-12">
            <Link
              href="/ekip"
              className="text-body-sm text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
            >
              {tCommon("backToList")}
            </Link>
          </p>
        </div>
      </article>
    </Container>
  );
}
