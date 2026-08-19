import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";

/**
 * Kabuk aşaması yer tutucusu. Sayfa içeriği tasarım onaylandıktan sonra
 * yazılır (CLAUDE.md Çalışma Kuralı 1).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Placeholder");

  return (
    <Container>
      <div className="py-24">
        <p className="max-w-prose text-body text-grey-600">
          {t("shellNotice")}
        </p>
      </div>
    </Container>
  );
}
