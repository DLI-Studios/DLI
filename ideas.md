# DLI Studios — Tasarım Kararları

## Yaklaşım 1: Purple Product Operating System

**Very Brief Intro:** DLI’yi karanlık bir oyun markası gibi değil, oyuncular ve topluluklar için işletim sistemi kuran bir ürün şirketi gibi konumlandırır. Büyük tipografi, ürün ekranları ve teknik netlik ön plandadır.

**Probability:** 0.07

## Yaklaşım 2: Midnight Launch Sequence

**Very Brief Intro:** DLI ekosistemini gece modunda çalışan bir lansman konsolu estetiğiyle sunar; derin siyah alanlar, kontrollü mor ışık ve ardışık ürün geçişleri sinematik bir ritim oluşturur.

**Probability:** 0.04

## Yaklaşım 3: Quiet Infrastructure

**Very Brief Intro:** DLI’nin görünür oyun yüzeyinden çok, onu mümkün kılan altyapıya odaklanan sessiz ve editoryal bir teknoloji dili kurar. Büyük boşluklar, ince çizgiler ve mimari anlatı öne çıkar.

**Probability:** 0.02

## Seçilen Yön: Purple Product Operating System

### Design Movement

DLI’nin mevcut **Dark UI + Purple Accent + Premium Software Aesthetic** kimliğini koruyan, post-minimalist ürün tasarımı ile editorial technology estetiğinin birleşimi. Referans duygusu Apple’ın ürün netliği, Linear’ın çalışma yüzeyi disiplini, Vercel’in teknik kontrastı ve Epic Games Launcher’ın sinematik ürün sunumundan gelir; ancak hiçbirinin marka kimliği kopyalanmaz.

### Core Principles

1. **Kimlik evrimi, yeniden icat değil:** Mor imza renk olarak kalır; yeni bir ana renk veya farklı marka dili eklenmez.
2. **Kompozisyon efektlerden güçlüdür:** Görsel ağırlık; boşluk, tipografik kontrast, ritim ve ürün ekranı yerleşimiyle kurulur. Glow, blur ve gradient yalnızca atmosferik destek olarak kullanılır.
3. **Ürün önce, oyun referansı sonra:** Launcher, Client, Core ve Connect gerçek bir yazılım ekosisteminin yüzeyleri gibi anlatılır. Minecraft/gaming dili yalnızca çevresel ve ölçülü bir katmandır.
4. **Keskin ama sakin:** Az sayıda güçlü yüzey, ince sınırlar, düşük radius, kontrollü motion ve yüksek kontrast; kalabalık kart duvarlarının yerini alır.

### Color Philosophy

Renk sistemi gece çalışan bir ürün platformunun güvenini ve teknik ciddiyetini taşır. `#08080A` ve `#0B0B10` geniş yüzeylerde sessiz bir zemin oluşturur; `#111116`, `#15151C` ve `#1A1A22` ürün panellerini birbirinden ayırır. `#7C3AED` yalnızca karar, bağlantı ve enerji noktalarında görünür; `#8B5CF6` ise hover, aktif durum ve atmosferik ışık için ikincil tondur. Beyaz ve soğuk griler bilgi hiyerarşisini taşır. Sarı, altın, amber, turuncu ve kahverengi kesinlikle kullanılmaz.

### Layout Paradigm

Sayfalar merkezi tek kolon yerine **asymmetric editorial product canvas** olarak kurulacaktır. Hero’da metin sola sabitlenirken ürün yüzeyi sağa taşar; ürün bölümlerinde tam genişlik paneller ile dar açıklama kolonları dönüşümlü yerleşir; teknoloji alanı çizgisel bir sistem haritası gibi akar. Yatay grid yalnızca içerik hizalamak için kullanılır, görünür bir kutu sistemi oluşturmaz. Mobilde bu yapı basitçe küçültülmez; içerik sırası yeniden düzenlenerek metin, ürün ekranı ve CTA önceliği korunur.

### Signature Elements

1. **Purple Signal Line:** Bölüm numaralarını, ürün bağlantılarını ve aktif durumları birbirine bağlayan ince mor çizgi.
2. **Product Surface Crop:** Ürün ekranlarının kenarları viewport’tan taşan, sinematik ve gerçek bir uygulama yüzeyi hissi veren kırpılmış kompozisyon.
3. **Quiet Orbit Grid:** Hero ve teknoloji bölümlerinde çok düşük kontrastla görünen, ince koordinat çizgilerinden oluşan yapısal doku.

### Interaction Philosophy

Etkileşimler doğrudan ve ölçülü hissettirmelidir. Butonlar basıldığında kısa bir fiziksel karşılık verir; ürün kartları morla parlamak yerine yüzey ve tipografi kontrastını değiştirir. Hover durumları kullanıcıya nereye gideceğini gösterir, dikkat çekmek için bağırmaz. Menü mobilde bir drawer olarak açılır; her sayfada açık bir kaçış yolu ve aktif bölüm görünürlüğü bulunur.

### Animation

Giriş animasyonları 180–280 ms aralığında, `transform` ve `opacity` tabanlı, ease-out karakterinde olacaktır. Hero ürün yüzeyi çok hafif bir y ekseni hareketiyle derinlik kazanır; section reveal hareketleri aşağıdan kısa bir yükseliş ve opacity geçişiyle sınırlıdır. Mor atmosferik ışık çok yavaş hareket eder ve içerik okunurluğunu etkilemez. Hover geçişleri 160 ms civarında tutulur. `prefers-reduced-motion` etkin olduğunda dekoratif hareketler kapanır; site animasyon olmadan da eksiksiz görünür.

### Typography System

Başlıklar için **Space Grotesk**; gövde, navigasyon ve arayüz metinleri için **DM Sans** kullanılacaktır. Space Grotesk 600–700 ağırlıklarında, sıkı ama nefes alan display hiyerarşisi için; DM Sans 400–600 ağırlıklarında, uzun açıklamalar ve UI etiketleri için kullanılır. H1’ler büyük, kısa ve satır aralığı sıkı; supporting text düşük kontrastlı fakat erişilebilir; eyebrow metinleri küçük harf aralığı geniş ve mor sinyal rengiyle ayrıştırılmış olacaktır.

### Brand Essence

**Positioning:** DLI Studios, oyuncuları, yaratıcıları ve toplulukları tek bir premium yazılım ekosisteminde buluşturan teknik ürünler geliştirir; farkı, oyun deneyimini yalnızca içerikle değil güçlü altyapı ve arayüzlerle kurmasıdır.

**Personality:** Teknik, kendinden emin, sinematik.

### Brand Voice

Başlıklar kısa, iddialı ve ürün merkezli; CTA’lar eylem odaklı; microcopy açıklayıcı ve sakin olmalıdır. Pazarlama klişeleri, “ultimate gaming experience” türü ifadeler ve topluluk sitesi dili kullanılmaz.

> Built for the layer between the player and the world.

> One ecosystem. Four surfaces. A better way to play.

### Wordmark & Logo

Logo, “D” ve “L” harflerinin tek bir kesintisiz geometrik izde birleştiği, sol üst köşesi açık bırakılmış monoline bir işaret olacaktır. İşaret kare bir uygulama ikonu içinde değil, yatay wordmark ile birlikte geniş nefes alan bir lockup olarak kullanılacaktır. Favicon için aynı işaretin sadeleştirilmiş mor/siyah sembolü tercih edilir; marka adı varsayılan fontla logo olarak yazılmaz.

### Signature Brand Color

**DLI Purple — `#7C3AED`**. Bu renk yalnızca vurgu değil, DLI’nin ürünler arasındaki bağlantıyı ve teknolojik enerjiyi gösteren sahiplenilebilir sinyalidir.

### Uygulama Kuralı

Her CSS, component ve page dosyasının başında bu kararların dosyaya özgü kısa bir stil notu bulunacaktır. Karar verirken şu soru korunur: **“Bu seçim DLI’nin mevcut koyu + mor + premium yazılım kimliğini güçlendiriyor mu, yoksa sulandırıyor mu?”**

## Style Decisions

Stil incelemesinden sonra kabul edilen üç netleştirme uygulanmıştır. Her büyük sayfa artık en az bir ürün işletim sistemi artefaktı taşıyor: ürün mockup’ı, sistem readout’u veya katman haritası. Purple Signal Line; section numaraları, sistem ilişkileri, aktif durumlar ve CTA yollarında dekoratif değil, navigasyon enerjisi olarak kullanılıyor. Ürün yüzeyleri de basit dikey kart dizisi yerine offset panel, metadata, durum satırı ve farklı Launcher/Client/Core/Connect UI parçalarıyla asimetrik bir ürün canvas’ına dönüştürülüyor.
