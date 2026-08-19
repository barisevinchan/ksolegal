"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/navigation";

export type NavItem = {
  href: StaticPathname;
  label: string;
};

type Props = NavItem & {
  className?: string;
  onNavigate?: () => void;
};

/**
 * Aktif sayfa tespiti için usePathname gerektiği kadar client. Çeviri
 * metni prop olarak iner — sözlük client bundle'a girmez.
 *
 * Vurgu rengi olmadığı için aktif durum ton farkı + font ağırlığı ile
 * kurulur (docs/design-system.md §1.1).
 */
export default function NavLink({
  href,
  label,
  className,
  onNavigate,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={`flex min-h-11 items-center text-body-sm transition-text ${
        isActive
          ? "font-medium text-on-primary"
          : "text-grey-200 hover:text-on-primary"
      }${className ? ` ${className}` : ""}`}
    >
      {label}
    </Link>
  );
}
