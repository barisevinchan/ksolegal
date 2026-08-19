import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Container from "@/components/Container";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAreasForLawyer,
  getLawyer,
  hasText,
  lawyerSlugs,
  pick,
  titleLine,
} from "@/lib/content";

type Params = { locale: string; slug: string };

/**
 * Dil × slug kombinasyonlarının tamamı build sırasında üretilir; sayfa
 * dinamik render'a düşmez. Avukat slug'ları kişi adından türediği için
 * iki dilde de aynıdır.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    lawyerSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lawyer = getLawyer(slug);
  if (!lawyer) return {};

  const t = await getTranslations({ locale, namespace: "Team" });

  return { title: lawyer.name, description: t("metaDescription") };
}

/** Bölüm kabuğu — başlık ritmi ve bölümler arası boşluk tek yerde. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      {/* Boyut h3 (25px): docs/design-system.md §3.2'de h3 "alt bölüm
          başlığı", h4 ise "kart başlığı". Semantik seviye h2 kalır. */}
      <h2 className="text-h3 text-primary">{title}</h2>
      {children}
    </section>
  );
}

/** Etiket–değer satırı. Sicil ve iletişim bölümlerinde ortak. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="sm:flex sm:gap-6">
      <dt className="text-body-sm text-grey-600 sm:w-56 sm:shrink-0">
        {label}
      </dt>
      <dd className="text-body text-grey-800">{children}</dd>
    </div>
  );
}

/**
 * ⚠️ Bu sayfadaki alanlar CLAUDE.md "İzin verilen içerik" maddesinin
 * karşılığıdır ve GENİŞLETİLEMEZ: ad-soyad, hukuk alanındaki akademik
 * unvan, fotoğraf, TBB ve baro sicil numarası, mesleğe başlama tarihi,
 * mezun olunan üniversite, bilinen yabancı diller, iletişim bilgileri.
 *
 * Broşürde bulunmayan alanlar boş bırakıldı ve o bölüm HİÇ RENDER
 * EDİLMİYOR — ziyaretçiye tire dizisi göstermek yerine bölüm çıkmıyor.
 * Veri girildiğinde bölüm kendiliğinden görünür, kod değişmez.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const lawyer = getLawyer(slug);
  if (!lawyer) {
    notFound();
  }

  const t = await getTranslations("Team");
  const tCommon = await getTranslations("Common");

  const areas = getAreasForLawyer(lawyer);
  const { registry, contact } = lawyer;

  const registryRows = [
    { key: "tbbNo", label: t("fields.tbbNo"), value: registry.tbbNo },
    { key: "baroNo", label: t("fields.baroNo"), value: registry.baroNo },
    {
      key: "bar",
      label: t("fields.bar"),
      value: hasText(registry.bar) ? pick(registry.bar, locale) : "",
    },
    {
      key: "admission",
      label: t("fields.admission"),
      value: registry.admission,
    },
    {
      key: "mediator",
      label: t("fields.mediator"),
      value: registry.mediator
        ? t("mediatorValue", {
            no: registry.mediator.registryNo,
            year: registry.mediator.since,
          })
        : "",
    },
  ].filter((row) => hasText(row.value));

  // E-posta ve telefon tıklanabilir; KEP düz metin (mailto ile açılmaz).
  const contactRows = [
    {
      key: "email",
      label: t("fields.email"),
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
    {
      key: "phone",
      label: t("fields.phone"),
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : null,
    },
    { key: "kep", label: t("fields.kep"), value: contact.kep, href: null },
  ].filter((row) => hasText(row.value));

  return (
    <Container>
      <article className="py-16 md:py-24">
        <header className="grid gap-8 md:grid-cols-3 md:gap-12">
          <Portrait src={lawyer.photo} alt={lawyer.name} size="detail" />

          <div className="md:col-span-2">
            <h1 className="text-h2 text-primary md:text-h1">{lawyer.name}</h1>
            <p className="mt-3 text-body-lg text-grey-600">
              {titleLine(lawyer, locale)}
            </p>
          </div>
        </header>

        {lawyer.intro.length > 0 && (
          <div className="mt-12 max-w-prose space-y-4 text-body text-grey-800">
            {lawyer.intro.map((paragraph, index) => (
              <p key={index}>{pick(paragraph, locale)}</p>
            ))}
          </div>
        )}

        {lawyer.education.length > 0 && (
          <Section title={t("sections.education")}>
            {/* Ters kronolojik: en yeni derece üstte. */}
            <ol className="mt-6 space-y-6">
              {lawyer.education.map((entry) => (
                <li key={`${entry.year}-${entry.degree.tr}`} className="sm:flex sm:gap-6">
                  <span className="block text-body-sm text-grey-600 sm:w-56 sm:shrink-0">
                    {entry.year}
                  </span>
                  <div className="max-w-prose">
                    <p className="text-body text-grey-800">
                      {pick(entry.degree, locale)}
                    </p>
                    <p className="text-body-sm text-grey-600">
                      {pick(entry.institution, locale)}
                    </p>
                    {entry.note && (
                      <p className="mt-1 text-body-sm text-grey-600">
                        {pick(entry.note, locale)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {areas.length > 0 && (
          <Section title={t("sections.practiceAreas")}>
            <ul className="mt-6 space-y-3">
              {areas.map((area) => (
                <li key={area.id}>
                  <Link
                    href={{
                      pathname: "/faaliyet-alanlari/[slug]",
                      params: { slug: pick(area.slug, locale) },
                    }}
                    className="text-body text-grey-800 underline underline-offset-4 transition-text hover:text-primary"
                  >
                    {pick(area.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {lawyer.languages.length > 0 && (
          <Section title={t("sections.languages")}>
            <ul className="mt-6 space-y-2 text-body text-grey-800">
              {lawyer.languages.map((language) => (
                <li key={language.tr}>{pick(language, locale)}</li>
              ))}
            </ul>
          </Section>
        )}

        {registryRows.length > 0 && (
          <Section title={t("sections.registry")}>
            <dl className="mt-6 space-y-4">
              {registryRows.map((row) => (
                <Row key={row.key} label={row.label}>
                  {row.value}
                </Row>
              ))}
            </dl>
          </Section>
        )}

        {contactRows.length > 0 && (
          <Section title={t("sections.contact")}>
            <dl className="mt-6 space-y-4">
              {contactRows.map((row) => (
                <Row key={row.key} label={row.label}>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="underline underline-offset-4 transition-text hover:text-primary"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </Row>
              ))}
            </dl>
          </Section>
        )}

        <p className="mt-12">
          <Link
            href="/ekip"
            className="text-body-sm text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
          >
            {tCommon("backToList")}
          </Link>
        </p>
      </article>
    </Container>
  );
}
