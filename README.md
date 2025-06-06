# BlogPlatform

Modern, SEO dostu ve kullanıcı odaklı bir blog platformu. React ve Tailwind CSS ile geliştirilmiştir.

![BlogPlatform Screenshot](./screenshot.png)

## Özellikler

- 🔒 Kullanıcı kaydı ve girişi
- 📝 Blog yazıları oluşturma ve düzenleme
- 🔍 Blog yazıları filtreleme ve arama
- 📱 Tüm cihazlarda uyumlu duyarlı tasarım (responsive design)
- 🚀 SEO dostu yapı
- 🌐 Sosyal medya paylaşım entegrasyonu
- 💬 Yorumlar ve beğeniler
- 📊 Kullanıcı profilleri ve istatistikler

## Teknolojiler

- **Frontend**: React, React Router, Tailwind CSS, Framer Motion
- **State Yönetimi**: React Context API & Hooks
- **Formlar**: Formik & Yup
- **İkonlar**: React Icons
- **Optimizasyon**: Lazy loading, code splitting
- **SEO**: Meta etiketler, Yapılandırılmış veri, SEO dostu URL'ler

## Kurulum

Projeyi yerel makinenizde çalıştırmak için:

```bash
# Repoyu klonla
git clone https://github.com/username/blog-platform.git

# Proje dizinine git
cd blog-platform

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görebilirsiniz.

## Yapı

```
blog-platform/
├── public/               # Statik dosyalar
│   ├── index.html        # HTML giriş noktası
│   ├── manifest.json     # Web uygulaması manifest dosyası
│   └── ...
├── src/                  # Kaynak kodları
│   ├── components/       # Yeniden kullanılabilir bileşenler
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/            # Sayfa bileşenleri
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── BlogPage.js
│   │   └── CreateBlogPage.js
│   ├── App.js            # Ana uygulama bileşeni
│   ├── index.js          # JavaScript giriş noktası
│   └── index.css         # Global CSS (Tailwind direktifleri)
└── ...
```

## Sorun Giderme

### Tailwind CSS Yapılandırma Sorunları

Eğer Tailwind CSS ile ilgili yapılandırma sorunları yaşıyorsanız:

1. **Uyumluluk Sorunları**: Eski PostCSS 7 uyumlu paketler (`@tailwindcss/postcss7-compat`) kullanıldığında modern React sürümleriyle uyumluluk sorunları olabilir. Çözüm için package.json dosyasındaki bağımlılıkları güncelleyin:

```json
"devDependencies": {
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24",
  "tailwindcss": "^3.3.2"
}
```

2. **PostCSS Yapılandırması**: PostCSS yapılandırmanızı güncelleyin (postcss.config.js):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

3. **Bağımlılıkları Yeniden Yükleme**: Değişikliklerden sonra bağımlılıkları yeniden yükleyin:

```bash
npm install
```

### React Versiyon Uyumluluk Sorunları

Eğer React sürümü ile ilgili uyumluluk sorunları yaşıyorsanız:

1. **React ve React DOM Sürümleri**: Stable bir React sürümüne geçiş yapmak, deneysel/beta sürümlerinden kaynaklanan uyumluluk sorunlarını çözebilir:

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

2. **Bağımlılık Uyumluluğu**: React 18 ile çalışmak için diğer kütüphanelerin uyumlu sürümlerini kullanın:

```json
"dependencies": {
  "@headlessui/react": "^1.7.17",
  "framer-motion": "^10.16.4", 
  "react-icons": "^4.11.0",
  "react-router-dom": "^6.18.0"
}
```

## Canlı Demo

[https://blogplatform.com](https://blogplatform.com)

## Geliştirme

```bash
# Production build oluştur
npm run build

# Test
npm test

# Linting
npm run lint
```

## Katkıda Bulunma

1. Fork'layın
2. Özellik dalınızı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add some amazing feature'`)
4. Dalınıza push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

MIT Lisansı. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

E-posta: info@blogplatform.com
Twitter: [@blogplatform](https://twitter.com/blogplatform)
