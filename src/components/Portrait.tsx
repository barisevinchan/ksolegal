import Image from "next/image";

type Size = "card" | "detail" | "compact";

type Props = {
  src: string;
  /** Avukatın adı — dekoratif değil, anlamlı alt metin. */
  alt: string;
  size?: Size;
  className?: string;
};

/**
 * Dairesel portre. Kaynak fotoğrafların ikisi zaten daire olarak
 * kırpılmış (daire dışı beyaz), üçüncüsü dikdörtgen bir stüdyo
 * fotoğrafıydı; üçü de dairenin sıkı kare kutusuna kırpılıp 800×800
 * olarak `public/ekip/` altına yazıldı. Beyaz köşeler `rounded-full`
 * ile tamamen kırpıldığı için zemin uyuşmazlığı oluşmaz.
 *
 * Hover'da büyüme, gölge, 3D transform YOK (CLAUDE.md görsel yasak listesi).
 */
const sizeClass: Record<Size, string> = {
  card: "w-40 md:w-48",
  detail: "w-48 md:w-64",
  compact: "w-16",
};

const sizeAttr: Record<Size, string> = {
  card: "(min-width: 768px) 192px, 160px",
  detail: "(min-width: 768px) 256px, 192px",
  compact: "64px",
};

export default function Portrait({
  src,
  alt,
  size = "card",
  className,
}: Props) {
  return (
    <div
      className={`relative aspect-square shrink-0 overflow-hidden rounded-full bg-grey-100 ${
        sizeClass[size]
      }${className ? ` ${className}` : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizeAttr[size]}
        className="object-cover"
      />
    </div>
  );
}
