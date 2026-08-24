"use client";

import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { useParams } from "next/navigation";

type Params = ReturnType<typeof useParams>;

import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import type { L10n } from "@/lib/content";

/**
 * İki dil olduğu için dropdown yerine iki link.
 *
 * next-intl'in `Link`'i, `locale` prop'u verildiğinde öneki HER ZAMAN
 * ekler (kaynakta `forcePrefix: locale != null`). Bu, `as-needed` modda
 * İngilizce için `/en` üretir ve middleware'in `/en → /` yönlendirmesine
 * yol açar. Onun yerine `getPathname`'i doğrudan çağırıyoruz —
 * `forcePrefix` verilmediğinde `as-needed` kuralı uygulanır:
 * varsayılan dil öneksiz, diğerleri önekli.
 *
 * Slug çevirisi: faaliyet alanı slug'ları dile göre değişir
 * (`is-hukuku` ↔ `employment-law`). `getPathname` mevcut `params`'ı
 * olduğu gibi taşıdığı için, çeviri yapılmazsa EN'e geçişte
 * `/en/practice-areas/is-hukuku` üretilir ve 404 olur. `slugMap` içinde
 * bulunmayan slug'lar — avukat adları — olduğu gibi geçer, çünkü kişi
 * adları çevrilmez.
 *
 * Harita `Header`'da (server) hesaplanıp prop olarak iner; böylece
 * içerik dosyası client bundle'a girmez.
 *
 * Cookie yazma: `localeDetection: false` olduğu için middleware artık
 * cookie'yi yönlendirme kararında OKUMUYOR — `/` her koşulda İngilizce.
 * Ancak next-intl cookie'yi yazmayı sürdürüyor ve bunu yalnızca
 * doküman istekleri için yapıyor; yumuşak navigasyonlarda cookie'yi
 * client'ın güncellemesini bekliyor (bkz. middleware/syncCookie.js).
 * Cookie'yi burada yazmazsak gerçek dil ile cookie değeri birbirinden
 * kopar — ileride `localeDetection` tekrar açılırsa bu bayat değer
 * yanlış dil sunulmasına yol açar.
 */
type Props = {
  /** Her slug (iki dilde de) kendi `{ tr, en }` çiftine bakar. */
  slugMap: Record<string, L10n>;
};

/**
 * `usePathname()` dinamik rotalarda HER ZAMAN şablon döndürmez.
 *
 * next-intl, tarayıcı yolundan dil önekini attıktan sonra kalanı AKTİF
 * DİLİN şablonlarıyla eşleştirir. Ancak middleware `/en/practice-areas/x`
 * isteğini `/en/faaliyet-alanlari/x` iç yoluna yeniden yazdığı için,
 * Next'in `usePathname()`'i İngilizce sayfalarda iç (Türkçe) yolu verir.
 * Bu yol İngilizce şablon `/practice-areas/[slug]` ile eşleşmez, eşleşme
 * bulunamayınca girdi olduğu gibi döner:
 *
 *   beklenen : /faaliyet-alanlari/[slug]
 *   gelen    : /faaliyet-alanlari/employment-law
 *
 * Şablon olmayan bir yol `pathnames` tablosunda anahtar değildir, bu
 * yüzden `getPathname` çeviri yapamaz ve `/en/faaliyet-alanlari/...` gibi
 * var olmayan bir URL üretir. Türkçe sayfalarda sorun görünmez, çünkü iç
 * yol zaten Türkçe şablonla eşleşir.
 *
 * Çözüm: parametre DEĞERLERİNİ yolda bulup `[anahtar]` ile geri
 * koyuyoruz. Yol zaten şablonsa (Türkçe sayfalar) hiçbir şey değişmez.
 */
function toTemplate(pathname: string, params: Params): string {
  let template = pathname;

  for (const [key, value] of Object.entries(params)) {
    if (key === "locale" || typeof value !== "string") continue;
    template = template.replace(`/${value}`, `/[${key}]`);
  }

  return template;
}

export default function LocaleSwitcher({ slugMap }: Props) {
  const t = useTranslations("LocaleSwitcher");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const template = toTemplate(pathname, params);

  const labels: Record<Locale, { full: string; short: string }> = {
    tr: { full: t("tr"), short: t("trShort") },
    en: { full: t("en"), short: t("enShort") },
  };

  function selectLocale(locale: Locale) {
    // next-intl'in kendi cookie varsayılanlarıyla aynı: NEXT_LOCALE, lax, /
    document.cookie = `NEXT_LOCALE=${locale}; path=/; sameSite=lax`;
  }

  // prefetch açık bırakıldı: `localeDetection: false` ile `/` ve `/tr`
  // cookie'den bağımsız olarak deterministik yanıt döner, bu yüzden
  // önden çekilen RSC yükünün yanlış dili önbelleğe alma riski yok.

  return (
    <nav aria-label={t("ariaLabel")}>
      <ul className="flex items-center">
        {routing.locales.map((locale, index) => {
          const isActive = locale === activeLocale;
          const currentSlug =
            typeof params.slug === "string" ? params.slug : undefined;
          const translated = currentSlug ? slugMap[currentSlug] : undefined;
          const localeParams = translated
            ? { ...params, slug: translated[locale] }
            : params;

          const href = getPathname({
            // @ts-expect-error -- pathname ve params her zaman birbiriyle
            // uyumludur (ikisi de mevcut rotadan gelir), ancak TypeScript
            // bu ilişkiyi kuramaz.
            href: { pathname: template, params: localeParams },
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
