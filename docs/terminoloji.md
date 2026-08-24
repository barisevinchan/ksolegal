# Terminoloji — Faaliyet Alanları

Kaynak: `kaynak/icerik/www.kso.av.tr tasarım.pdf` → "PRACTICE AREAS".

**İngilizce sütun müşterinin kendi metnidir ve değiştirilmemiştir.** Tek
düzeltme, PDF çıkarımında bozulan `tax` kelimesidir (13. alanda 7 yerde
`ta` olarak çıkmıştı).

**Türkçe sütun taslak çeviridir ve müşteri onayı beklemektedir.** Bu dosya
onay içindir: müşteri iki dili yan yana görüp doğrudan
`content/faaliyet-alanlari.json` üzerinden düzeltme isteyebilir.

Kapsam: 13 başlık, 26 Overview paragrafı, 122 Core Services maddesi.

---

## 1. Başlıklar

| # | EN | TR | Slug (TR / EN) |
|---|---|---|---|
| 1 | Corporate and Commercial Law | Şirketler ve Ticaret Hukuku | `sirketler-ve-ticaret-hukuku`<br>`corporate-and-commercial-law` |
| 2 | International Trade, Customs and Sanctions | Uluslararası Ticaret, Gümrük ve Yaptırımlar | `uluslararasi-ticaret-gumruk-ve-yaptirimlar`<br>`international-trade-customs-and-sanctions` |
| 3 | Banking, Finance and Capital Markets | Bankacılık, Finans ve Sermaye Piyasaları | `bankacilik-finans-ve-sermaye-piyasalari`<br>`banking-finance-and-capital-markets` |
| 4 | Dispute Resolution, Arbitration and Mediation | Uyuşmazlık Çözümü, Tahkim ve Arabuluculuk | `uyusmazlik-cozumu-tahkim-ve-arabuluculuk`<br>`dispute-resolution-arbitration-and-mediation` |
| 5 | Restructuring, Bankruptcy and Insolvency | Yeniden Yapılandırma, Konkordato ve İflas | `yeniden-yapilandirma-konkordato-ve-iflas`<br>`restructuring-bankruptcy-and-insolvency` |
| 6 | Employment and Labor Law | İş Hukuku | `is-hukuku`<br>`employment-and-labor-law` |
| 7 | Competition, Regulation and Compliance | Rekabet, Düzenleme ve Uyum | `rekabet-duzenleme-ve-uyum`<br>`competition-regulation-and-compliance` |
| 8 | White-Collar Crime and Internal Investigations | Beyaz Yaka Suçları ve İç Soruşturmalar | `beyaz-yaka-suclari-ve-ic-sorusturmalar`<br>`white-collar-crime-and-internal-investigations` |
| 9 | Data Protection, IT and Technology Law | Kişisel Verilerin Korunması, Bilişim ve Teknoloji Hukuku | `kisisel-verilerin-korunmasi-ve-teknoloji-hukuku`<br>`data-protection-it-and-technology-law` |
| 10 | Intellectual Property Law | Fikri Mülkiyet Hukuku | `fikri-mulkiyet-hukuku`<br>`intellectual-property-law` |
| 11 | Real Estate and Construction Law | Gayrimenkul ve İnşaat Hukuku | `gayrimenkul-ve-insaat-hukuku`<br>`real-estate-and-construction-law` |
| 12 | Mergers and Acquisitions | Birleşme ve Devralmalar | `birlesme-ve-devralmalar`<br>`mergers-and-acquisitions` |
| 13 | Tax and Administrative Law | Vergi ve İdare Hukuku | `vergi-ve-idare-hukuku`<br>`tax-and-administrative-law` |

### Başlıklarda karar gerektiren iki nokta

**5 — "Insolvency".** Türk hukukunda "insolvency" ayrı bir rejim değildir;
İcra ve İflas Kanunu konkordato/iflas ikilisiyle çalışır ve müşterinin
kendi Core Services listesi konkordatoyu adıyla anmaktadır ("concordat and
bankruptcy proceedings"). Birebir alternatif: *Yeniden Yapılandırma, İflas
ve Aciz Hâli*.

**6 — "Employment and Labor".** İngilizcedeki iki terim Türkçede tek çatı
terime (*İş Hukuku*) denk gelir. Başlıkta bulunmayan bir kavramı
eklememek için sade biçim tercih edilmiştir. Alternatif: *İş ve Sosyal
Güvenlik Hukuku* — Core Services listesinde sosyal güvenlik maddesi vardır
ama başlıkta geçmez.

---

## 2. Kritik terim tercihleri

Aşağıdaki karşılıklar tüm alanlarda tutarlı kullanılmıştır. Bir tercihin
değişmesi gerekiyorsa değişiklik `content/faaliyet-alanlari.json` içinde
yapılır; kod değişmez.

| EN | TR | Not |
|---|---|---|
| corporate governance | kurumsal yönetim | |
| directors' duties | yönetim kurulu üyelerinin yükümlülükleri | TTK terminolojisi |
| related-party transactions | ilişkili taraf işlemleri | |
| corporate housekeeping | şirket kayıtlarının düzenli tutulması | Yerleşik Türkçe karşılığı yok; açıklayıcı çeviri |
| corporate secretarial | şirket sekretaryası | |
| framework agreements | çerçeve sözleşmeler | |
| Incoterms | Incoterms | Çevrilmez |
| title, risk transfer | mülkiyet, hasarın geçişi | TBK terminolojisi |
| restricted parties | kısıtlı taraflar | |
| export controls | ihracat kontrolleri | |
| syndicated financings | sendikasyon kredileri | |
| facility agreements | kredi tahsis sözleşmeleri | |
| security package | teminat paketi | |
| share pledge / account pledge | pay rehni / hesap rehni | |
| receivables assignment | alacağın temliki | |
| intercreditor arrangements | alacaklılar arası düzenlemeler | |
| subordination structures | alacakların tâbi kılınması | Sözleşmesel tâbilik; sıra cetveli DEĞİL |
| financial covenants | finansal taahhütler | |
| events of default | temerrüt hâlleri | |
| waivers | feragatler | |
| interim injunction | ihtiyati tedbir | HMK |
| precautionary attachment | ihtiyati haciz | İİK |
| conservatory proceedings | geçici hukuki koruma | |
| arbitral awards | hakem kararları | |
| enforcing … awards | tenfiz | MÖHUK |
| concordat | konkordato | |
| clawback | tasarrufun iptali | İİK 277 vd. |
| preference | alacaklıyı kayırma | |
| foreclosure | rehnin paraya çevrilmesi | |
| distressed M&A | mali sıkıntı içindeki şirketlerin devri | |
| non-performing receivables | tahsili gecikmiş alacaklar | |
| redundancies | işten çıkarmalar | |
| collective termination | toplu işçi çıkarma | İş K. 29 |
| non-compete | rekabet yasağı | |
| merger control filings | birleşme ve devralma izin başvuruları | |
| abuse of dominance | hâkim durumun kötüye kullanılması | RKHK 6 |
| Competition Authority | Rekabet Kurumu | |
| whistleblower reports | ihbar bildirimleri | |
| embezzlement | zimmet | |
| industrial designs | tasarımlar | SMK'da "tasarım" |
| coexistence agreements | birlikte var olma sözleşmeleri | |
| unfair competition | haksız rekabet | |
| invalidity | hükümsüzlük | SMK |
| zoning | imar | |
| demergers | bölünme | TTK 159 vd. |
| escrow structures | emanet (escrow) yapıları | Terim parantezle korundu |
| warranties, indemnities | beyan ve tekeffüller, tazminat taahhütleri | |
| purchase price adjustment | satış bedeli düzeltme mekanizmaları | |
| deal perimeter | işlem kapsamı | |
| consideration mechanisms | bedel mekanizmaları | |
| due diligence | hukuki durum tespiti (due diligence) | Terim parantezle korundu |
| tax assessments | tarhiyat | VUK |
| settlement (tax) | uzlaşma | VUK ek 1 vd. |
| tenders | ihaleler | |

---

## 3. Alan alan tam metin

Her alanda `Overview` iki paragraf, ardından `Core Services` madde
listesi. Sıra PDF'teki sırayla aynıdır.

---

### 1. Corporate and Commercial Law — Şirketler ve Ticaret Hukuku

`/sirketler-ve-ticaret-hukuku` · `/corporate-and-commercial-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise companies on the legal issues that shape their daily operations, governance structures and long-term commercial relationships. Our role extends beyond documenting transactions: we help clients structure their businesses, manage contractual risk and make commercially sound decisions within an increasingly complex legal environment. | Şirketlere; günlük faaliyetlerini, yönetim yapılarını ve uzun vadeli ticari ilişkilerini şekillendiren hukuki konularda danışmanlık veriyoruz. Rolümüz işlemleri belgelemenin ötesine geçer: müvekkillerimizin giderek karmaşıklaşan bir hukuki ortamda işlerini yapılandırmalarına, sözleşmesel riski yönetmelerine ve ticari açıdan sağlam kararlar almalarına yardımcı oluyoruz. |
| We work closely with shareholders, boards, senior management and in-house legal teams on both recurring corporate matters and strategic projects. Our advice is designed to be practical, responsive and aligned with the realities of the client's business. | Pay sahipleri, yönetim kurulları, üst yönetim ve şirket içi hukuk ekipleriyle hem tekrar eden kurumsal konularda hem de stratejik projelerde yakın çalışıyoruz. Verdiğimiz danışmanlık; uygulanabilir, hızlı yanıt veren ve müvekkilin işinin gerçekleriyle uyumlu olacak şekilde kurgulanır. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on corporate governance, board structures, shareholder rights and decision-making processes | Kurumsal yönetim, yönetim kurulu yapıları, pay sahipliği hakları ve karar alma süreçleri konusunda danışmanlık |
| Drafting and negotiating commercial agreements, including supply, distribution, agency, service, procurement and framework agreements | Tedarik, dağıtım, acentelik, hizmet, satın alma ve çerçeve sözleşmeler dâhil olmak üzere ticari sözleşmelerin hazırlanması ve müzakeresi |
| Structuring joint ventures, strategic alliances, shareholder arrangements and long-term commercial partnerships | Ortak girişimlerin, stratejik iş birliklerinin, pay sahipliği düzenlemelerinin ve uzun vadeli ticari ortaklıkların yapılandırılması |
| Supporting company incorporations, branch establishments, capital increases and reductions, reorganizations and corporate housekeeping | Şirket kuruluşları, şube açılışları, sermaye artırım ve azaltımları, yeniden yapılandırmalar ve şirket kayıtlarının düzenli tutulması süreçlerinin desteklenmesi |
| Advising on directors' duties, shareholder conflicts, related-party transactions and corporate authority matters | Yönetim kurulu üyelerinin yükümlülükleri, pay sahipleri arasındaki uyuşmazlıklar, ilişkili taraf işlemleri ve şirketi temsil yetkisine ilişkin konularda danışmanlık |
| Reviewing and restructuring contractual frameworks to improve risk allocation and operational efficiency | Risk dağılımını ve operasyonel verimliliği iyileştirmek üzere sözleşme yapılarının gözden geçirilmesi ve yeniden kurgulanması |
| Supporting clients with ongoing corporate secretarial and statutory compliance requirements | Süreklilik arz eden şirket sekretaryası ve yasal uyum yükümlülüklerinde destek |

---

### 2. International Trade, Customs and Sanctions — Uluslararası Ticaret, Gümrük ve Yaptırımlar

`/uluslararasi-ticaret-gumruk-ve-yaptirimlar` · `/international-trade-customs-and-sanctions`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise companies engaged in cross-border business on international trade structures, customs rules and sanctions-related risks. Our role is to help clients execute transactions efficiently while managing regulatory, contractual and enforcement exposure across jurisdictions. | Sınır ötesi faaliyet gösteren şirketlere uluslararası ticaret yapıları, gümrük kuralları ve yaptırım kaynaklı riskler konusunda danışmanlık veriyoruz. Rolümüz, müvekkillerin işlemlerini verimli biçimde gerçekleştirmesine yardımcı olurken farklı ülkelerdeki düzenleyici, sözleşmesel ve icra kaynaklı maruziyeti yönetmektir. |
| We work with exporters, importers, manufacturers, distributors and international trading businesses on both transactional and regulatory matters. | İhracatçılar, ithalatçılar, üreticiler, dağıtıcılar ve uluslararası ticaret şirketleriyle hem işlem hem de mevzuat konularında çalışıyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on international sale, distribution, agency and supply arrangements | Uluslararası satış, dağıtım, acentelik ve tedarik düzenlemeleri konusunda danışmanlık |
| Drafting and negotiating cross-border commercial agreements | Sınır ötesi ticari sözleşmelerin hazırlanması ve müzakeresi |
| Advising on Incoterms, delivery structures, title, risk transfer and payment mechanisms | Incoterms, teslim yapıları, mülkiyet, hasarın geçişi ve ödeme mekanizmaları konusunda danışmanlık |
| Navigating customs, import and export regulations | Gümrük, ithalat ve ihracat mevzuatının uygulanması |
| Advising on sanctions, restricted parties and trade controls | Yaptırımlar, kısıtlı taraflar ve ticaret kontrolleri konusunda danışmanlık |
| Conducting sanctions and counterparty risk assessments | Yaptırım ve karşı taraf risk değerlendirmelerinin yürütülmesi |
| Advising on export controls and restricted goods | İhracat kontrolleri ve kısıtlı mallar konusunda danışmanlık |
| Representing clients in customs and trade-related disputes | Gümrük ve ticaretle ilgili uyuşmazlıklarda müvekkillerin temsili |
| Supporting cross-border payment, documentation and enforcement structures | Sınır ötesi ödeme, belgelendirme ve icra yapılarının desteklenmesi |
| Coordinating international trade matters involving multiple jurisdictions | Birden fazla ülkeyi ilgilendiren uluslararası ticaret işlerinin koordinasyonu |

---

### 3. Banking, Finance and Capital Markets — Bankacılık, Finans ve Sermaye Piyasaları

`/bankacilik-finans-ve-sermaye-piyasalari` · `/banking-finance-and-capital-markets`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise banks, financial institutions, corporates, sponsors and investors on financing transactions, security structures and financial regulatory matters. Our work is centered on creating legally robust and commercially workable structures that reflect the allocation of risk agreed between lenders, borrowers and other stakeholders. | Bankalara, finansal kuruluşlara, şirketlere, sponsorlara ve yatırımcılara finansman işlemleri, teminat yapıları ve finansal mevzuat konularında danışmanlık veriyoruz. Çalışmamızın merkezinde; kredi verenler, kredi alanlar ve diğer paydaşlar arasında kararlaştırılan risk dağılımını yansıtan, hukuken sağlam ve ticari olarak uygulanabilir yapılar kurmak yer alır. |
| We support clients from structuring and term sheet stage through negotiation, execution, security perfection and restructuring. We also advise on the legal implications of changing financing conditions, covenant pressure and distressed situations. | Müvekkillerimize yapılandırma ve ön protokol aşamasından başlayarak müzakere, imza, teminatların kurulması ve yeniden yapılandırma süreçlerinde destek oluyoruz. Ayrıca değişen finansman koşullarının, taahhüt baskısının ve mali sıkıntı hâllerinin hukuki sonuçları konusunda danışmanlık veriyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on bilateral, syndicated, acquisition, working capital and structured financings | İkili, sendikasyon, satın alma, işletme sermayesi ve yapılandırılmış finansmanlar konusunda danışmanlık |
| Drafting and negotiating facility agreements, loan agreements, guarantees and security documentation | Kredi tahsis sözleşmelerinin, kredi sözleşmelerinin, garantilerin ve teminat belgelerinin hazırlanması ve müzakeresi |
| Structuring mortgages, share pledges, account pledges, receivables assignments and other security packages | İpotek, pay rehni, hesap rehni, alacağın temliki ve diğer teminat paketlerinin yapılandırılması |
| Advising on intercreditor arrangements, subordination structures and creditor priority | Alacaklılar arası düzenlemeler, alacakların tâbi kılınması ve alacaklı önceliği konusunda danışmanlık |
| Supporting project finance, refinancing, leveraged finance and debt restructuring transactions | Proje finansmanı, yeniden finansman, kaldıraçlı finansman ve borç yeniden yapılandırma işlemlerinin desteklenmesi |
| Advising on financial covenants, events of default, waivers, amendments and enforcement rights | Finansal taahhütler, temerrüt hâlleri, feragatler, tadiller ve icra hakları konusunda danışmanlık |
| Navigating banking, capital markets and financial regulatory requirements | Bankacılık, sermaye piyasaları ve finansal mevzuat yükümlülüklerinin uygulanması |
| Advising issuers, investors and financial institutions on capital markets transactions and related documentation | İhraççılara, yatırımcılara ve finansal kuruluşlara sermaye piyasası işlemleri ve ilgili belgeler konusunda danışmanlık |

---

### 4. Dispute Resolution, Arbitration and Mediation — Uyuşmazlık Çözümü, Tahkim ve Arabuluculuk

`/uyusmazlik-cozumu-tahkim-ve-arabuluculuk` · `/dispute-resolution-arbitration-and-mediation`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We represent clients in complex commercial disputes where legal strategy, business continuity and reputational considerations must be managed together. We assess disputes at an early stage, identify the client's commercial objectives and develop a strategy focused on achieving an efficient and enforceable outcome. | Hukuki stratejinin, iş sürekliliğinin ve itibara ilişkin değerlendirmelerin birlikte yönetilmesi gereken karmaşık ticari uyuşmazlıklarda müvekkillerimizi temsil ediyoruz. Uyuşmazlıkları erken aşamada değerlendiriyor, müvekkilin ticari hedeflerini belirliyor ve verimli ve icra edilebilir bir sonuca odaklanan bir strateji geliştiriyoruz. |
| Our practice covers litigation, domestic and international arbitration, mediation and negotiated settlement processes. We view dispute resolution as a broader strategic exercise rather than a purely procedural one, and regularly advise clients on whether a matter should be litigated, arbitrated, mediated or resolved through commercial negotiation. | Çalışma alanımız dava, yerel ve uluslararası tahkim, arabuluculuk ve müzakereyle sulh süreçlerini kapsar. Uyuşmazlık çözümünü yalnızca usule ilişkin bir iş değil, daha geniş bir stratejik çalışma olarak görüyor ve bir işin dava mı, tahkim mi, arabuluculuk mu yoksa ticari müzakere yoluyla mı çözülmesi gerektiği konusunda müvekkillerimize düzenli olarak danışmanlık veriyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Representing clients in commercial, corporate, contractual, shareholder and investment-related disputes | Ticari, kurumsal, sözleşmesel, pay sahipliğine ve yatırıma ilişkin uyuşmazlıklarda müvekkillerin temsili |
| Acting in domestic and international arbitration proceedings | Yerel ve uluslararası tahkim yargılamalarında görev alınması |
| Representing clients in mandatory and voluntary mediation processes | Zorunlu ve ihtiyari arabuluculuk süreçlerinde müvekkillerin temsili |
| Advising on mediation strategy, settlement parameters and negotiated resolution structures | Arabuluculuk stratejisi, sulh parametreleri ve müzakereyle çözüm yapıları konusunda danışmanlık |
| Managing pre-litigation risk assessments and dispute avoidance strategies | Dava öncesi risk değerlendirmelerinin ve uyuşmazlıktan kaçınma stratejilerinin yürütülmesi |
| Representing clients in interim injunction, precautionary attachment and other conservatory proceedings | İhtiyati tedbir, ihtiyati haciz ve diğer geçici hukuki koruma taleplerinde müvekkillerin temsili |
| Advising on enforcement strategy and recovery options | İcra stratejisi ve tahsilat seçenekleri konusunda danışmanlık |
| Enforcing and challenging domestic and foreign court judgments and arbitral awards | Yerli ve yabancı mahkeme kararları ile hakem kararlarının tenfizi ve bunlara itiraz edilmesi |
| Supporting clients in settlement negotiations and drafting settlement agreements | Sulh müzakerelerinde destek ve sulh sözleşmelerinin hazırlanması |
| Coordinating multi-jurisdictional disputes with foreign counsel and technical advisers | Birden fazla ülkeyi ilgilendiren uyuşmazlıkların yabancı hukukçular ve teknik danışmanlarla koordinasyonu |

---

### 5. Restructuring, Bankruptcy and Insolvency — Yeniden Yapılandırma, Konkordato ve İflas

`/yeniden-yapilandirma-konkordato-ve-iflas` · `/restructuring-bankruptcy-and-insolvency`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise creditors, debtors, financial institutions, investors and shareholders in financially distressed situations. These matters often require rapid legal analysis, careful stakeholder management and a clear understanding of both enforcement options and restructuring alternatives. | Mali sıkıntı hâllerinde alacaklılara, borçlulara, finansal kuruluşlara, yatırımcılara ve pay sahiplerine danışmanlık veriyoruz. Bu işler çoğu zaman hızlı bir hukuki analiz, paydaşların dikkatle yönetilmesi ve hem icra seçeneklerinin hem de yeniden yapılandırma alternatiflerinin net biçimde kavranmasını gerektirir. |
| Our objective is to preserve value, protect legal rights and identify solutions that remain commercially viable under distressed conditions. We advise clients at both the preventive stage and throughout formal restructuring, concordat, insolvency and enforcement proceedings. | Amacımız değeri korumak, hukuki hakları güvence altına almak ve mali sıkıntı koşullarında ticari olarak uygulanabilir kalan çözümler bulmaktır. Müvekkillerimize hem önleyici aşamada hem de resmî yeniden yapılandırma, konkordato, iflas ve icra süreçlerinin tamamında danışmanlık veriyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on financial restructurings, debt rescheduling and negotiated workouts | Finansal yeniden yapılandırmalar, borçların yeniden vadelendirilmesi ve müzakereyle borç düzenlemeleri konusunda danışmanlık |
| Structuring creditor arrangements, security packages and recovery strategies | Alacaklı düzenlemelerinin, teminat paketlerinin ve tahsilat stratejilerinin yapılandırılması |
| Representing creditors and debtors in concordat and bankruptcy proceedings | Konkordato ve iflas süreçlerinde alacaklıların ve borçluların temsili |
| Advising on insolvency risk, directors' duties and potential liability exposure | Aciz riski, yönetim kurulu üyelerinin yükümlülükleri ve olası sorumluluk maruziyeti konusunda danışmanlık |
| Reviewing transactions for clawback, preference and insolvency-related risks | İşlemlerin tasarrufun iptali, alacaklıyı kayırma ve aciz kaynaklı riskler bakımından incelenmesi |
| Managing enforcement, attachment and foreclosure proceedings | İcra, haciz ve rehnin paraya çevrilmesi süreçlerinin yürütülmesi |
| Advising secured creditors on enforcement and realization of collateral | Teminatlı alacaklılara icra ve teminatın paraya çevrilmesi konusunda danışmanlık |
| Supporting distressed M&A and acquisition of distressed assets | Mali sıkıntı içindeki şirketlerin devri ve sorunlu varlıkların satın alınması süreçlerinin desteklenmesi |
| Advising on creditor coordination and multi-party restructuring negotiations | Alacaklılar arası koordinasyon ve çok taraflı yeniden yapılandırma müzakereleri konusunda danışmanlık |
| Developing legal strategies for non-performing and problem receivables | Tahsili gecikmiş ve sorunlu alacaklar için hukuki stratejilerin geliştirilmesi |

---

### 6. Employment and Labor Law — İş Hukuku

`/is-hukuku` · `/employment-and-labor-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise employers on the full range of employment and labor law issues affecting workforce management, organizational change and daily operations. Our approach is designed to help clients maintain legal compliance while preserving the flexibility required to manage their businesses effectively. | İşverenlere; işgücü yönetimini, örgütsel değişimi ve günlük faaliyetleri etkileyen iş hukuku konularının tamamında danışmanlık veriyoruz. Yaklaşımımız, müvekkillerin hukuka uygunluğu korurken işlerini etkin biçimde yönetmek için ihtiyaç duydukları esnekliği de sürdürmelerine yardımcı olmak üzere kurgulanmıştır. |
| We place particular emphasis on preventive legal advice, clear documentation and early risk management. We also represent employers in contentious matters and support management teams during restructurings, investigations and sensitive employment decisions. | Önleyici hukuki danışmanlığa, açık belgelendirmeye ve erken risk yönetimine özel önem veriyoruz. Ayrıca uyuşmazlık süreçlerinde işverenleri temsil ediyor; yeniden yapılandırmalar, soruşturmalar ve hassas istihdam kararları sırasında yönetim ekiplerine destek oluyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on employment contracts, workplace policies and internal procedures | İş sözleşmeleri, işyeri politikaları ve iç prosedürler konusunda danışmanlık |
| Structuring hiring, probation, promotion, transfer and termination processes | İşe alım, deneme süresi, terfi, nakil ve fesih süreçlerinin yapılandırılması |
| Advising on executive employment, bonus arrangements, non-compete and confidentiality provisions | Üst düzey yönetici istihdamı, prim düzenlemeleri, rekabet yasağı ve gizlilik hükümleri konusunda danışmanlık |
| Supporting workforce restructurings, redundancies and collective termination processes | İşgücü yeniden yapılandırmaları, işten çıkarmalar ve toplu işçi çıkarma süreçlerinin desteklenmesi |
| Representing employers in employment litigation and mandatory mediation | İş davalarında ve zorunlu arabuluculukta işverenlerin temsili |
| Advising on overtime, annual leave, compensation, benefits and workplace practices | Fazla çalışma, yıllık izin, ücret, yan haklar ve işyeri uygulamaları konusunda danışmanlık |
| Supporting internal disciplinary and misconduct investigations | İç disiplin ve suistimal soruşturmalarının desteklenmesi |
| Advising on social security compliance and employer obligations | Sosyal güvenlik uyumu ve işveren yükümlülükleri konusunda danışmanlık |
| Assisting with work and residence permit matters for foreign employees | Yabancı çalışanların çalışma ve oturma izni işlemlerinde destek |
| Reviewing employment practices as part of corporate transactions and legal due diligence | Şirket işlemleri ve hukuki durum tespiti kapsamında istihdam uygulamalarının incelenmesi |

---

### 7. Competition, Regulation and Compliance — Rekabet, Düzenleme ve Uyum

`/rekabet-duzenleme-ve-uyum` · `/competition-regulation-and-compliance`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We help businesses navigate competition rules, sector-specific regulation and broader corporate compliance obligations without disrupting legitimate commercial activity. Our work focuses on identifying regulatory exposure early, designing workable compliance frameworks and supporting clients when regulatory scrutiny arises. | İşletmelerin rekabet kurallarını, sektöre özgü düzenlemeleri ve daha geniş kurumsal uyum yükümlülüklerini meşru ticari faaliyetlerini aksatmadan yürütmelerine yardımcı oluyoruz. Çalışmamız; düzenleyici maruziyetin erken tespit edilmesine, uygulanabilir uyum çerçevelerinin kurgulanmasına ve düzenleyici bir inceleme gündeme geldiğinde müvekkillerin desteklenmesine odaklanır. |
| We advise on both transactional and operational matters, including merger control, commercial arrangements, internal policies and regulatory investigations. | Birleşme ve devralma kontrolü, ticari düzenlemeler, iç politikalar ve düzenleyici soruşturmalar dâhil olmak üzere hem işlem hem de operasyon konularında danışmanlık veriyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on competition law compliance, restrictive agreements and market conduct | Rekabet hukukuna uyum, rekabeti sınırlayıcı anlaşmalar ve piyasa davranışları konusunda danışmanlık |
| Reviewing distribution, supply, agency and exclusivity arrangements from a competition law perspective | Dağıtım, tedarik, acentelik ve münhasırlık düzenlemelerinin rekabet hukuku açısından incelenmesi |
| Advising on abuse of dominance and sensitive commercial practices | Hâkim durumun kötüye kullanılması ve hassas ticari uygulamalar konusunda danışmanlık |
| Preparing and managing merger control filings and regulatory approvals | Birleşme ve devralma izin başvurularının ve düzenleyici onay süreçlerinin hazırlanması ve yürütülmesi |
| Representing clients in Competition Authority investigations and proceedings | Rekabet Kurumu soruşturma ve süreçlerinde müvekkillerin temsili |
| Designing and implementing competition and regulatory compliance programs | Rekabet ve mevzuat uyum programlarının tasarlanması ve uygulanması |
| Conducting compliance reviews, training and risk assessments | Uyum incelemelerinin, eğitimlerin ve risk değerlendirmelerinin yürütülmesi |
| Advising on sector-specific regulatory requirements | Sektöre özgü mevzuat yükümlülükleri konusunda danışmanlık |
| Supporting internal compliance investigations and remediation projects | İç uyum soruşturmalarının ve düzeltici çalışmaların desteklenmesi |
| Advising boards and senior management on regulatory risk and governance | Yönetim kurullarına ve üst yönetime düzenleyici risk ve yönetişim konusunda danışmanlık |

---

### 8. White-Collar Crime and Internal Investigations — Beyaz Yaka Suçları ve İç Soruşturmalar

`/beyaz-yaka-suclari-ve-ic-sorusturmalar` · `/white-collar-crime-and-internal-investigations`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise companies, boards and senior executives on sensitive allegations involving fraud, corruption, misconduct and potential criminal exposure. These matters require discretion, procedural discipline and careful coordination between legal, regulatory, employment and reputational considerations. | Şirketlere, yönetim kurullarına ve üst düzey yöneticilere; dolandırıcılık, yolsuzluk, suistimal ve olası cezai sorumluluk içeren hassas iddialar konusunda danışmanlık veriyoruz. Bu işler gizlilik, usul disiplini ve hukuki, düzenleyici, istihdama ilişkin ve itibara dair değerlendirmelerin dikkatle koordine edilmesini gerektirir. |
| We conduct internal investigations, assess potential liability and support clients in responding to authorities, whistleblower reports and internal compliance concerns. | İç soruşturmalar yürütüyor, olası sorumluluğu değerlendiriyor ve müvekkillerimize kamu makamlarına, ihbar bildirimlerine ve şirket içi uyum endişelerine yanıt verilmesinde destek oluyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Conducting and coordinating internal investigations | İç soruşturmaların yürütülmesi ve koordinasyonu |
| Advising on fraud, bribery, corruption, embezzlement and corporate misconduct allegations | Dolandırıcılık, rüşvet, yolsuzluk, zimmet ve şirket içi suistimal iddiaları konusunda danışmanlık |
| Representing companies and executives in criminal investigations and proceedings | Ceza soruşturma ve kovuşturmalarında şirketlerin ve yöneticilerin temsili |
| Advising on whistleblower reports and internal escalation procedures | İhbar bildirimleri ve şirket içi bildirim prosedürleri konusunda danışmanlık |
| Managing evidence preservation, interview protocols and investigation documentation | Delillerin korunması, görüşme protokolleri ve soruşturma belgelendirmesinin yönetilmesi |
| Assessing potential corporate and individual liability | Şirketin ve kişilerin olası sorumluluğunun değerlendirilmesi |
| Advising boards and management on investigation findings and remediation | Yönetim kurullarına ve yönetime soruşturma bulguları ve düzeltici adımlar konusunda danışmanlık |
| Coordinating employment, compliance and regulatory aspects of investigations | Soruşturmaların istihdam, uyum ve mevzuat boyutlarının koordinasyonu |
| Supporting clients in interactions with law enforcement and regulatory authorities | Kolluk ve düzenleyici makamlarla yürütülen ilişkilerde müvekkillere destek |
| Advising on preventive controls and post-investigation compliance enhancements | Önleyici kontroller ve soruşturma sonrası uyum iyileştirmeleri konusunda danışmanlık |

---

### 9. Data Protection, IT and Technology Law — Kişisel Verilerin Korunması, Bilişim ve Teknoloji Hukuku

`/kisisel-verilerin-korunmasi-ve-teknoloji-hukuku` · `/data-protection-it-and-technology-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise businesses on legal issues arising from data-driven operations, digital transformation and technology contracting. Our work is designed to support innovation while ensuring that data use, technology procurement and digital business models remain compliant and contractually protected. | İşletmelere; veriye dayalı faaliyetlerden, dijital dönüşümden ve teknoloji sözleşmelerinden doğan hukuki konularda danışmanlık veriyoruz. Çalışmamız, veri kullanımının, teknoloji tedarikinin ve dijital iş modellerinin hukuka uygun ve sözleşmeyle korunmuş kalmasını sağlarken yeniliği desteklemek üzere kurgulanmıştır. |
| We work with both traditional businesses and technology-focused companies on privacy, software, digital platforms, outsourcing and emerging technology matters. | Hem geleneksel işletmelerle hem de teknoloji odaklı şirketlerle; veri gizliliği, yazılım, dijital platformlar, dış kaynak kullanımı ve gelişen teknoloji konularında çalışıyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on Turkish data protection legislation, KVKK and GDPR-related compliance | Türk veri koruma mevzuatı, KVKK ve GDPR uyumu konusunda danışmanlık |
| Structuring privacy governance, policies and internal data protection frameworks | Veri gizliliği yönetişiminin, politikaların ve şirket içi veri koruma çerçevelerinin yapılandırılması |
| Advising on international data transfers and data processing arrangements | Yurt dışına veri aktarımı ve veri işleme düzenlemeleri konusunda danışmanlık |
| Drafting and negotiating software, SaaS, cloud, licensing and IT services agreements | Yazılım, SaaS, bulut, lisans ve bilişim hizmetleri sözleşmelerinin hazırlanması ve müzakeresi |
| Advising on outsourcing, technology procurement and digital transformation projects | Dış kaynak kullanımı, teknoloji tedariki ve dijital dönüşüm projeleri konusunda danışmanlık |
| Supporting e-commerce, digital platforms and online business models | E-ticaret, dijital platformlar ve çevrim içi iş modellerinin desteklenmesi |
| Advising on data breaches, cyber incidents and regulatory notifications | Veri ihlalleri, siber olaylar ve mevzuat kapsamındaki bildirimler konusunda danışmanlık |
| Reviewing vendor and processor arrangements from a privacy and technology risk perspective | Tedarikçi ve veri işleyen düzenlemelerinin gizlilik ve teknoloji riski açısından incelenmesi |
| Advising on artificial intelligence and emerging technology-related legal issues | Yapay zekâ ve gelişen teknolojilere ilişkin hukuki konularda danışmanlık |
| Supporting technology-related legal due diligence and transaction reviews | Teknolojiye ilişkin hukuki durum tespiti ve işlem incelemelerinin desteklenmesi |

---

### 10. Intellectual Property Law — Fikri Mülkiyet Hukuku

`/fikri-mulkiyet-hukuku` · `/intellectual-property-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise clients on the protection, commercialization and enforcement of intellectual property rights that are central to brand value, innovation and competitive advantage. Our approach connects IP strategy with the client's broader commercial objectives. | Müvekkillerimize; marka değeri, yenilik ve rekabet üstünlüğü bakımından merkezî önemde olan fikri mülkiyet haklarının korunması, ticarileştirilmesi ve ihlallere karşı takibi konusunda danışmanlık veriyoruz. Yaklaşımımız, fikri mülkiyet stratejisini müvekkilin daha geniş ticari hedefleriyle ilişkilendirir. |
| We support clients throughout the lifecycle of intellectual property assets, from ownership and registration to licensing, exploitation and enforcement. | Fikri mülkiyet varlıklarının yaşam döngüsü boyunca; mülkiyet ve tescilden lisanslama, kullanım ve hakların takibine kadar müvekkillerimize destek oluyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on trademarks, industrial designs, copyrights and related intellectual property rights | Markalar, tasarımlar, telif hakları ve bunlarla bağlantılı fikri mülkiyet hakları konusunda danışmanlık |
| Managing trademark and design protection strategies and registration processes | Marka ve tasarım koruma stratejilerinin ve tescil süreçlerinin yürütülmesi |
| Drafting and negotiating licensing, assignment, coexistence and commercialization agreements | Lisans, devir, birlikte var olma ve ticarileştirme sözleşmelerinin hazırlanması ve müzakeresi |
| Advising on IP ownership in employment, development and technology arrangements | İstihdam, geliştirme ve teknoloji düzenlemelerinde fikri mülkiyetin kime ait olacağı konusunda danışmanlık |
| Representing clients in infringement, invalidity and unfair competition disputes | Hak ihlali, hükümsüzlük ve haksız rekabet uyuşmazlıklarında müvekkillerin temsili |
| Advising on brand protection and unauthorized use | Marka koruması ve izinsiz kullanım konusunda danışmanlık |
| Supporting IP portfolio reviews and legal due diligence | Fikri mülkiyet portföyü incelemelerinin ve hukuki durum tespitinin desteklenmesi |
| Advising on franchising, merchandising and rights-based commercial models | Franchise, ürünleştirme ve hak temelli ticari modeller konusunda danışmanlık |
| Structuring intellectual property elements of M&A and investment transactions | Birleşme, devralma ve yatırım işlemlerinin fikri mülkiyet boyutunun yapılandırılması |

---

### 11. Real Estate and Construction Law — Gayrimenkul ve İnşaat Hukuku

`/gayrimenkul-ve-insaat-hukuku` · `/real-estate-and-construction-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise investors, developers, contractors, landlords, tenants and operators on real estate investments and construction projects throughout their lifecycle. Our work focuses on legal certainty, effective allocation of project risk and commercially workable documentation. | Yatırımcılara, geliştiricilere, yüklenicilere, kiraya verenlere, kiracılara ve işletmecilere; gayrimenkul yatırımları ve inşaat projelerinin yaşam döngüsü boyunca danışmanlık veriyoruz. Çalışmamız hukuki belirlilik, proje riskinin etkin dağılımı ve ticari olarak uygulanabilir belgelendirme üzerine odaklanır. |
| We combine transactional, regulatory and contentious experience to support clients from acquisition and development through construction, operation, leasing and exit. | Müvekkillerimizi edinim ve geliştirmeden inşaat, işletme, kiralama ve çıkış aşamalarına kadar desteklemek üzere işlem, mevzuat ve uyuşmazlık alanlarındaki deneyimimizi birleştiriyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on real estate acquisitions, disposals and investment structures | Gayrimenkul edinimi, elden çıkarılması ve yatırım yapıları konusunda danışmanlık |
| Conducting title, zoning and project-related legal due diligence | Tapu, imar ve projeye ilişkin hukuki durum tespiti çalışmalarının yürütülmesi |
| Drafting and negotiating commercial leases and long-term occupancy arrangements | Ticari kira sözleşmelerinin ve uzun süreli kullanım düzenlemelerinin hazırlanması ve müzakeresi |
| Advising on development, construction and project management agreements | Geliştirme, inşaat ve proje yönetimi sözleşmeleri konusunda danışmanlık |
| Drafting and negotiating contractor, subcontractor and procurement arrangements | Yüklenici, alt yüklenici ve satın alma düzenlemelerinin hazırlanması ve müzakeresi |
| Advising on zoning, permits, licenses and development restrictions | İmar, izinler, ruhsatlar ve yapılaşma kısıtlamaları konusunda danışmanlık |
| Structuring real estate joint ventures and development partnerships | Gayrimenkul ortak girişimlerinin ve geliştirme ortaklıklarının yapılandırılması |
| Representing clients in construction, lease and property disputes | İnşaat, kira ve mülkiyet uyuşmazlıklarında müvekkillerin temsili |
| Advising on project delays, defects, variations and contractor claims | Proje gecikmeleri, ayıplar, iş değişiklikleri ve yüklenici talepleri konusunda danışmanlık |
| Supporting real estate aspects of financing and corporate transactions | Finansman ve şirket işlemlerinin gayrimenkul boyutunun desteklenmesi |

---

### 12. Mergers and Acquisitions — Birleşme ve Devralmalar

`/birlesme-ve-devralmalar` · `/mergers-and-acquisitions`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise buyers, sellers, investors, founders and management teams on domestic and cross-border M&A transactions across the full deal lifecycle. Our approach combines legal precision with an understanding of valuation, execution risk, negotiation dynamics and post-closing integration. | Alıcılara, satıcılara, yatırımcılara, kuruculara ve yönetim ekiplerine; yerel ve sınır ötesi birleşme ve devralma işlemlerinde işlemin tüm yaşam döngüsü boyunca danışmanlık veriyoruz. Yaklaşımımız hukuki titizliği; değerleme, işlemin gerçekleşme riski, müzakere dinamikleri ve kapanış sonrası entegrasyon kavrayışıyla birleştirir. |
| We focus on identifying issues that can materially affect the transaction, while avoiding unnecessary complexity that slows execution. From early-stage structuring to closing and post-closing implementation, we provide commercially focused support designed to protect value and facilitate decision-making. | İşlemi esaslı biçimde etkileyebilecek konuları tespit etmeye odaklanırken süreci yavaşlatan gereksiz karmaşıklıktan kaçınıyoruz. Erken aşama yapılandırmadan kapanışa ve kapanış sonrası uygulamaya kadar; değeri korumak ve karar almayı kolaylaştırmak üzere kurgulanmış, ticari odaklı destek sunuyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on share acquisitions, asset deals, mergers, demergers and strategic investments | Pay devirleri, varlık devirleri, birleşmeler, bölünmeler ve stratejik yatırımlar konusunda danışmanlık |
| Structuring transaction processes, deal perimeter, consideration mechanisms and governance arrangements | İşlem süreçlerinin, işlem kapsamının, bedel mekanizmalarının ve yönetişim düzenlemelerinin yapılandırılması |
| Conducting and coordinating legal due diligence across corporate, commercial, employment, regulatory and litigation matters | Kurumsal, ticari, istihdam, mevzuat ve dava konularını kapsayan hukuki durum tespiti çalışmalarının yürütülmesi ve koordinasyonu |
| Drafting and negotiating share purchase agreements, asset purchase agreements, shareholders' agreements and ancillary transaction documents | Pay alım sözleşmelerinin, varlık alım sözleşmelerinin, pay sahipleri sözleşmelerinin ve tamamlayıcı işlem belgelerinin hazırlanması ve müzakeresi |
| Advising on warranties, indemnities, limitations of liability, escrow structures and purchase price adjustment mechanisms | Beyan ve tekeffüller, tazminat taahhütleri, sorumluluk sınırlamaları, emanet (escrow) yapıları ve satış bedeli düzeltme mekanizmaları konusunda danışmanlık |
| Structuring minority investments, joint ventures, management participation and exit arrangements | Azınlık yatırımlarının, ortak girişimlerin, yönetim katılımının ve çıkış düzenlemelerinin yapılandırılması |
| Managing signing, closing, regulatory approvals and post-closing implementation | İmza, kapanış, düzenleyici onaylar ve kapanış sonrası uygulama süreçlerinin yürütülmesi |
| Supporting cross-border transactions involving multiple jurisdictions, advisers and stakeholders | Birden fazla ülkeyi, danışmanı ve paydaşı içeren sınır ötesi işlemlerin desteklenmesi |

---

### 13. Tax and Administrative Law — Vergi ve İdare Hukuku

`/vergi-ve-idare-hukuku` · `/tax-and-administrative-law`

#### Overview — Genel Bakış

| EN | TR |
|---|---|
| We advise businesses on tax and public law matters that directly affect transactions, operations and regulatory exposure. Our work combines preventive legal structuring with representation before administrative authorities and courts when disputes arise. | İşletmelere; işlemleri, faaliyetleri ve düzenleyici maruziyeti doğrudan etkileyen vergi ve kamu hukuku konularında danışmanlık veriyoruz. Çalışmamız, önleyici hukuki yapılandırmayı uyuşmazlık doğduğunda idari makamlar ve mahkemeler önünde temsille birleştirir. |
| We support clients in both transactional and contentious matters, particularly where commercial decisions intersect with tax, licensing, regulatory or administrative requirements. | Müvekkillerimize hem işlem hem de uyuşmazlık konularında, özellikle ticari kararların vergi, ruhsat, mevzuat veya idari yükümlülüklerle kesiştiği noktalarda destek oluyoruz. |

#### Core Services — Temel Hizmetler

| EN | TR |
|---|---|
| Advising on the tax implications of corporate and commercial transactions | Kurumsal ve ticari işlemlerin vergisel sonuçları konusunda danışmanlık |
| Reviewing transaction structures from a legal tax-risk perspective | İşlem yapılarının hukuki vergi riski açısından incelenmesi |
| Representing clients in tax audits, assessments and disputes | Vergi incelemeleri, tarhiyatlar ve uyuşmazlıklarda müvekkillerin temsili |
| Advising on tax penalties, settlement and litigation strategy | Vergi cezaları, uzlaşma ve dava stratejisi konusunda danışmanlık |
| Representing clients before tax courts and administrative courts | Vergi mahkemeleri ve idare mahkemeleri önünde müvekkillerin temsili |
| Advising on administrative permits, licenses and regulatory approvals | İdari izinler, ruhsatlar ve düzenleyici onaylar konusunda danışmanlık |
| Representing clients in administrative sanction and enforcement proceedings | İdari yaptırım ve idari icra süreçlerinde müvekkillerin temsili |
| Advising on public law implications of regulated business activities | Düzenlemeye tabi ticari faaliyetlerin kamu hukuku boyutu konusunda danışmanlık |
| Supporting clients in dealings with public authorities | Kamu makamlarıyla yürütülen ilişkilerde müvekkillere destek |
| Advising on administrative disputes arising from permits, licenses and regulatory decisions | İzinler, ruhsatlar ve düzenleyici kararlardan doğan idari uyuşmazlıklar konusunda danışmanlık |
