import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { getOfficeContactRows, office, pick } from "@/lib/content";

/**
 * Google Maps embed'i API anahtarı GEREKTİRMEZ: `output=embed` parametreli
 * genel arama URL'i, Maps Embed API'nin (JS API + anahtar kurulumu
 * gerektiren) yerine kullanılır — unattended bir ortamda anahtar
 * sağlanamayacağı için bilerek bu yol seçildi.
 */
const MAP_ADDRESS = "Elit Residence, No:3/14, Şişli, İstanbul, Türkiye";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&output=embed`;
const MAP_LINK_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_ADDRESS)}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return { title: t("title"), description: t("metaDescription") };
}

/**
 * İletişim formu kullanıcı talimatıyla tamamen kaldırıldı (form hiçbir
 * zaman çalışmıyordu; backend, spam koruması ve Turnstile artık gündemde
 * değil). Sayfa yalnızca iletişim bilgileri ve harita içerir.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");
  const tFooter = await getTranslations("Footer");

  /*
    Satırlar `content/buro.json`'dan gelir ve footer ile ORTAKTIR.
    Değeri boş olan satır listeye hiç girmez — telefon, faks ve KEP
    müşteriden gelmediği için şu an yalnızca adres ve e-posta çıkar.
    Veri geldiğinde yalnızca JSON güncellenir, bu dosya değişmez.
  */
  const infoRows = getOfficeContactRows(locale);

  return (
    <>
      <PageHeader title={t("title")} lead={pick(office.lead, locale)} />

      <Container>
        {/* Form kaldırılınca tek bölüm kaldı — iki kolonlu grid yerine
            tek, ortalanmış kolon (docs/design-system.md prose genişliği). */}
        <section aria-labelledby="contact-info" className="mx-auto max-w-prose pb-16 md:pb-24">
          <h2 id="contact-info" className="text-h3 text-primary md:text-h2">
            {t("infoHeading")}
          </h2>

          <dl className="mt-8 space-y-4">
            {infoRows.map((row) => (
              <div key={row.key} className="sm:flex sm:gap-6">
                <dt className="text-body-sm text-grey-600 sm:w-32 sm:shrink-0">
                  {tFooter(row.key)}
                </dt>
                <dd className="text-body text-grey-800">
                  {row.href ? (
                    /* `inline-flex min-h-11` dokunma hedefini 44px'e
                       tamamlar (docs/design-system.md §6.2) — satırın
                       görsel yüksekliği değişmez, yalnızca tıklama
                       alanı büyür. */
                    <a
                      href={row.href}
                      className="inline-flex min-h-11 items-center underline underline-offset-4 transition-text hover:text-primary"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="contact-map" className="pb-16 md:pb-24">
          <h2 id="contact-map" className="text-h3 text-primary md:text-h2">
            {t("mapHeading")}
          </h2>

          {/* API anahtarı gerektirmeyen genel arama embed'i — bkz. dosya
              başındaki MAP_EMBED_SRC yorumu. */}
          <div className="mt-8 aspect-[16/9] w-full">
            <iframe
              src={MAP_EMBED_SRC}
              title={t("mapHeading")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>

          <p className="mt-3 text-body text-grey-800">
            {pick(office.address, locale)}
          </p>

          <p className="mt-1 text-body-sm">
            <a
              href={MAP_LINK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
            >
              {t("mapLinkLabel")}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
