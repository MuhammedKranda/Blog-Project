# BlogPlatform Geliştirici Rehberi

Bu rehber, BlogPlatform projesinin kurulumu, geliştirilmesi ve yaygın sorunların çözümü için kapsamlı bir kılavuzdur.

## Kurulum

### Önkoşullar

- Node.js (v16+)
- npm (v7+)

### Başlangıç

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/username/blog-platform.git
   cd blog-platform
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm start
   ```

## Proje Yapısı

```
blog-platform/
├── public/               # Statik dosyalar
│   ├── index.html        # SEO meta etiketleri ve structured data burada
│   ├── manifest.json     # PWA manifest
│   └── robots.txt        # SEO için robotlar dosyası
├── src/                  # Kaynak kodları
│   ├── components/       # Yeniden kullanılabilir bileşenler
│   │   ├── Header.js     # Üst menü ve navigasyon
│   │   └── Footer.js     # Alt menü ve iletişim bilgileri
│   ├── pages/            # Sayfa bileşenleri
│   │   ├── HomePage.js           # Ana sayfa
│   │   ├── LoginPage.js          # Giriş sayfası
│   │   ├── RegisterPage.js       # Kayıt sayfası
│   │   ├── BlogPage.js           # Blog listeleme ve filtreleme
│   │   └── CreateBlogPage.js     # Blog oluşturma formu
│   ├── App.js            # Ana uygulama bileşeni ve rota yapılandırması
│   ├── index.js          # Uygulama giriş noktası
│   └── index.css         # Tailwind CSS direktifleri ve global stiller
└── tailwind.config.js    # Tailwind CSS yapılandırması
```

## Stil ve Tema

### Tailwind CSS Yapılandırması

Proje özel bir renk şeması kullanmaktadır:

- Primary: Mavi tonları
- Secondary: Mor tonları
- Font Ailesi: Inter (genel) ve Poppins (başlıklar)

`tailwind.config.js` dosyasında tanımlanmıştır:

```js
theme: {
  extend: {
    colors: {
      primary: { /* mavi tonları */ },
      secondary: { /* mor tonları */ }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
  },
}
```

## Bileşenler

### Sayfa Yapısı

Her sayfa genellikle şu yapıyı takip eder:

1. İçe aktarmalar
2. Gerekirse örnek veri 
3. Fonksiyonel bileşen
   - State yönetimi
   - Etkinlik işleyicileri
   - JSX render

### Animasyonlar

Animasyonlar için Framer Motion kullanılmaktadır. Örnek:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* içerik */}
</motion.div>
```

## SEO Optimizasyonu

Proje SEO için şunları içerir:

1. **Meta Etiketleri**: `public/index.html` içinde
2. **Open Graph/Twitter Kartları**: Sosyal medya paylaşımları için
3. **Yapılandırılmış Veri (JSON-LD)**: Google için zengin sonuç verileri
4. **Semantik HTML**: Doğru başlık hiyerarşisi ve etiketler
5. **robots.txt**: Tarama yönergeleri

## Yaygın Sorunlar ve Çözümleri

### Tailwind CSS Sorunları

Tailwind CSS ile ilgili sorunlar yaşarsanız:

1. Bağımlılıkları düzeltmek için hazır script çalıştırın:

```bash
npm run fix-tailwind
```

2. CSS yüklenmiyor veya doğru uygulanmıyorsa:
   - `src/index.css` dosyasının aşağıdaki direktifleri içerdiğinden emin olun:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

### React Bağımlılık Uyumluluk Sorunları

1. **Versiyon uyumsuzlukları**:
   - Projedeki React sürümleri stabil olanlarla eşleşmelidir (ör. 18.2.0)
   - Diğer kütüphaneler React sürümünüzle uyumlu olmalıdır

2. **Çözüm**:
   - `package.json` dosyasını güncelleyin
   - `npm install` komutunu çalıştırın
   - Node modüllerini temizlemeyi deneyin:
     ```bash
     rm -rf node_modules
     npm cache clean --force
     npm install
     ```

### Tarayıcı Uyumluluk Sorunları

1. Projenin hangi tarayıcıları desteklemesi gerektiğini `package.json` dosyasındaki `browserslist` alanı belirler.

2. CSS uyumluluğu sorunları için:
   - Autoprefixer ve PostCSS doğru yapılandırılmış olmalıdır
   - Güncel olmayan tarayıcılarda görüntüleme sorunları için polyfill'ler eklenmelidir

## Dağıtım (Deployment)

### Build Oluşturma

Prodüksiyon build'i oluşturmak için:

```bash
npm run build
```

Bu, `/build` klasöründe optimize edilmiş statik dosyalar oluşturur.

### Dağıtım Seçenekleri

- **Vercel/Netlify**: GitHub repo bağlantısıyla otomatik dağıtım
- **GitHub Pages**: Statik site olarak yayınlama
- **Geleneksel Hosting**: Build klasörünü bir web sunucusuna yükleme

## Performans İyileştirmeleri

1. **Kod Bölme (Code Splitting)**: Büyük bileşenler için React.lazy() kullanımı
2. **Resim Optimizasyonu**: WebP formatı ve boyut optimizasyonu
3. **Önbelleğe Alma (Caching)**: Statik varlıklar için uygun önbellek stratejileri
4. **Önceden Yükleme (Preloading)**: Kritik kaynaklar için preload direktifleri

## Kaynaklar

- [React Dokümantasyonu](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [React Router Dokümantasyonu](https://reactrouter.com/docs/en/v6)
- [Framer Motion Dokümantasyonu](https://www.framer.com/docs/) 