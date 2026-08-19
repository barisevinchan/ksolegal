import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Sayfa kabuğu. Tüm bölümler bunun içine girer; yatay boşluk yalnızca
 * burada tanımlanır ki ritim her sayfada aynı olsun.
 */
export default function Container({ children, className }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
