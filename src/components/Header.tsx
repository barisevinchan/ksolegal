import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { buildSlugMap } from "@/lib/content";

import Container from "./Container";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileNav from "./MobileNav";
import NavLink, { type NavItem } from "./NavLink";

/**
 * Yatay üst navigasyon. Nav'da CTA butonu YOKTUR — TBB Reklam Yasağı
 * Yönetmeliği (CLAUDE.md "Bu içerikleri ASLA üretme" listesi).
 */
export default async function Header() {
  const t = await getTranslations("Nav");
  const tBrand = await getTranslations("Brand");

  const items: NavItem[] = [
    { href: "/biz-kimiz", label: t("about") },
    { href: "/ekibimiz", label: t("team") },
    { href: "/faaliyet-alanlari", label: t("practiceAreas") },
    { href: "/iletisim", label: t("contact") },
  ];

  // Alt kenarlık YOK: navy header ile açık sayfa zemini (`surface`)
  // arasındaki geçiş 13.42:1 — sınır zaten kendiliğinden okunuyor,
  // üstüne çizgi eklemek gereksiz gürültü olurdu.
  //
  // `focus-ring-inverse` header'ın tamamına bir kez uygulanıyor; utility
  // hem elemanın kendisini hem alt elemanlarını kapsıyor, böylece
  // içerideki tüm link ve butonlar beyaz focus ring alıyor.
  return (
    <header className="focus-ring-inverse relative bg-primary">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          {/*
            Logo `kaynak/Kurumsal Logo/..._Asıl.svg`'den türetildi: gömülü
            navy arka plan <rect>'i kaldırıldı, yalnızca harf path'leri ve
            iki ayıraç çizgisi kaldı; viewBox gerçek çizim sınırlarına
            daraltıldı (kaynakta içerik kutunun yalnızca %23'ünü kaplıyor,
            daraltılmazsa harfler çok küçük render olur).

            Header zemini navy (`bg-primary`) olduğu için açık dolgulu
            `logo-inverse.svg` kullanılıyor — 13.42:1. Zemin açık renge
            çevrilirse `logo.svg` ile değiştirilmelidir.
          */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-inverse.svg"
              alt={tBrand("name")}
              width={1936}
              height={168}
              priority
              // shape-rendering bir SVG sunum özelliğidir. <img> ile yüklenen
              // SVG ayrı bir belge olarak render edildiği için dış belgenin
              // CSS'i içine geçmez — bu satır tek başına etkisizdir. Asıl
              // etki public/logo*.svg içine yazılan aynı isimli öznitelikten
              // gelir; bu ikisi birlikte tutuluyor.
              style={{ shapeRendering: "geometricPrecision" }}
              className="h-5 w-auto object-contain md:h-8"
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label={t("ariaLabel")} className="hidden md:block">
              <ul className="flex items-center gap-6">
                {items.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href} label={item.label} />
                  </li>
                ))}
              </ul>
            </nav>

            <LocaleSwitcher slugMap={buildSlugMap()} />

            <MobileNav
              items={items}
              navLabel={t("ariaLabel")}
              openLabel={t("openMenu")}
              closeLabel={t("closeMenu")}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
