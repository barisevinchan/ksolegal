import avukatlar from "../../content/avukatlar.json";
import buro from "../../content/buro.json";
import faaliyetAlanlari from "../../content/faaliyet-alanlari.json";

/**
 * Site içeriğinin tek kaynağı. Alan adları koda baktığı için İngilizce;
 * metin değerleri `{ tr, en }` biçiminde iki dilli tutulur ki müşteri iki
 * dili yan yana görüp tek dosyadan düzeltebilsin.
 *
 * ⚠️ Avukat içeriği CLAUDE.md "İzin verilen içerik" listesiyle (TBB Reklam
 * Yasağı Yönetmeliği Madde 7/d) SINIRLIDIR. Yeni alan eklemeden önce o
 * listeye bakılmalıdır.
 *
 * Boş string / null = broşürde bulunamayan veri. Uydurulmadı; ilgili
 * bölüm render edilmez (bkz. `hasText`).
 */
export type L10n = { tr: string; en: string };

/** İki dilli değerden aktif dilin metnini alır. Bilinmeyen dil → Türkçe. */
export function pick(value: L10n, locale: string): string {
  return locale === "en" ? value.en : value.tr;
}

/**
 * Veri girilmiş mi? Boş bölümlerin render edilmemesi için kullanılır —
 * ziyaretçiye bir sürü tire göstermek yerine bölüm hiç çıkmaz.
 */
export function hasText(value: string | L10n | null | undefined): boolean {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return value.tr.trim().length > 0 || value.en.trim().length > 0;
}

/* ==========================================================================
   Avukatlar
   ========================================================================== */

export type Education = {
  institution: L10n;
  degree: L10n;
  year: string;
  note: L10n | null;
};

export type Registry = {
  tbbNo: string;
  baroNo: string;
  bar: L10n;
  admission: string;
  /** Avukatlık sicilinden ayrı bir meslek sicili. */
  mediator: { registryNo: string; since: string } | null;
};

export type Contact = { email: string; phone: string; kep: string };

/** "Başlık — açıklama" yapısı müşteri metninde olduğu gibi korunur. */
export type KeyFocusItem = { title: L10n; description: L10n };

export type Lawyer = {
  slug: string;
  name: string;
  photo: string;
  /**
   * ⚠️ "MSc" (Hüseyin) Finansal Ekonomi yüksek lisansıdır — CLAUDE.md'nin
   * "hukuk alanındaki akademik unvan" kaydını aşar. Müşteri metninde bu
   * şekilde geçtiği için kullanıcı talimatıyla aynen alındı.
   */
  academicTitle: string;
  role: L10n;
  /**
   * Liste kartındaki tanıtım etiketleri. Serbest metindir ve faaliyet
   * alanı sayfalarına LİNK DEĞİLDİR — "Mediation", "Regulatory" gibi
   * bazı başlıkların sitede karşılık gelen alan sayfası yok. Gerçek
   * çapraz linkler detay sayfasındaki `practiceAreas` bölümünden gelir.
   */
  practiceLabels: L10n[];
  intro: L10n[];
  keyFocus: KeyFocusItem[];
  education: Education[];
  /** `faaliyet-alanlari.json` içindeki alanların `id` değerleri. */
  practiceAreas: string[];
  languages: L10n[];
  registry: Registry;
  contact: Contact;
};

export const lawyers = avukatlar.lawyers as readonly Lawyer[];

export const lawyerSlugs: readonly string[] = lawyers.map((l) => l.slug);

export function getLawyer(slug: string): Lawyer | undefined {
  return lawyers.find((l) => l.slug === slug);
}

/**
 * "LL.M., Avukat · Ortak" — akademik unvan yoksa atlanır.
 *
 * Virgül ayırıcı müşteri PDF'indeki biçimden gelir ("LL.M., Partner").
 * `Avukat` / `Attorney-at-Law` ibaresi ise korunur: TBB'nin izin verilen
 * içerik listesinde açıkça yer alan mesleki unvandır.
 */
export function titleLine(lawyer: Lawyer, locale: string): string {
  return [lawyer.academicTitle, pick(lawyer.role, locale)]
    .filter((part) => part.length > 0)
    .join(", ");
}

/* ==========================================================================
   Faaliyet alanları
   ========================================================================== */

/**
 * Yapı müşteri PDF'inin "PRACTICE AREAS" bölümüyle birebirdir:
 * her alan iki paragraflık bir `Overview` ve düz bir `Core Services`
 * madde listesinden oluşur. Alt başlıklı gruplama YOKTUR — kaynakta da
 * yoktur, uydurulmaz.
 */
export type PracticeArea = {
  id: string;
  /** Slug dile göre değişir: /faaliyet-alanlari/is-hukuku ↔ /en/practice-areas/employment-and-labor-law */
  slug: L10n;
  title: L10n;
  /** PDF "Overview" — tam olarak 2 paragraf. */
  overview: L10n[];
  /** PDF "Core Services" — düz madde listesi. */
  coreServices: L10n[];
};

export const practiceAreas = faaliyetAlanlari.areas as readonly PracticeArea[];

/**
 * Overview'ın ilk cümlesi. Liste kartındaki özet ve `<meta description>`
 * bundan TÜRETİLİR; içerik dosyasında ayrı bir alanda tekrarlanmaz.
 *
 * Gerekçe: özet müşterinin kendi cümlesidir. Ayrı alanda tutulsaydı
 * müşteri paragrafı düzelttiğinde kart metni sessizce eskir; türetince
 * ikisi kayamaz.
 *
 * Bölme ölçütü nokta + boşluktur. 13 alanın 26 paragrafında cümle içi
 * kısaltma noktası yoktur (kontrol edildi) ve Türkçe çevirilerde de
 * kullanılmaz — "vb.", "md." gibi bir kısaltma girerse cümle erken
 * kesilir. Nokta bulunamazsa metnin tamamı döner.
 */
export function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

/** Liste kartı özeti ve meta description — iki yerde de aynı cümle. */
export function areaSummary(area: PracticeArea, locale: string): string {
  return firstSentence(pick(area.overview[0], locale));
}

export function getAreaBySlug(
  slug: string,
  locale: string,
): PracticeArea | undefined {
  return practiceAreas.find((area) => pick(area.slug, locale) === slug);
}

export function getAreaById(id: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.id === id);
}

/**
 * Alan → avukat ilişkisi TÜRETİLİR; alan dosyasında avukat listesi
 * tutulmaz. Böylece ilişki tek yerde (avukatlar.json) tanımlı kalır ve
 * iki liste birbirinden kayamaz.
 */
export function getLawyersForArea(areaId: string): readonly Lawyer[] {
  return lawyers.filter((l) => l.practiceAreas.includes(areaId));
}

export function getAreasForLawyer(lawyer: Lawyer): PracticeArea[] {
  return lawyer.practiceAreas
    .map(getAreaById)
    .filter((area): area is PracticeArea => area !== undefined);
}

/**
 * Dil değiştirici için slug sözlüğü: her slug (iki dilde de) kendi
 * `{ tr, en }` çiftine bakar. Eşlemede olmayan slug — avukat adları —
 * olduğu gibi geçer, çünkü kişi adları çevrilmez.
 *
 * `Header` bunu hesaplayıp `LocaleSwitcher`'a prop olarak verir; böylece
 * içerik dosyasının tamamı client bundle'a girmez.
 */
export function buildSlugMap(): Record<string, L10n> {
  const map: Record<string, L10n> = {};
  for (const area of practiceAreas) {
    map[area.slug.tr] = area.slug;
    map[area.slug.en] = area.slug;
  }
  return map;
}

/* ==========================================================================
   Büro (hakkımızda metni + iletişim bilgileri)
   ========================================================================== */

export type Office = {
  lead: L10n;
  address: L10n;
  phone: string;
  fax: string;
  email: string;
  kep: string;
};

/** /hakkimizda gövde metni. Müşteri PDF'inin "WHO WE ARE?" bölümü. */
export const aboutParagraphs = buro.about.paragraphs as readonly L10n[];

export const office = buro.office as Office;

export type OfficeContactRow = {
  /** `Footer` mesaj namespace'indeki etiket anahtarı. */
  key: "address" | "phone" | "fax" | "email" | "kep";
  value: string;
  /** Tıklanabilir satırlarda `mailto:` / `tel:`. Değer boşsa yoktur. */
  href?: string;
};

/**
 * Footer ile /iletisim'in ORTAK satır listesi — iki yerde ayrı ayrı
 * yazılmaz.
 *
 * Değeri boş olan satır listeden ELENİR: ziyaretçiye bir sıra tire
 * göstermek yerine satır hiç çıkmaz. Telefon, faks ve KEP müşteriden
 * gelmediği için şu an yalnızca adres ve e-posta render edilir.
 *
 * Satırın sırası, etiketi, linki ve filtresi tamamen buradadır; bu yüzden
 * eksik veri geldiğinde YALNIZCA content/buro.json güncellenir, hiçbir
 * component değişmez.
 */
export function getOfficeContactRows(locale: string): OfficeContactRow[] {
  const rows: OfficeContactRow[] = [
    { key: "address", value: pick(office.address, locale) },
    { key: "phone", value: office.phone, href: telHref(office.phone) },
    { key: "fax", value: office.fax },
    { key: "email", value: office.email, href: mailHref(office.email) },
    { key: "kep", value: office.kep, href: mailHref(office.kep) },
  ];

  return rows.filter((row) => hasText(row.value));
}

/** Faks numarası aranmaz, bu yüzden `fax` için link üretilmez. */
function telHref(value: string): string | undefined {
  if (!hasText(value)) return undefined;
  // `tel:` şeması boşluk ve parantez kabul etmez; yalnızca rakam ve
  // baştaki + kalır.
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function mailHref(value: string): string | undefined {
  return hasText(value) ? `mailto:${value}` : undefined;
}
