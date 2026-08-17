# Tasarım Sistemi — Koçak · Sayım · Örnek

Bu dosya, projedeki tüm UI kararlarının **tek referansıdır**. Bir değer burada
yoksa uydurulmaz; önce buraya eklenir, sonra kullanılır.

Tüm kontrast oranları WCAG 2.1 bağıl parlaklık formülüyle hesaplanmıştır.
Eşikler: normal metin **4.5:1**, büyük metin (≥24px veya ≥18.66px bold)
**3:1**, UI bileşeni / grafik sınırı / focus ring **3:1**.

---

## 1. Renk

### 1.1 Karar

Kurumsal kimlik **tek renk** üzerine kuruludur: `#1F2A44` (Sodalite Blue).

**Ayrı bir vurgu rengi yoktur ve eklenmeyecektir.** Vurgu şu dört araçla kurulur:

1. **Ton farkı** — gri skalasında basamak atlamak
2. **Font ağırlığı** — 400 → 500 → 600
3. **Boşluk** — çevresindeki negatif alanı büyütmek
4. **Navy zeminli bloklar** — `#1F2A44` zemin + `#F7F8FA` metin

### 1.2 Kaynak doğrulaması

| Hex | Kaynaktaki adı | Nerede bulundu |
|---|---|---|
| `#1F2A44` | Sodalite Blue | 8 SVG + 5 PDF (kartvizit ×144, logo, `Lacivert Arka Fon`, 3 broşür) |
| `#F7F8FA` | Beyaz | 8 SVG + 5 PDF (kartvizit ×114, logo, `Beyaz Arka Fon`, 3 broşür) |
| `#D4D6D9` | Gri | Kurumsal renk ekran görüntüsü + 3 broşür PDF'i (14/21/22 kez) |
| `#30353D` `#566078` `#737B88` `#9298A1` | — | Yalnızca broşür PDF'lerinde; kurumsal renk listesinde adlandırılmamış |

### 1.3 Token tablosu

Kontrast sütunları: **Z** = `#F7F8FA` zemin, **N** = `#1F2A44` zemin.

| Token | Hex | Kaynak | vs Z | vs N | İzinli kullanım | Yasaklı kullanım |
|---|---|---|---:|---:|---|---|
| `primary` | `#1F2A44` | kaynak | 13.42:1 | — | Gövde metni, başlık, link, buton zemini, focus ring, kenarlık — açık zeminde her şey | Navy zemin üzerinde (1:1, görünmez) |
| `surface` | `#F7F8FA` | kaynak | 1.00:1 | 13.42:1 | Sayfa zemini; navy zeminde metin/ikon/kenarlık | Açık zeminde metin |
| `grey-50` | `#F7F8FA` | kaynak | 1.00:1 | 13.42:1 | `surface` ile aynı — takma ad | — |
| `grey-100` | `#E6E7EA` | **türetilmiş** | 1.16:1 | 11.53:1 | Açık zeminde bölüm ayracı, tablo zebra dolgusu (dekoratif); navy zeminde metin | Açık zeminde metin, ikon, **anlam taşıyan kenarlık** |
| `grey-200` | `#D4D6D9` | kaynak | **1.37:1** | 9.79:1 | **Yalnızca navy zeminde** — ikincil metin, ayraç, kenarlık | ⛔ **Açık zeminde hiçbir amaçla kullanılmaz** — metin, ikon, kenarlık, ayraç, focus ring dahil |
| `grey-300` | `#B3B7BD` | **türetilmiş** | 1.90:1 | 7.08:1 | Navy zeminde ikincil metin; açık zeminde yalnızca dekoratif dolgu | Açık zeminde metin ve UI sınırı |
| `grey-400` | `#9298A1` | kaynak | **2.73:1** | 4.91:1 | Navy zeminde gövde metni (4.91:1) | ⛔ **Açık zeminde metin ve UI sınırı olarak kullanılmaz.** Yalnızca anlam taşımayan dekorasyon |
| `grey-500` | `#737B88` | kaynak | **4.02:1** | 3.34:1 | ≥24px başlık, ikon, kenarlık — her iki zeminde | ⛔ **Gövde metni değildir.** Yardımcı metin, dipnot, form helper text, placeholder, etiket: yasak |
| `grey-600` | `#566078` | kaynak | 5.92:1 | 2.27:1 | Açık zeminde ikincil/yardımcı metin, dipnot, meta bilgi | Navy zeminde metin (2.27:1) |
| `grey-700` | `#434A5A` | **türetilmiş** | 8.35:1 | 1.61:1 | Açık zeminde gövde metni, ikincil başlık | Navy zeminde |
| `grey-800` | `#30353D` | kaynak | 11.61:1 | 1.16:1 | Açık zeminde gövde metni, koyu nötr zemin | Navy zeminde |
| `grey-900` | `#1A1D22` | **türetilmiş** | 15.90:1 | 1.19:1 | En yüksek kontrastlı metin, `<code>` zemini | Navy zeminde |
| `on-primary` | `#FFFFFF` | — | 1.06:1 | 14.26:1 | Navy zemin üzerinde metin/ikon | Açık zeminde |

**Türetilmiş tokenlar:** `grey-100`, `grey-300`, `grey-700`, `grey-900`.
Komşu kaynak renkleri arasında sRGB interpolasyonuyla üretildi
(`grey-900` için `grey-800` × 0.55). Kurumsal belgede karşılıkları yoktur;
baro/marka onayı gerekirse bu dört değer tartışmaya açıktır.

### 1.4 Hızlı karar kuralı

> Açık zeminde metin yazıyorsan **`grey-600` veya daha koyu** kullan.
> Navy zeminde metin yazıyorsan **`grey-400` veya daha açık** kullan.
> `grey-500` ikisinin de arasında kalır — bu yüzden gövde metni değildir.

Hesaplanan sınırlar: açık zeminde gövde metni için en açık geçerli ton
`#707275` (4.54:1); navy zeminde en koyu geçerli ton `#A0A2A5` (5.57:1).

---

## 2. Hero overlay kuralı

Hero'da ofis/şehir fotoğrafı üzerine başlık gelir. Fotoğrafın hangi bölgesinin
metnin arkasına düşeceği garanti edilemez — bu yüzden **`#1F2A44` overlay
zorunludur.**

### 2.1 Hesap

Kompozit renk: `#1F2A44 × α + fotoğraf × (1−α)`.
En kötü durum, fotoğrafın **bembeyaz** (`#FFFFFF`) bir piksel olmasıdır —
beyaz metin için mümkün olan en düşük kontrast. Hesap bu varsayımla yapıldı.

| Metin | Hedef | Gereken min α | Kompozit | Sonuç |
|---|---|---:|---|---:|
| `#FFFFFF` | 4.5:1 | **0.65** | `#6F7686` | 4.55:1 |
| `#F7F8FA` | 4.5:1 | **0.66** | `#6B7284` | 4.53:1 |
| `#FFFFFF` | 7:1 (AAA) | 0.78 | `#50596D` | 7.02:1 |
| `#F7F8FA` | 7:1 (AAA) | 0.80 | `#4C5569` | 7.03:1 |

### 2.2 Token

```
--hero-overlay-color: #1F2A44
--hero-overlay-opacity: 0.70   /* minimum 0.66, marj için 0.70 */
```

`α = 0.70`'te en kötü durum kontrastı: `#FFFFFF` → **5.42:1**,
`#F7F8FA` → **5.10:1**. Her ikisi de AA'yı marjla geçer.

### 2.3 Uygulama kuralları

- Overlay **düz renktir** — gradient overlay yasak (CLAUDE.md görsel yasak listesi).
- `α` **0.66'nın altına indirilemez.** Fotoğraf koyu diye düşürme; kural
  en kötü duruma göre yazılmıştır ve fotoğraf değiştirilebilir.
- Hero metni `#FFFFFF` veya `#F7F8FA` olur. `grey-200` ve altı **kullanılmaz**.
- Her yeni hero fotoğrafı eklendiğinde bu kural yeniden doğrulanmaz —
  α sabit olduğu sürece en kötü durum zaten karşılanmıştır.
- Overlay `<img>`'in üstünde ayrı bir katmandır; `filter`/`backdrop-filter`
  kullanılmaz.

---

## 3. Tipografi

### 3.1 Aile

**EB Garamond — tek aile.** Başlık ve gövde aynı fontu kullanır.
İkinci bir aile eklenmez.

- `next/font/google` ile **self-host**
- Subset: **`latin` + `latin-ext`**
- Ağırlık ekseni: variable, `wght 400..800`
- `font-display: swap`

**Türkçe doğrulaması yapıldı.** Fontun `cmap` tablosu ayrıştırıldı:
ğ Ğ ş Ş ı İ ö Ö ü Ü ç Ç — 12 karakterin tamamı mevcut.
`i` (glyph 462) ≠ `ı` (463) ve `I` (48) ≠ `İ` (54) — noktalı/noktasız ayrımı
sağlam. Font `GSUB` tablosunda `latn/TRK ` language system'i ve `locl`
feature'ı içeriyor; `<html lang="tr">` verilmesi gerekir.

⚠️ `latin-ext` subset'i **kaldırılamaz**: ğ Ğ ş Ş İ bu aralıktadır
(`ı` ve ç/ö/ü ise `latin` içinde). Eksikse tofu (□) render olur.

### 3.2 Ölçek

| Token | Boyut | Ağırlık | line-height | Kullanım |
|---|---:|---:|---:|---|
| `h1` | 39px | 600 | 1.15 | Sayfa başlığı — sayfada bir kez |
| `h2` | 31px | 600 | 1.25 | Bölüm başlığı |
| `h3` | 25px | 500 | 1.35 | Alt bölüm başlığı |
| `h4` | 21px | 500 | 1.40 | Kart başlığı, avukat adı |
| `body-lg` | 19px | 400 | 1.55 | Giriş paragrafı, hero alt metni |
| `body` | **17px** | 400 | **1.60** | Varsayılan gövde metni |
| `body-sm` | 15px | 400 | 1.60 | Dipnot, meta bilgi, footer |

- Ölçek ~1.25 oranlıdır (major third'e yakın).
- Gövde satır uzunluğu **65–70 karakter** → `max-width: 65ch`
  (17px'te ≈ 552–595px).
- Başlıklarda 400 kullanılmaz; gövdede 500/600 kullanılmaz.
- Mobilde `h1` 31px'e, `h2` 25px'e iner; gövde 17px sabit kalır.

---

## 4. Spacing

4px tabanlı ölçek. Bunun dışında değer kullanılmaz.

| Token | Değer |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |

Kullanım yönü: bileşen içi boşluk 4–16px, bileşenler arası 24–32px,
bölümler arası 48–96px.

---

## 5. Layout kararları

### 5.1 Hero
Ofis/şehir fotoğrafı, üstünde başlık. Overlay kuralı bölüm 2'de.
Tek ekran, tek başlık, altında üç yönlendirme. Sayaç, rozet, CTA butonu yok.

### 5.2 Ekip
Fotoğraflı **3'lü grid**. Masaüstünde 3 kolon, tablette 2, mobilde 1.
Kart içeriği CLAUDE.md'nin "İzin verilen içerik" listesiyle **sınırlıdır** —
ad-soyad, akademik unvan, fotoğraf, sicil no, mesleğe başlama tarihi,
üniversite, yabancı diller, iletişim bilgileri. Bunun dışında alan eklenmez.

Kartlarda hover'da büyüme, gölge artışı, 3D transform **yok**.
İzinli hareket: 150–200ms opacity/transform geçişi.

### 5.3 Navigasyon
Yatay üst nav. Sağda dil değiştirici (TR/EN). Mobilde hamburger.

- Nav'da **CTA butonu yok** — "Hemen ara", "Ücretsiz görüşme" vb. TBB yasağı.
- Hamburger menü tam klavye erişilebilir; açıkken focus trap, `Esc` ile kapanır.
- Aktif sayfa `aria-current="page"` ile işaretlenir.

### 5.4 Dil
Türkçe varsayılan, İngilizce ikinci dil. `next-intl`,
çeviriler `messages/tr.json` ve `messages/en.json`.
`<html lang>` aktif dile göre değişir — Türkçe glyph varyantları buna bağlı.

---

## 6. Erişilebilirlik

Hedef: **WCAG 2.1 AA**.

### 6.1 Focus ring
- **2px** kalınlık, `outline-offset: 2px`
- Açık zeminde `primary` (`#1F2A44`) — 13.42:1
- Navy zeminde `#FFFFFF` — 14.26:1
- ⛔ `grey-200` focus ring olarak **kullanılmaz** (açık zeminde 1.37:1)
- `outline` hiçbir koşulda kaldırılmaz; `:focus-visible` kullanılır

### 6.2 Dokunma hedefi
- Minimum **44×44px**
- Hedefler arası en az **8px** boşluk
- Küçük görünen ikon butonlarda görünmez padding ile 44×44 tamamlanır

### 6.3 Hareket
- `prefers-reduced-motion: reduce` **her zaman** desteklenir
- Geçişler 150–200ms opacity/transform ile sınırlı
- Reduced motion aktifken tüm geçişler kapatılır

### 6.4 Genel
- Kontrast: normal metin ≥4.5:1, büyük metin ≥3:1, UI sınırı ≥3:1
- Semantik HTML: `<nav>`, `<main>`, `<article>`, doğru heading hiyerarşisi
- Tüm görsellerde anlamlı `alt`; dekoratif görsellerde `alt=""`
- Tam klavye navigasyonu; skip link
- Renk **tek başına** bilgi taşımaz

---

## 7. Doğrulama notları

Bu dosyadaki sayılar hesaplanmıştır, tahmin değildir:

- Renk hex'leri `kaynak/` altındaki SVG ve PDF içeriklerinden çıkarıldı.
  Kurumsal renk ekran görüntüsünde hex'ler **yazılı metin** olarak
  bulunduğu için piksel örneklemesi gerekmedi; görselde renk bloğu yoktur.
- Kontrast oranları WCAG 2.1 bağıl parlaklık formülüyle hesaplandı.
- Overlay opaklığı en kötü durum (beyaz fotoğraf pikseli) varsayımıyla
  çözüldü.
- Font karakter kapsamı EB Garamond variable TTF'inin `cmap` ve `GSUB`
  tabloları ayrıştırılarak doğrulandı.

**Açık konu:** Kurumsal renk ekran görüntüsü üstten kırpılmış olabilir
(PNG'nin `y=0` satırında kesilmiş içerik izi var). Palette 4. bir renk
bulunuyorsa bu dosya güncellenmelidir.
