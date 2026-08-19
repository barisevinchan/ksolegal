import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderBox from "@/components/PlaceholderBox";
import { Link } from "@/i18n/navigation";

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
 * ⚠️ FORM ÇALIŞMAZ. Bu bir görsel iskelettir: `action` yok, handler yok,
 * gönder butonu `disabled`. Backend, spam koruması (honeypot + rate limit)
 * ve Turnstile sonraki adımda eklenir.
 *
 * Alanlar bilerek asgaridir — ad, e-posta, telefon, kısa konu. Dosya
 * yükleme ve olay anlatımı alanı YOKTUR: vekâlet öncesi sır kapsamı
 * belirsizdir (CLAUDE.md KVKK bölümü).
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
  const tCommon = await getTranslations("Common");

  const infoRows = [
    { key: "address", label: tFooter("address") },
    { key: "phone", label: tFooter("phone") },
    { key: "fax", label: tFooter("fax") },
    { key: "email", label: tFooter("email") },
    { key: "kep", label: tFooter("kep") },
  ];

  const fields = [
    { id: "name", type: "text", autoComplete: "name", optional: false },
    { id: "email", type: "email", autoComplete: "email", optional: false },
    { id: "phone", type: "tel", autoComplete: "tel", optional: true },
    { id: "subject", type: "text", autoComplete: "off", optional: false },
  ] as const;

  // `placeholder` özniteliği kullanılmaz: yazmaya başlayınca kaybolur ve
  // yeterli kontrastı olan bir placeholder tonu paletimizde yok
  // (grey-500 gövde metni değildir, docs/design-system.md §1.4).
  const inputClass =
    "mt-2 block min-h-11 w-full border border-grey-500 bg-white px-3 py-2 text-body text-grey-800";

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-2 md:items-start md:gap-16 md:pb-24">
          <section aria-labelledby="contact-info">
            <h2 id="contact-info" className="text-h3 text-primary md:text-h2">
              {t("infoHeading")}
            </h2>

            <dl className="mt-8 space-y-4">
              {infoRows.map((row) => (
                <div key={row.key} className="sm:flex sm:gap-6">
                  <dt className="text-body-sm text-grey-600 sm:w-32 sm:shrink-0">
                    {row.label}
                  </dt>
                  <dd className="text-body text-grey-800">
                    {tCommon("placeholderValue")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="contact-form">
            <h2 id="contact-form" className="text-h3 text-primary md:text-h2">
              {t("formHeading")}
            </h2>

            {/*
              `action` verilmez ve gönder butonu `disabled`'dır. Bu ikisi
              birlikte formu gerçekten ölü hâle getirir: HTML implicit
              submission, varsayılan submit butonuna tıklama olayı ateşler;
              buton disabled olduğu için hiçbir şey olmaz. Yani bir alana
              yazıp Enter'a basmak da formu göndermez — aksi hâlde GET ile
              girilen ad/e-posta URL sorgusuna düşerdi. Tarayıcıda test
              edilerek doğrulandı.
            */}
            <form noValidate className="mt-8">
              <div className="space-y-6">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="text-body-sm text-grey-800"
                    >
                      {t(`form.${field.id}`)}
                      {field.optional ? (
                        <span className="text-grey-600">
                          {" "}
                          {t("form.optional")}
                        </span>
                      ) : null}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required={!field.optional}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>

              {/*
                KVKK açık rıza kutusu: ÖN İŞARETLİ DEĞİL ve `required`.
                24px kutu WCAG 2.5.8'i karşılar; satırın tamamı min-h-11
                olduğu için etikete tıklama alanı 44px yüksekliğindedir.
                Link etiketin İÇİNE konmaz — tıklandığında kutuyu
                işaretlerdi; ayrı satırda verilir.
              */}
              <div className="mt-8 flex min-h-11 items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1 h-6 w-6 shrink-0 accent-primary"
                />
                <label
                  htmlFor="consent"
                  className="max-w-prose text-body-sm text-grey-800"
                >
                  {t("form.consentLabel")}
                </label>
              </div>

              <p className="mt-3 text-body-sm">
                <Link
                  href="/kvkk"
                  className="text-grey-600 underline underline-offset-4 transition-text hover:text-primary"
                >
                  {t("form.consentLink")}
                </Link>
              </p>

              <button
                type="submit"
                disabled
                aria-describedby="form-notice"
                className="mt-8 inline-flex min-h-11 items-center justify-center bg-primary px-6 text-body text-on-primary disabled:bg-grey-500"
              >
                {t("form.submit")}
              </button>

              <p id="form-notice" className="mt-3 text-body-sm text-grey-600">
                {t("form.disabledNotice")}
              </p>
            </form>
          </section>
        </div>

        <section aria-labelledby="contact-map" className="pb-16 md:pb-24">
          <h2 id="contact-map" className="text-h3 text-primary md:text-h2">
            {t("mapHeading")}
          </h2>
          {/* Harita gömme sonraki adımda; şimdilik yer tutucu kutu. */}
          <PlaceholderBox aspect="wide" className="mt-8" />
          <p className="mt-3 text-body-sm text-grey-600">{t("mapNotice")}</p>
        </section>
      </Container>
    </>
  );
}
