import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getOfficeContactRows } from "@/lib/content";

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
  const tNav = await getTranslations("Nav");

  // Layout `setRequestLocale` çağırdığı için bu okuma SSG'yi bozmaz.
  const locale = await getLocale();
  const contactRows = getOfficeContactRows(locale);

  return (
    <footer className="mt-24 bg-primary text-grey-200">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3">
          <section>
            <h2 className="text-h4 text-on-primary">{t("contactHeading")}</h2>
            <dl className="mt-6 space-y-3 text-body-sm">
              {contactRows.map((row) => (
                <div key={row.key} className="flex gap-3">
                  <dt className="min-w-24 text-grey-300">{t(row.key)}</dt>
                  <dd className="text-grey-200">
                    {row.href ? (
                      /* `min-h-11` dokunma hedefi içindir
                         (docs/design-system.md §6.2). */
                      <a
                        href={row.href}
                        className="inline-flex min-h-11 items-center underline underline-offset-4 transition-text hover:text-on-primary"
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

          <section>
            <h2 className="text-h4 text-on-primary">{t("legalHeading")}</h2>
            <ul className="mt-6 space-y-2 text-body-sm">
              <li>
                <Link
                  href="/kvkk"
                  className="focus-ring-inverse flex min-h-11 items-center text-grey-200 transition-text hover:text-on-primary"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cerez-politikasi"
                  className="focus-ring-inverse flex min-h-11 items-center text-grey-200 transition-text hover:text-on-primary"
                >
                  {t("cookiePolicy")}
                </Link>
              </li>
            </ul>
          </section>

          {/* Yasal listesindeki <li><Link> markup'ıyla birebir aynı —
              yeni bileşen icat edilmez. */}
          <section>
            <h2 className="text-h4 text-on-primary">{t("pagesHeading")}</h2>
            <ul className="mt-6 space-y-2 text-body-sm">
              <li>
                <Link
                  href="/kariyer"
                  className="focus-ring-inverse flex min-h-11 items-center text-grey-200 transition-text hover:text-on-primary"
                >
                  {tNav("careers")}
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
