import placeholder from "../../content/placeholder.json";

/**
 * Tasarım kabuğu verisi. Gerçek avukat ve faaliyet alanı bilgileri
 * tasarım onaylandıktan sonra girilir (CLAUDE.md Çalışma Kuralı 1).
 *
 * Slug'lar iki dilde de aynıdır ve anahtar kelime içermez — TBB Reklam
 * Yasağı Yönetmeliği Madde 7/e, anahtar kelimeli yol kullanımını yasaklar.
 */
export const teamSlugs: readonly string[] = placeholder.teamSlugs;

export const practiceAreaSlugs: readonly string[] = placeholder.practiceAreaSlugs;

/**
 * Placeholder adları `{index}` ile üretildiği için slug'ın sıra numarası
 * gerekir. Bilinmeyen slug -1 döner; çağıran taraf notFound() ile karşılar.
 */
export function indexOfSlug(slugs: readonly string[], slug: string): number {
  return slugs.indexOf(slug);
}
