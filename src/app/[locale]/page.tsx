import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

import Container from "@/components/Container";
import { Link } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/navigation";

/**
 * Ana sayfa: tek hero + üç yönlendirme. Sayaç, rozet, referans, CTA
 * butonu yoktur (CLAUDE.md yasak listesi + docs/design-system.md §5.1).
 *
 * Metinler yer tutucudur; gerçek içerik tasarım onayından sonra girilir.
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

  const links: { href: StaticPathname; label: string }[] = [
    { href: "/hakkimizda", label: tNav("about") },
    { href: "/ekip", label: tNav("team") },
    { href: "/faaliyet-alanlari", label: tNav("practiceAreas") },
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

                Başlığın altında alt metin YOKTUR — müşteri göndermedi ve
                yer tutucu bırakılmadı (CLAUDE.md Çalışma Kuralı 1). */}
            <h1 className="text-h2 text-white md:text-h1">{t("heroTitle")}</h1>
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
                {/* Kart hover'da büyümez, gölge almaz, 3D dönmez —
                    tek hareket başlığın altını çizmesidir.

                    Başlık altında açıklama cümlesi YOKTUR: müşteri bu üç
                    metni göndermedi. Ekip ve faaliyet alanları liste
                    sayfalarındaki giriş paragrafları da aynı gerekçeyle
                    kaldırılmıştı. */}
                <Link
                  href={link.href}
                  className="group block border-t border-grey-500 pt-6"
                >
                  <h3 className="text-h3 text-primary underline-offset-4 group-hover:underline">
                    {link.label}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
