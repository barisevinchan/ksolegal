import { Link } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/navigation";

type Props = {
  href: StaticPathname;
  label: string;
  /** Zorunludur — açıklamasız kart bilerek desteklenmez. */
  description: string;
};

/**
 * Ana sayfadaki üç yönlendirme kartı. `h-full` grid hücresini doldurur;
 * `<ul>` zaten `items-stretch` (grid varsayılanı) olduğu için üç kart
 * açıklama uzunluğu farklı olsa da aynı yükseklikte kalır.
 *
 * Hover'da yalnızca başlığın altı çizilir — kart büyümez, gölge almaz,
 * 3D dönmez (CLAUDE.md "Görsel olarak YASAK").
 *
 * Kartın altındaki ikinci çizgi (`md:border-b`) yalnızca masaüstünde
 * görünür — üstteki `border-t` ile aynı stildir, açıklama metninin
 * ALTINDA durur (kartı üstten ve alttan simetrik kapatır). Mobilde tek
 * kolona düştüğünde her kartın `border-t`'si zaten bir önceki karttan
 * ayıran çizgi görevi görüyor; en alttaki kapanış çizgisi (son kartın
 * altı) `HomePage`'de ayrı, mobile-only bir `<li>` ile eklenir.
 */
export default function HomeCard({ href, label, description }: Props) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border-t border-grey-500 pt-6 md:border-b md:pb-6"
    >
      <h3 className="text-h3 text-primary underline-offset-4 group-hover:underline">
        {label}
      </h3>
      <p className="mt-2 text-body-sm text-grey-600">{description}</p>
    </Link>
  );
}
