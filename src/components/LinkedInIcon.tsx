/**
 * LinkedIn "in" işareti. Yeni bir ikon paketi kurulmadı — statik, tek
 * kullanımlık marka işareti olduğu için inline SVG yeterli. Dekoratiftir
 * (anlam taşıyan bilgi `aria-label` ile linkin kendisinde), bu yüzden
 * `aria-hidden`.
 *
 * `/ekibimiz/[slug]` (kişisel profil) ve `/iletisim` + Footer (büro
 * hesabı) TEK bileşeni paylaşır — iki kopya ikonun sessizce
 * birbirinden kayabileceği anlamına geliyordu.
 */
export default function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7c1.15 0 2.08-.93 2.08-2.08C7.33 3.77 6.4 2.84 5.25 2.84c-1.15 0-2.08.93-2.08 2.08C3.17 6.07 4.1 7 5.25 7Z" />
      <path d="M13.06 8.5H9.83V20.5h3.23v-6.3c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38v6.19H20.7v-6.86c0-3.02-.65-5.35-4.18-5.35-1.7 0-2.83.93-3.3 1.82h-.04V8.5Z" />
    </svg>
  );
}
