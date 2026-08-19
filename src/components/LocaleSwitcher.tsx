"use client";

import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { useParams } from "next/navigation";

import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * İki dil olduğu için dropdown yerine iki link.
 *
 * next-intl'in `Link`'i, `locale` prop'u verildiğinde öneki HER ZAMAN
 * ekler (kaynakta `forcePrefix: locale != null`). Bu, `as-needed` modda
 * Türkçe için `/tr` üretir ve middleware'in `/tr → /` yönlendirmesine
 * yol açar. Onun yerine `getPathname`'i doğrudan çağırıyoruz —
 * `forcePrefix` verilmediğinde `as-needed` kuralı uygulanır:
 * varsayılan dil öneksiz, diğerleri önekli.
 *
 * Cookie yazma: `localeDetection: false` olduğu için middleware artık
 * cookie'yi yönlendirme kararında OKUMUYOR — `/` her koşulda Türkçe.
 * Ancak next-intl cookie'yi yazmayı sürdürüyor ve bunu yalnızca
 * doküman istekleri için yapıyor; yumuşak navigasyonlarda cookie'yi
 * client'ın güncellemesini bekliyor (bkz. middleware/syncCookie.js).
 * Cookie'yi burada yazmazsak gerçek dil ile cookie değeri birbirinden
 * kopar — ileride `localeDetection` tekrar açılırsa bu bayat değer
 * yanlış dil sunulmasına yol açar.
 */
export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const labels: Record<Locale, { full: string; short: string }> = {
    tr: { full: t("tr"), short: t("trShort") },
    en: { full: t("en"), short: t("enShort") },
  };

  function selectLocale(locale: Locale) {
    // next-intl'in kendi cookie varsayılanlarıyla aynı: NEXT_LOCALE, lax, /
    document.cookie = `NEXT_LOCALE=${locale}; path=/; sameSite=lax`;
  }

  // prefetch açık bırakıldı: `localeDetection: false` ile `/` ve `/en`
  // cookie'den bağımsız olarak deterministik yanıt döner, bu yüzden
  // önden çekilen RSC yükünün yanlış dili önbelleğe alma riski yok.

  return (
    <nav aria-label={t("ariaLabel")}>
      <ul className="flex items-center">
        {routing.locales.map((locale, index) => {
          const isActive = locale === activeLocale;
          const href = getPathname({
            // @ts-expect-error -- pathname ve params her zaman birbiriyle
            // uyumludur (ikisi de mevcut rotadan gelir), ancak TypeScript
            // bu ilişkiyi kuramaz.
            href: { pathname, params },
            locale,
          });

          return (
            <li key={locale} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="text-grey-400">
                  /
                </span>
              )}
              <NextLink
                href={href}
                hrefLang={locale}
                onClick={() => selectLocale(locale)}
                onAuxClick={() => selectLocale(locale)}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-11 min-w-11 items-center justify-center text-body-sm transition-text ${
                  isActive
                    ? "font-medium text-on-primary"
                    : "text-grey-200 hover:text-on-primary"
                }`}
              >
                <span className="sr-only">{labels[locale].full}</span>
                <span aria-hidden="true">{labels[locale].short}</span>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
