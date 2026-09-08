import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { office, pick } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/**
 * Organization + LocalBusiness yapılandırılmış verisi. TBB Reklam Yasağı
 * Yönetmeliği kısıtı burada da geçerlidir: puan, yorum, "en iyi/lider/uzman"
 * ifadesi veya pazarlama `description`'ı EKLENMEZ — yalnızca nesnel tanıtıcı
 * bilgi (ad, adres, telefon, e-posta, url, logo, sameAs). Faks/KEP boş
 * olduğu için şemaya alınmaz (CLAUDE.md boş alan kuralı).
 */
export default async function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: t("title"),
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: office.linkedin ? [office.linkedin] : undefined,
    telephone: office.phone || undefined,
    email: office.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: pick(office.address, locale),
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
  };

  return (
    <script
      type="application/ld+json"
      // `</script>` enjeksiyonuna karşı kaçış — veri sabit içerik kaynağından
      // gelir ama script bağlamına yazılan her JSON için bu kaçış zorunludur.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
