import type { PrivacyBlock } from "@/lib/content";

/**
 * Gizlilik metnindeki bir blok dizisini render eder: paragraf, madde
 * işaretli liste (`/faaliyet-alanlari/[slug]` "Core Services" ile aynı
 * stil) veya madde işaretsiz alt alta satırlar (veri sorumlusu adres
 * bloğu gibi). TR/EN çağrıları bağımsız dizilerle gelir (bkz.
 * `PrivacySection`), bu bileşen hangi dil olduğunu bilmez.
 */
export default function LegalBlocks({
  blocks,
}: {
  blocks: readonly PrivacyBlock[];
}) {
  return (
    <div className="justify-prose mt-4 max-w-prose space-y-4 text-body text-grey-800">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="list-disc space-y-2 pl-5 marker:text-grey-500"
            >
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "lines") {
          return (
            <p key={index}>
              {block.items.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
