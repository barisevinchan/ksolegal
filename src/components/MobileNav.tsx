"use client";

import { useEffect, useId, useRef, useState } from "react";

import NavLink, { type NavItem } from "./NavLink";

type Props = {
  items: NavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
};

/**
 * WAI-ARIA disclosure kalıbı — modal değil, header'ın altına açılan panel.
 * Bu yüzden focus trap uygulanmaz (modal olmayan bir panelde focus'u
 * hapsetmek kalıba aykırıdır); Esc ile kapanır, focus butona döner.
 */
export default function MobileNav({
  items,
  navLabel,
  openLabel,
  closeLabel,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex min-h-11 min-w-11 items-center justify-center text-on-primary"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          aria-hidden="true"
          focusable="false"
          className="h-5 w-5"
        >
          {isOpen ? (
            <path d="M4 4 16 16 M16 4 4 16" />
          ) : (
            <path d="M3 6h14 M3 10h14 M3 14h14" />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-50 bg-primary"
      >
        <nav aria-label={navLabel}>
          <ul className="flex flex-col px-4 py-2 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  onNavigate={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
