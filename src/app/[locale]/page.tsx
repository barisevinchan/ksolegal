import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

import Container from "@/components/Container";
import HomeCard from "@/components/HomeCard";
import type { StaticPathname } from "@/i18n/navigation";

/**
 * Ana sayfa: tek hero + üç yönlendirme. Sayaç, rozet, referans, CTA
 * butonu yoktur (CLAUDE.md yasak listesi + docs/design-system.md §5.1).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const tNav = await getTranslations("Nav");

  const links: { href: StaticPathname; label: string; description: string }[] = [
    { href: "/biz-kimiz", label: tNav("about"), description: t("cards.about") },
    { href: "/ekibimiz", label: tNav("team"), description: t("cards.team") },
    {
      href: "/faaliyet-alanlari",
      label: tNav("practiceAreas"),
      description: t("cards.practiceAreas"),
    },
  ];

  return (
    <>
      {/*
        Hero üç katmandır: fotoğraf → navy overlay → metin.
        Overlay opaklığı `--hero-overlay-opacity` (0.70) tokenından gelir
        ve 0.66'nın altına indirilemez — hesap en kötü durum (bembeyaz
        fotoğraf pikseli) varsayımıyla yapılmıştır, docs/design-system.md §2.

        Bu fotoğraf için ölçüm yapıldı: 2560×1440'lık dosyanın 3.686.400
        pikselinin tamamında beyaz metin kontrastı AA'yı geçiyor. En kötü
        piksel saf beyaz bir şehir ışığı (kompozit rgb(98,106,124) → 5.43:1),
        görsel ortalaması 14.54:1. Fotoğraf değişirse ölçüm tekrarlanmalı.

        Overlay `<Image>`'in ÜSTÜNDE ayrı bir katman — filter/backdrop-filter
        kullanılmaz.
      */}
      {/*
        Yükseklik içeriğe bırakılmaz: başlık tek satıra düştüğünde hero
        ince bir başlık bandına dönüşüyordu. Taban `--hero-min-height`
        tokenlarından gelir (globals.css), component'te ham px yoktur.

        `items-end`: başlık fotoğrafın ALT kenarına hizalanır. Üst kenarda
        `hero-top-fade` maskesi durduğu için metni oraya koymak iki katmanı
        üst üste yığardı; alt hizalama fotoğrafı da açıkta bırakır.
      */}
      <section className="hero-frame md:hero-frame-lg relative isolate flex items-end">
        <Image
          src="/hero/istanbul.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="hero-overlay absolute inset-0" />

        {/*
          Üst kenar maskesi: navy header ile fotoğraf arasındaki keskin
          geçişi kaldırır. Yüksekliği hero'nun %25'i (`h-1/4`) — yüzde
          olduğu için ham px yok ve hero boyu değişse de oran korunur.

          `hero-overlay`'in ÜSTÜNDE, metnin ALTINDA. Navy üzerine navy
          eklediği için kontrastı yalnızca artırır; alt sınır hâlâ
          overlay'in tek başına verdiği 5.43:1'dir.

          CLAUDE.md gradient yasağının dar istisnası — bkz. globals.css
          `hero-top-fade`.
        */}
        <div
          aria-hidden="true"
          className="hero-top-fade absolute inset-x-0 top-0 h-1/4"
        />

        <Container className="relative">
          <div className="max-w-prose py-16 md:py-24">
            {/* Overlay üstünde yalnızca #FFFFFF ve #F7F8FA kullanılır;
                grey-200 ve altı yasak (docs/design-system.md §2.3).

                `text-hero` clamp() ile sürekli ölçeklenir (globals.css)
                — breakpoint sıçraması yok. Marka adı `<brand>` etiketiyle
                işaretlenir ve `whitespace-nowrap` alır: cümlenin geri
                kalanı sarabilir, marka adı asla bölünmez (320px'te bile
                — doğrulandı). Büyük harf/boşluksuz biçim `KOÇAK|SAYIM|ÖRNEK`
                kullanıcı kararıyla site genelindeki `Brand.name`
                biçiminden bilerek sapar; bkz. CLAUDE.md "Marka adı yazımı". */}
            <h1 className="text-hero text-white">
              {t.rich("heroTitle", {
                brand: (chunks) => (
                  <span className="whitespace-nowrap">{chunks}</span>
                ),
              })}
            </h1>
            <p className="mt-4 text-body-lg text-surface">
              {t("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <section aria-labelledby="home-links" className="py-16 md:py-24">
          <h2 id="home-links" className="sr-only">
            {t("linksHeading")}
          </h2>

          <ul className="grid gap-8 md:grid-cols-3">
            {links.map((link) => (
              <li key={link.href}>
                <HomeCard
                  href={link.href}
                  label={link.label}
                  description={link.description}
                />
              </li>
            ))}
            {/* Mobilde alt alta dizilen kartların en altını kapatan çizgi —
                kartların kendi `border-t`'siyle aynı stil. Masaüstünde 3
                kolonlu grid'de fazladan hücre açmaması için `md:hidden`. */}
            <li aria-hidden="true" className="border-t border-grey-500 md:hidden" />
          </ul>
        </section>
      </Container>
    </>
  );
}
