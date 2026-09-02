import { getLocale, getTranslations } from "next-intl/server";

import { getOfficeContactRows } from "@/lib/content";

import ContactDetailsList from "./ContactDetailsList";
import Container from "./Container";

/**
 * Navy zeminli blok. Ayrı vurgu rengi olmadığı için sayfanın vurgusu
 * buradan gelir (docs/design-system.md §1.1).
 *
 * İletişim satırları `content/buro.json`'dan gelir ve /iletisim sayfasıyla
 * ORTAKTIR — aynı liste iki yerde ayrı ayrı yazılmaz. Değeri boş olan
 * satır hiç render edilmez; müşteriden telefon, faks ve KEP gelmediği için
 * şu an yalnızca adres ve e-posta görünür.
 */
export default async function Footer() {
  const t = await getTranslations("Footer");
  const tBrand = await getTranslations("Brand");

  // Layout `setRequestLocale` çağırdığı için bu okuma SSG'yi bozmaz.
  const locale = await getLocale();
  const contactRows = getOfficeContactRows(locale);

  return (
    <footer className="mt-24 bg-primary text-grey-200">
      <Container>
        {/* Legal (KVKK/çerez) ve Pages (Careers) bölümleri kullanıcı
            talimatıyla kaldırıldı; tek kalan bölüm için grid'e gerek yok. */}
        <div className="py-16">
          <section className="max-w-prose">
            <h2 className="text-h4 text-on-primary">{t("contactHeading")}</h2>
            <ContactDetailsList rows={contactRows} getLabel={t} variant="onPrimary" />
          </section>
        </div>

        <div className="border-t border-grey-500 py-8 text-body-sm text-grey-300">
          <p>
            © {new Date().getFullYear()} {tBrand("name")}. {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
