import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getOfficeContactRows } from "@/lib/content";

import ContactDetailsList from "./ContactDetailsList";
import Container from "./Container";

/**
 * Navy zeminli blok. Ayrı vurgu rengi olmadığı için sayfanın vurgusu
 * buradan gelir (docs/design-system.md §1.1).
 *
 * İletişim satırları `content/buro.json`'dan gelir ve /iletisim sayfasıyla
 * ORTAKTIR — aynı liste iki yerde ayrı ayrı yazılmaz. Değeri boş olan
 * satır hiç render edilmez; müşteriden faks ve KEP gelmediği için şu an
 * yalnızca adres, e-posta, telefon ve LinkedIn görünür.
 *
 * Üst margin (`mt-12 md:mt-16`) ana sayfadaki hero-altı bölümün üst
 * padding'iyle (`pt-12 md:pt-16`, bkz. `src/app/[locale]/page.tsx`) BİREBİR
 * aynı değerdir — ana sayfada hero-kartlar arası boşlukla kartlar-footer
 * arası boşluk kullanıcı talimatıyla kasıtlı olarak eşitlendi. Footer ortak
 * olduğu için bu değer diğer sayfaları da etkiler.
 *
 * İkinci sütun (Gizlilik + Yasal Uyarı) kullanıcı talimatıyla eklendi;
 * link metinleri ilgili sayfanın `<h1>`'iyle BİREBİR aynıdır
 * (`PrivacyPolicy.title` / `LegalNotice.title`). Docx kaynağındaki
 * başlık TAMAMI BÜYÜK HARFLE yazılıydı; site genelindeki normal başlık
 * kuralıyla tutarlı olması için 05.09.2026'da normal yazıma çevrildi —
 * bkz. `src/app/[locale]/gizlilik-politikasi/page.tsx`.
 *
 * ⚠️ `justify-between` KULLANILMAZ: iki öğeli bir flex'te tüm boş alanı
 * aradaki tek boşluğa yığar, ikinci sütunu satırın sağ ucuna yapıştırır
 * VE o sütunun kendi içerik genişliğine (dolayısıyla dile) bağlı olarak
 * sol kenarını kaydırır — TR "Yasal" başlığı bu yüzden EN "Legal"dan
 * farklı noktadan başlıyordu (05.09.2026'da kullanıcı fark etti).
 * Sabit `gap-*` ile sola yaslı (`justify-start`, varsayılan) düzende
 * ikinci sütunun sol kenarı yalnızca BİRİNCİ sütunun genişliğine bağlı
 * kalır; o sütundaki en geniş satır (adres) iki dilde de aynı metin
 * olduğu için genişliği dilden bağımsızdır — bu yüzden "Yasal"/"Legal"
 * her iki dilde de aynı x konumunda başlar. Değer beş adımda büyüdü:
 * `gap-16` (64px) → `gap-24` (96px) → `gap-36` (144px) → `gap-42`
 * (168px) → `gap-72` (288px) → `gap-102` (408px) — Tailwind v4'te sabit
 * bir isimli basamak listesi yoktur, `--spacing` değişkeninin (0.25rem)
 * herhangi bir tam sayı katı geçerli bir utility'dir. Son iki adımda
 * kullanıcı önce bir önceki +6'lık farkın 5 katını (+30), sonra o +30'u
 * bir kez daha (+30) istedi. Her seferinde sütun Contact'a hâlâ fazla
 * yakın kalıyordu (05.09.2026, md: ve üzeri).
 */
export default async function Footer() {
  const t = await getTranslations("Footer");
  const tBrand = await getTranslations("Brand");
  const tPrivacy = await getTranslations("PrivacyPolicy");
  const tLegal = await getTranslations("LegalNotice");

  // Layout `setRequestLocale` çağırdığı için bu okuma SSG'yi bozmaz.
  const locale = await getLocale();
  const contactRows = getOfficeContactRows(locale);

  return (
    <footer className="mt-12 bg-primary text-grey-200 md:mt-16">
      <Container>
        {/* Pages (Careers) bölümü kullanıcı talimatıyla kaldırılmıştı;
            Gizlilik + Yasal Uyarı linkleri için ikinci sütun geri geldi. */}
        <div className="py-16 md:flex md:gap-102">
          <section className="max-w-prose">
            <h2 className="text-h4 text-on-primary">{t("contactHeading")}</h2>
            <ContactDetailsList rows={contactRows} getLabel={t} variant="onPrimary" />
          </section>

          <section className="mt-12 md:mt-0">
            <h2 className="text-h4 text-on-primary">{t("legalHeading")}</h2>
            <ul className="mt-6 space-y-3 text-body-sm">
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="inline-flex min-h-11 items-center text-grey-200 underline underline-offset-4 transition-text hover:text-on-primary"
                >
                  {tPrivacy("title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/yasal-uyari"
                  className="inline-flex min-h-11 items-center text-grey-200 underline underline-offset-4 transition-text hover:text-on-primary"
                >
                  {tLegal("title")}
                </Link>
              </li>
            </ul>
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
