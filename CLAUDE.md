# Avukatlık Bürosu Web Sitesi

## Proje Bağlamı

Türkiye'de faaliyet gösteren, 3 avukatlı bir avukatlık bürosu için kurumsal tanıtım sitesi.
Statik, içerik odaklı, düşük etkileşimli. E-ticaret yok, kullanıcı hesabı yok.

**Stack:** Next.js 15 (App Router, SSG) + TypeScript + Tailwind CSS
**Deploy:** Vercel
**Diller:** Türkçe (varsayılan) + İngilizce

---

## ⛔ MUTLAK KISITLAR — TBB Reklam Yasağı Yönetmeliği

Bu site, Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği'ne (RG 21/11/2003-25296,
son değişiklik RG 09/08/2024-32627) tabidir. Aşağıdaki kurallar **pazarlama tercihi
değil, hukuki zorunluluktur**. İhlali müvekkil avukat hakkında re'sen disiplin
soruşturması açılmasına yol açar.

### Bu içerikleri ASLA üretme, önerme veya iskelete ekleme:

- ❌ Referans / müvekkil listesi, müvekkil logosu, "çalıştığımız kurumlar"
- ❌ Müvekkil yorumu, testimonial, yıldız/puanlama, Google review embed
- ❌ Kazanılmış dava sayacı, başarı oranı, "X milyon TL tazminat kazandık"
- ❌ "Uzman", "uzmanlık", "specialist", "expert" kelimeleri (hiçbir dilde)
      — **tek istisna aşağıda, "Onaylanmış istisna" bölümünde.**
- ❌ "Türkiye'nin en iyi", "lider", "öncü", "#1", "güvenilir marka" gibi üstünlük iddiaları
- ❌ Emekli hâkim/savcı/noter, bilirkişi, milletvekili, marka-patent vekili gibi sıfatlar
- ❌ Geçmiş veya mevcut kamu görevi / siyasi parti görevi bilgisi
- ❌ "Ücretsiz ön görüşme", "hemen ara", "hukuki sorunuzu sorun" tarzı CTA
- ❌ Canlı destek widget'ı, chatbot, WhatsApp float button
- ❌ Google Ads / Analytics remarketing / dönüşüm takibi / piksel
- ❌ Fiyat listesi, paket, "danışmanlık ücreti"

### SEO kısıtları (Madde 7/e):

- ❌ Anahtar kelime içeren slug: `bosanma-avukati-istanbul` YASAK →
      `faaliyet-alanlari/aile-hukuku` doğru
- ❌ Anahtar kelime içeren alt alan adı, gizli metin, keyword stuffing
- ❌ Sıralama amaçlı schema markup, backlink kurgusu, yönlendirme kısa yolları
- ✅ Nötr, açıklayıcı `<title>` ve `<meta description>`
- ✅ Temiz semantik HTML ve erişilebilirlik — serbest

### İzin verilen içerik (Madde 7/d — bu liste kapalıdır):

Avukat başına yalnızca: ad-soyad, hukuk alanındaki akademik unvan, fotoğraf,
TBB ve baro sicil numarası, mesleğe başlama tarihi, mezun olduğu üniversite,
bildiği yabancı diller, büro adresi, telefon, faks, e-posta, KEP adresi.

Ek olarak: **uzmanlık anlamına gelmemek kaydıyla** büronun faaliyet gösterdiği
alanlar hakkında nötr bilgi verilebilir.

### ⚠️ Onaylanmış istisna: "Uzman Arabulucu"

Müvekkil, uyarıldıktan sonra **19 Ağustos 2026 tarihinde** arabuluculuk sicil
satırında "Uzman Arabulucu" (EN: "Expert Mediator") ifadesinin kullanılmasını
ve yukarıdaki "uzman" yasağının bu tek nokta için geçersiz kılınmasını yazılı
olarak onayladı.

**İstisnanın sınırı kesindir.** Kelime yalnızca `/ekip/[slug]` sayfalarındaki
"Sicil Bilgileri" bölümünde, arabuluculuk siciline ait satırın etiketi olarak
geçer:

```
Uzman Arabulucu    Sicil no: 29720 · 2022 yılından bu yana
```

Bunun dışında **hiçbir yerde** kullanılmaz: faaliyet alanı açıklamalarında,
tanıtım paragraflarında, sayfa başlıklarında, meta açıklamalarda, alt
metinlerde değil. Hangi hukuk alanlarında uzman arabulucu olunduğu bilgisi de
alınmadı — yalnızca sicil numarası ve yıl verilir.

Bu istisna müvekkilin kararıdır; baro görüşü alınması önerilir. Geri
alınırsa `content/avukatlar.json` içindeki veri korunur, yalnızca
`messages/*.json` içindeki `Team.fields.mediator` etiketi "Arabulucu" /
"Mediator" olarak değiştirilir.

---

### Blog / makale bölümü

**Sorulmadan ekleme.** 2024 değişikliği sonrası tartışmalı. İstenirse rota
oluştur ama içerik üretme ve ana navigasyonda öne çıkarma. Yayına almadan
önce baro görüşü alınacaktır.

---

## 🎨 TASARIM YÖNÜ

### Motto: "Simple is the best"

Sade, abartısız, şık. Az eleman, bol boşluk, güçlü tipografi. Görsel efekt
değil, hiyerarşi ve ritim ile ciddiyet kur.

### Referans: esin.av.tr

Ton referansı olarak Esin Avukatlık Ortaklığı sitesi alınmıştır — **birebir
kopya değil.** Alınacak yaklaşım:
- Ana sayfa neredeyse boş: tek görsel/başlık + üç yönlendirme + iletişim
- Yatay üst navigasyon, sayfa sayısı az
- Kurumsal, soğuk, dingin renk paleti
- İçerik ön planda, dekorasyon arka planda

### ⛔ Görsel olarak YASAK

Bunlar bu projede kesinlikle kullanılmayacak — önerme bile:

- Glassmorphism, neumorphism, brutalism, claymorphism
- Gradient arka plan, gradient metin, blur/backdrop-filter efektleri
- Parallax, scroll-triggered animasyon, sayı sayaçları, typewriter efekti
- Otomatik geçen carousel/slider, video arka plan
- Emoji, ikon kalabalığı, dekoratif illüstrasyon
- Neon/canlı renkler, koyu tema varyantı
- Hover'da büyüyen kartlar, 3D transform, tilt efekti

**İSTİSNA:** Hero üst kenarında, navy header ile fotoğrafı kaynaştırmak
amacıyla tek renkli (primary → transparent) dikey gradient maske
kullanılabilir. Bu dekoratif değil, iki bloğu birleştiren yapısal bir
maskedir. Renkli/çok duraklı gradient, gradient metin ve diğer dekoratif
gradient kullanımları YASAK olmaya devam eder.

### ✅ İzin verilen hareket

- 150–200ms opacity/transform geçişleri (link, buton hover)
- `prefers-reduced-motion` her zaman desteklenir
- Statik, tek seferlik fade-in kabul edilebilir ama zorunlu değil

### Tasarım sistemi kuralları

- Renk paleti `kaynak/` içindeki kurumsal renk kodlarından türetilir.
  Uydurma renk kullanma. (bkz. "Renk kararı")
- **Tek font ailesi** kullanılır (bkz. "Tipografi kararı"), `font-display: swap`
- Tüm renk, spacing, tipografi değerleri `globals.css` içinde `@theme`
  bloğunda **CSS değişkeni** olarak tanımlanır. Component içinde ham hex,
  ham px **yazma**.
- Spacing ölçeği 4px tabanlı, tutarlı kullanılır

### Renk kararı

Kimlik **tek renk** üzerine kuruludur. Kaynak dosyalardan doğrulanmıştır.

- **Ana renk:** `#1F2A44` (Sodalite Blue) — 8 SVG ve 5 PDF'te teyitli
- **Zemin:** `#F7F8FA` — aynı kaynaklarda teyitli
- **Gri skalası** broşürlerden çıkan navy-tonlu grilerden türetilir:
  `#30353D`, `#566078`, `#737B88`, `#9298A1`, `#D4D6D9`. Ara basamaklar
  bunlardan interpolasyonla üretilir, `docs/design-system.md`'de
  "türetilmiş" olarak işaretlidir.
- **Ayrı vurgu rengi YOKTUR.** Vurgu şu dört araçla kurulur:
  ton farkı, font ağırlığı, boşluk, navy zeminli bloklar.
  Yeni bir vurgu rengi ekleme — sorman gereken bir durumsa sor.

#### Kontrast kuralları (ihlal edilemez)

- ⛔ `#D4D6D9` **açık zeminde kullanılmaz** — `#F7F8FA` üzerinde 1.37:1.
  Metin, ikon, kenarlık, ayraç, focus ring: hiçbiri. **Yalnızca navy
  zeminde** kullanılır (orada 9.79:1).
- ⛔ `#737B88` **gövde metni değildir** — `#F7F8FA` üzerinde 4.02:1.
  Yalnızca **≥24px başlık**, ikon ve kenarlık olarak kullanılır.
  Yardımcı metin, dipnot, form helper text, placeholder olarak **yasak**.
- ⛔ `#9298A1` **metin ve UI sınırı olarak kullanılmaz** — 2.73:1.
  Açık zeminde yalnızca anlam taşımayan dekorasyon.

Tam token tablosu, her tokenin kontrast oranı ve izinli/yasaklı kullanımı:
`docs/design-system.md` — UI kararlarında tek referans budur.

### Layout kararları

- **Hero:** ofis/şehir fotoğrafı, üstünde başlık. Fotoğraf üzerindeki
  metin için `#1F2A44` overlay **zorunludur** — opaklık ve gerekçesi
  `docs/design-system.md` "Hero overlay kuralı" bölümünde.
- **Ekip:** fotoğraflı 3'lü grid. Kart içeriği CLAUDE.md'nin "İzin
  verilen içerik" listesiyle sınırlıdır.
- **Navigasyon:** yatay üst nav, sağda dil değiştirici, mobilde
  hamburger. Nav'da CTA butonu **yok** (TBB yasağı).
- **Dil:** Türkçe varsayılan + İngilizce.

### Tipografi kararı

- **Tek font ailesi: EB Garamond** — hem başlık hem gövde. İkinci aile
  eklenmez.
- Gövde: **17px** taban, `line-height` **1.6**, satır uzunluğu
  **65–70 karakter**
- Ağırlıklar: başlık **500/600**, gövde **400**
- `next/font` ile **self-host**; subset olarak **`latin` ve `latin-ext`**
  yüklenir (Türkçe ğĞşŞıİ için `latin-ext` zorunludur)

---

## 🧰 SKILL KULLANIMI

### ui-ux-pro-max

Skill proje kökünde değil, **kullanıcı seviyesinde** kurulu:
`~/.claude/skills/ui-ux-pro-max/`. Göreli `.claude/skills/...` yolu bu
projede **çalışmaz** — proje kökünde `.claude/` dizini yoktur.

**Öncelikli çağırma yöntemi:** Skill aracıyla doğrudan `ui-ux-pro-max`
adıyla çağır.

CLI gerekirse mutlak yol kullanılır:
`C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py`

Tasarım kararı vermeden önce bu skill'e danış. Ancak **çıktısını filtrele** —
skill'in veritabanı trend efektlere (glassmorphism, gradient, animasyon)
ağırlık verir; yukarıdaki yasak listesine takılan hiçbir öneriyi uygulama.

Kullanılacak arama yönü:

```bash
python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "law firm corporate minimal editorial serif restrained" \
  --design-system -f markdown -p "Hukuk Burosu"

python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "typography serif pairing professional" 
python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "whitespace spacing scale editorial"
python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "accessibility contrast focus keyboard" --domain ux
python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "layout responsive" --stack nextjs
python3 "C:/Users/vbari/.claude/skills/ui-ux-pro-max/scripts/search.py" \
  "layout responsive" --stack html-tailwind
```

`nextjs-tailwind` diye bir stack **yoktur** — skill hata verir. Next.js ve
Tailwind kuralları iki ayrı sorgu ile alınır.

Sentezlenen sonuç `docs/design-system.md` dosyasına yazılır ve sonraki tüm
UI kararlarında tek referans budur.

### Diğer skill'ler

Bir görev için uygun skill varsa kullan. Kullandığın skill'i ve neden
seçtiğini kısaca belirt.

### Skill önceliği

1. **ui-ux-pro-max** — tasarım sistemi, palet, tipografi, UX kuralları
2. **frontend-design** — component implementasyonu, styling kararları
3. **design-system** — token yapısı ve tutarlılık denetimi

**Kullanılmayacaklar:** banner-design, slides, brand

Bir skill'in önerisi CLAUDE.md'deki "Görsel olarak YASAK" listesiyle
çelişirse **CLAUDE.md kazanır.**

---

## 📁 Kaynak Dosyalar

```
_kaynak/
├── logo/        Kurumsal logo (tercihen SVG; değilse dönüştür)
├── brosur/      3 avukatın broşürleri — kişi bilgileri buradan çekilir
├── fotograf/    Avukat portreleri
├── kartvizit/   Renk kodu ve tipografi referansı
└── renkler.*    Kurumsal renk kodları
```

`_kaynak/` build'e dahil edilmez. `.gitignore`'a **ekleme** — repoda kalsın,
sadece `public/` altına kopyalanmasın.

### Broşürden bilgi çıkarma kuralı

Broşürler farklı bir mecradır ve kuralları farklıdır. Broşürde bulunan
her bilgi siteye konulamaz.

1. Yalnızca "İzin verilen içerik" listesindeki alanları çıkar
2. Yasak kapsamına giren bir bilgiye rastlarsan **alma ve ayrıca rapor et**
3. Çıktı `content/avukatlar.json` dosyasına yazılır
4. Emin olmadığın bir alan varsa sor, tahmin etme

---

## Sayfa Yapısı

```
/                         Ana sayfa — sade, tek ekran, üç yönlendirme
/hakkimizda               Büro tanıtımı
/ekip                     3 avukat kartı (izin verilen alanlarla sınırlı)
/ekip/[slug]              Avukat detay
/faaliyet-alanlari        Alan listesi
/faaliyet-alanlari/[slug] Alan detayı — nötr, bilgilendirici dil
/iletisim                 Adres, telefon, faks, e-posta, KEP, harita
/kvkk
/cerez-politikasi
```

"Kariyer" ve "Kurumsal Sorumluluk" sayfaları **yok** — 3 kişilik büro için gereksiz.

---

## KVKK / Mevzuat Gereklilikleri

- `/kvkk` Aydınlatma Metni ve `/cerez-politikasi` sayfaları her build'de bulunur
- İletişim formunda **ön işaretli olmayan** açık rıza checkbox'ı; onaysız submit engellenir
- Çerez banner'ı kategori bazlı; "Reddet" gerçekten çalışır ve zorunlu olmayan
  çerezleri yüklemez
- Analytics gerekirse Plausible veya self-hosted Matomo. Google Analytics ekleme
- Form spam koruması: honeypot + rate limit. reCAPTCHA yerine Cloudflare Turnstile
- İletişim formu minimum veri toplar: ad, e-posta/telefon, kısa konu.
  Dosya yükleme veya olay anlatımı alanı **ekleme** — vekâlet öncesi sır kapsamı belirsizdir

---

## Kod Konvansiyonları

- TypeScript strict mode; `any` kullanma
- Server Component varsayılan; `"use client"` sadece gerçekten gerekiyorsa
- İçerik `content/` altında MDX veya JSON — component içine hardcode etme
- Tailwind utility class; ayrı CSS dosyası açma
- i18n: `next-intl`, çeviriler `messages/tr.json` ve `messages/en.json`
- Görseller `next/image` ile; tüm görsellerde anlamlı `alt`
- Harici JS kütüphanesi eklemeden önce sor — bağımlılık sayısını düşük tut

## Erişilebilirlik ve Performans

- WCAG 2.1 AA: kontrast ≥ 4.5:1, tam klavye navigasyonu, görünür focus ring
- Semantik HTML: `<nav>`, `<main>`, `<article>`, doğru heading hiyerarşisi
- LCP < 2.5s, CLS < 0.1

## Komutlar

```bash
npm run dev
npm run build      # commit öncesi çalıştır
npm run lint
npm run typecheck
```

---

## Çalışma Kuralları

1. **Önce tasarım, sonra içerik.** Tasarım onaylanmadan gerçek metin/veri ekleme.
   Bu aşamada lorem ipsum ve gri placeholder box kullan.
2. **Kod yazmadan önce plan sun, onay bekle.** Plan mode varsayılan çalışma şeklidir.
3. **Karar noktalarında sor, varsayma.** Renk, tipografi, hero yaklaşımı, kart
   düzeni, dil desteği gibi konularda seçenekleri sun ve bekle. Tek başına
   estetik karar verme.
4. İçerik metni üretirken yasak kelime listesini her seferinde kontrol et.
5. Bir bölüm eklemek yönetmelik açısından şüpheliyse **ekleme ve sor.**
6. `npm run build` ve `npm run typecheck` geçmeden commit önerme.
7. Her onaylanan adımdan sonra commit at.
