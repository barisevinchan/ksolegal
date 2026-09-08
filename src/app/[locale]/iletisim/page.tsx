import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import ContactDetailsList from "@/components/ContactDetailsList";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import type { Locale } from "@/i18n/routing";
import { getOfficeContactRows, office, pick } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Google Maps embed'i API anahtarı GEREKTİRMEZ: `output=embed` parametreli
 * genel URL, Maps Embed API'nin (JS API + anahtar kurulumu gerektiren)
 * yerine kullanılır — unattended bir ortamda anahtar sağlanamayacağı için
 * bilerek bu yol seçildi.
 *
 * ⚠️ İlk sürüm `q=` parametresine SERBEST METİN ADRES (`Elit Residence,
 * No:3/14, Şişli, İstanbul, Türkiye`) veriyordu; bu, Google'ın embed'i
 * render ederken adresi kendi geocoder'ıyla YENİDEN ARAMASINA bağımlıydı.
 * "Elit Residence" Türkiye'de yaygın/jenerik bir bina adıdır ve "No:3/14"
 * gibi standart olmayan Türkçe kapı numarası notasyonu metin tabanlı
 * geocoder'ları şaşırtabilir — bağımsız bir kontrolde (OpenStreetMap
 * Nominatim) aynı tam metin HİÇ SONUÇ döndürmedi; "Türkiye" ve "No:3/14"
 * olmadan sorgulanınca doğru binaya (~2m fark) düştü. Google'ın kendi
 * geocoder'ı muhtemelen bir sonuç ÜRETTİ ama yanlış/belirsiz bir
 * eşleşmeye düşmüş olması bu yüzden olasıdır. Kullanıcının verdiği kesin
 * koordinat ve place ID'yle bu belirsizlik ortadan kaldırıldı: embed
 * artık serbest metin değil, SABİT ENLEM/BOYLAM ile pinleniyor.
 */
const MAP_COORDINATES = "41.0618319,28.9918755";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_COORDINATES}&output=embed`;
/** Kullanıcının verdiği tam Google Maps place URL'i (place ID dahil). */
const MAP_LINK_HREF =
  "https://www.google.com/maps/place/19+May%C4%B1s,+Elit+Residence,+34360+%C5%9Ei%C5%9Fli%2F%C4%B0stanbul/@41.0618151,28.9914332,19.56z/data=!4m6!3m5!1s0x14cab703bbc94f57:0x8ae44f3d5f1628ab!8m2!3d41.0618319!4d28.9918755!16s%2Fg%2F11bc8c6wb8";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("metaDescription"),
    hrefForLocale: () => "/iletisim",
  });
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
    Değeri boş olan satır listeye hiç girmez — faks ve KEP müşteriden
    gelmediği için şu an yalnızca adres, e-posta, telefon ve LinkedIn
    çıkar. Veri geldiğinde yalnızca JSON güncellenir, bu dosya değişmez.
  */
  const infoRows = getOfficeContactRows(locale);

  return (
    <>
      <PageHeader title={t("title")} lead={pick(office.lead, locale)} />

      <Container>
        {/* Form kaldırılınca tek bölüm kaldı. Sol hizalı max-w-prose —
            /biz-kimiz ve /kariyer ile aynı düzen, PageHeader ile hizalı
            (mx-auto ile ortalamak diğer sayfalardan sapma yaratıyordu). */}
        <section aria-labelledby="contact-info" className="max-w-prose pb-16 md:pb-24">
          <h2 id="contact-info" className="text-h3 text-primary md:text-h2">
            {t("infoHeading")}
          </h2>

          <ContactDetailsList rows={infoRows} getLabel={tFooter} variant="onLight" />
        </section>

        <section aria-labelledby="contact-map" className="pb-16 md:pb-24">
          <h2 id="contact-map" className="text-h3 text-primary md:text-h2">
            {t("mapHeading")}
          </h2>

          {/* API anahtarı gerektirmeyen genel arama embed'i — bkz. dosya
              başındaki MAP_EMBED_SRC yorumu. */}
          <div className="mt-8 aspect-[16/9] w-full md:aspect-auto md:h-[280px] md:max-w-2xl">
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
