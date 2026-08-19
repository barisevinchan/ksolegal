type Aspect = "portrait" | "landscape" | "wide";

type Props = {
  aspect?: Aspect;
  className?: string;
};

/**
 * Fotoğraf yerine geçen gri kutu. Gerçek görseller tasarım onayından
 * sonra gelir; kutu şimdiden en-boy oranıyla yer ayırdığı için görsel
 * eklendiğinde layout kayması olmaz (CLS).
 *
 * `grey-100` yalnızca zemin olarak kullanılır — üzerine metin yazılmaz.
 * Dekoratif olduğu için erişilebilirlik ağacından çıkarılır.
 */
const aspectClass: Record<Aspect, string> = {
  portrait: "aspect-[3/4]", // avukat portresi
  landscape: "aspect-[4/3]", // içerik görseli
  wide: "aspect-[16/9]", // harita, geniş görsel
};

export default function PlaceholderBox({
  aspect = "landscape",
  className,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-grey-100 ${aspectClass[aspect]}${
        className ? ` ${className}` : ""
      }`}
    />
  );
}
