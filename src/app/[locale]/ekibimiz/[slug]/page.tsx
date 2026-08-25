import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Container from "@/components/Container";
import Portrait from "@/components/Portrait";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  displayName,
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

/**
 * LinkedIn "in" işareti. Yeni bir ikon paketi kurulmadı — statik, tek
 * kullanımlık marka işareti olduğu için inline SVG yeterli. Dekoratiftir
 * (anlam taşıyan bilgi `aria-label` ile linkin kendisinde), bu yüzden
 * `aria-hidden`.
 */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7c1.15 0 2.08-.93 2.08-2.08C7.33 3.77 6.4 2.84 5.25 2.84c-1.15 0-2.08.93-2.08 2.08C3.17 6.07 4.1 7 5.25 7Z" />
      <path d="M13.06 8.5H9.83V20.5h3.23v-6.3c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38v6.19H20.7v-6.86c0-3.02-.65-5.35-4.18-5.35-1.7 0-2.83.93-3.3 1.82h-.04V8.5Z" />
    </svg>
  );
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
 * unvan, mesleki unvan, fotoğraf, mezun olunan üniversite, bilinen
 * yabancı diller, iletişim bilgileri.
 *
 * Sicil bilgileri (TBB/baro sicil no, bağlı olduğu baro, mesleğe
 * başlama tarihi), eğitim yılı, tez başlığı ve faaliyet alanı listesi
 * kullanıcı talimatıyla KALDIRILDI; yeniden eklenmeyecek. Faaliyet
 * alanı ilişkisi tek yönde durmaya devam ediyor: alan sayfasındaki
 * "Bu alanda çalışan avukatlar" bölümü.
 *
 * Verisi olmayan bölüm HİÇ RENDER EDİLMİYOR — ziyaretçiye tire dizisi
 * göstermek yerine bölüm çıkmıyor. Veri girildiğinde bölüm
 * kendiliğinden görünür, kod değişmez.
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

  const { contact } = lawyer;

  // E-posta artık başlık bloğunda gösteriliyor (bkz. aşağı); bu listede
  // tekrarlanmaz — aynı bilgi iki yerde görünmesin diye. Telefon
  // tıklanabilir; KEP düz metin (mailto ile açılmaz).
  const contactRows = [
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
            {/* Akademik unvan adın YANINDA (virgülle), mesleki unvanlar
                adın ALTINDA orta noktayla ayrılmış sırada.
                Biçim iki dilde de aynı — `Team.nameWithDegree`. */}
            <h1 className="text-h2 text-primary md:text-h1">
              {displayName(lawyer, (values) => t("nameWithDegree", values))}
            </h1>
            <p className="mt-3 text-body-lg text-grey-600">
              {titleLine(lawyer, {
                attorney: t("titles.attorney"),
                mediator: t("titles.mediator"),
                partner: t("titles.partner"),
              })}
            </p>

            {hasText(contact.email) && (
              <p className="mt-3 text-body text-grey-800">
                <a
                  href={`mailto:${contact.email}`}
                  className="underline underline-offset-4 transition-text hover:text-primary"
                >
                  {contact.email}
                </a>
              </p>
            )}

            {hasText(contact.linkedin) && (
              // `-ml-2.5` dokunma hedefini 44×44'e tamamlayan padding'i
              // görsel olarak yukarıdaki metinle hizalar (§6.2).
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedinAriaLabel")}
                className="-ml-2.5 mt-1 inline-flex h-11 w-11 items-center justify-center text-grey-600 transition-text hover:text-primary"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </header>

        {lawyer.intro.length > 0 && (
          <div className="justify-prose mt-12 max-w-prose space-y-4 text-body text-grey-800">
            {lawyer.intro.map((paragraph, index) => (
              <p key={index}>{pick(paragraph, locale)}</p>
            ))}
          </div>
        )}

        {/*
          Key Focus — müşteri PDF'indeki "Başlık — açıklama" yapısı
          korunur; <dl> semantik olarak tam bu ilişkiyi ifade eder.
          Açıklama grey-600 (açık zeminde 5.92:1, body-sm için AA
          geçerli — docs/design-system.md §1.3).
        */}
        {lawyer.keyFocus.length > 0 && (
          <Section title={t("sections.keyFocus")}>
            <dl className="mt-6 space-y-6">
              {lawyer.keyFocus.map((item) => (
                <div key={item.title.en} className="max-w-prose">
                  <dt className="text-body text-grey-800">
                    {pick(item.title, locale)}
                  </dt>
                  <dd className="mt-1 text-body-sm text-grey-600">
                    {pick(item.description, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {lawyer.education.length > 0 && (
          <Section title={t("sections.education")}>
            {/* Ters kronolojik: en yeni derece üstte. Yıl ve tez başlığı
                kullanıcı talimatıyla kaldırıldı — geriye derece ve kurum
                kalır, ikisi de tam genişlikte. */}
            <ol className="mt-6 space-y-6">
              {lawyer.education.map((entry) => (
                <li key={entry.degree.tr} className="max-w-prose">
                  <p className="text-body text-grey-800">
                    {pick(entry.degree, locale)}
                  </p>
                  <p className="text-body-sm text-grey-600">
                    {pick(entry.institution, locale)}
                  </p>
                </li>
              ))}
            </ol>
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
            href="/ekibimiz"
            className="text-body-sm text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
          >
            {tCommon("backToList")}
          </Link>
        </p>
      </article>
    </Container>
  );
}
