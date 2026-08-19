import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Tip güvenli navigasyon. Link'e verilen href, routing.ts'teki pathnames
 * anahtarlarından biri olmak zorundadır; slug çevirisi otomatik yapılır.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/**
 * Dinamik segment içermeyen rotalar. Navigasyon bileşenleri yalnızca
 * bunlara link verir; [slug] içerenler params gerektirir.
 */
export type StaticPathname = Exclude<
  keyof typeof routing.pathnames,
  `${string}[${string}`
>;
