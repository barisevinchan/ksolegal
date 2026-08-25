import Container from "./Container";

type Props = {
  title: string;
  lead?: string;
};

/**
 * Sayfa üstü. Başlık ölçeği mobilde bir basamak iner
 * (docs/design-system.md §3.2: h1 39px → 31px) — bu, `text-h2 md:text-h1`
 * ile yapılır, ayrı bir token tanımlanmaz.
 *
 * Başlık rengi `primary`: kimlikte ayrı vurgu rengi olmadığı için vurgu
 * ton farkıyla kurulur (§1.1). Açık zeminde 13.42:1.
 */
export default function PageHeader({ title, lead }: Props) {
  return (
    <Container>
      <div className="max-w-prose py-16 md:py-24">
        <h1 className="text-h2 text-primary md:text-h1">{title}</h1>
        {lead ? (
          <p className="mt-6 text-body-lg text-grey-600">{lead}</p>
        ) : null}
      </div>
    </Container>
  );
}
