import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import Container from "./Container";

/**
 * Navy zeminli blok. Ayrı vurgu rengi olmadığı için sayfanın vurgusu
 * buradan gelir (docs/design-system.md §1.1).
 *
 * İletişim değerleri PLACEHOLDER'dır — tasarım onaylanana kadar gerçek
 * veri girilmez (CLAUDE.md Çalışma Kuralı 1).
 */
export default async function Footer() {
  const t = await getTranslations("Footer");
  const tBrand = await getTranslations("Brand");
  const placeholder = t("placeholder");

  const contactRows = [
    { key: "address", label: t("address") },
    { key: "phone", label: t("phone") },
    { key: "fax", label: t("fax") },
    { key: "email", label: t("email") },
    { key: "kep", label: t("kep") },
  ];

  return (
    <footer className="mt-24 bg-primary text-grey-200">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2">
          <section>
            <h2 className="text-h4 text-on-primary">{t("contactHeading")}</h2>
            <dl className="mt-6 space-y-3 text-body-sm">
              {contactRows.map((row) => (
                <div key={row.key} className="flex gap-3">
                  <dt className="min-w-24 text-grey-300">{row.label}</dt>
                  <dd className="text-grey-200">{placeholder}</dd>
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
