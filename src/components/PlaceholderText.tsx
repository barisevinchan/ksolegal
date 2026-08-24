import { getTranslations } from "next-intl/server";

const keys = ["paragraph", "paragraphAlt", "paragraphThird"] as const;

type Props = {
  paragraphs?: 1 | 2 | 3;
  className?: string;
};

/**
 * Yer tutucu gövde metni. Gerçek metin tasarım onaylandıktan sonra
 * yazılır (CLAUDE.md Çalışma Kuralı 1).
 *
 * Türkçe sürüm bilerek Türkçe karakter içerir: `latin-ext` subset'i ve
 * `lang="tr"` glyph davranışı ancak gerçek karakterlerle test edilebilir
 * (docs/design-system.md §3.1).
 */
export default async function PlaceholderText({
  paragraphs = 2,
  className,
}: Props) {
  const t = await getTranslations("Lorem");

  return (
    <div
      className={`justify-prose max-w-prose space-y-4 text-body text-grey-800${
        className ? ` ${className}` : ""
      }`}
    >
      {keys.slice(0, paragraphs).map((key) => (
        <p key={key}>{t(key)}</p>
      ))}
    </div>
  );
}
