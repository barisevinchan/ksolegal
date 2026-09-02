import type { OfficeContactRow } from "@/lib/content";

/**
 * Footer ("navy zeminde, kompakt") ve /iletisim ("açık zeminde, geniş")
 * blokları görsel olarak farklıdır — bu meşru bir tasarım farkıdır, tek
 * bileşene indirgenmez. Ama satır YAPISI (dt/dd, dikey hizalama, link
 * touch target'ı) ikisinde de AYNI olmalı; iki ayrı kopya bu ikisinin
 * sessizce birbirinden kayabileceği (bkz. telefon satırı ekleme sırasında
 * Contact'ta `items-center` unutulması) anlamına geliyordu.
 */
type Variant = "onPrimary" | "onLight";

const VARIANT_STYLES: Record<
  Variant,
  {
    list: string;
    row: string;
    label: string;
    value: string;
    linkHover: string;
  }
> = {
  onPrimary: {
    list: "mt-6 space-y-3 text-body-sm",
    row: "flex items-center gap-3",
    label: "min-w-24 text-grey-300",
    value: "text-grey-200",
    linkHover: "hover:text-on-primary",
  },
  onLight: {
    list: "mt-8 space-y-4",
    row: "sm:flex sm:items-center sm:gap-6",
    label: "text-body-sm text-grey-600 sm:w-32 sm:shrink-0",
    value: "text-body text-grey-800",
    linkHover: "hover:text-primary",
  },
};

type Props = {
  rows: OfficeContactRow[];
  /** Satır etiketi — her iki çağıran da aynı `Footer` çeviri namespace'ini kullanır. */
  getLabel: (key: OfficeContactRow["key"]) => string;
  variant: Variant;
};

export default function ContactDetailsList({ rows, getLabel, variant }: Props) {
  const styles = VARIANT_STYLES[variant];

  return (
    <dl className={styles.list}>
      {rows.map((row) => (
        <div key={row.key} className={styles.row}>
          <dt className={styles.label}>{getLabel(row.key)}</dt>
          <dd className={styles.value}>
            {row.href ? (
              /* `min-h-11` dokunma hedefini 44px'e tamamlar
                 (docs/design-system.md §6.2); satırın `items-center`
                 hizalaması sayesinde etiketle aynı çizgide kalır. */
              <a
                href={row.href}
                className={`inline-flex min-h-11 items-center underline underline-offset-4 transition-text ${styles.linkHover}`}
              >
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
