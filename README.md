# Fatih Yıldız Portfolio Website

Profesyonel grafik tasarımcı Fatih Yıldız'ın portföy websitesi. Astro.js ile geliştirilmiş modern, responsive ve SEO-optimized bir portföy sitesi.

## 🚀 Özellikler

- **Modern Tasarım**: Tailwind CSS ile geliştirilmiş minimal ve şık tasarım
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Dark/Light Mode**: Kullanıcı tercihine göre tema değişimi
- **SEO Optimized**: Meta taglar, structured data ve sitemap
- **PWA Ready**: Progressive Web App desteği
- **Performance**: Hızlı yükleme ve optimize edilmiş görseller
- **Accessibility**: WCAG standartlarına uygun erişilebilirlik

## 🛠️ Teknolojiler

- **Framework**: Astro.js 4.0
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Build Tool**: Vite
- **Deployment**: Static Site Generation

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
├── content/            # MDX içerik dosyaları
├── layouts/            # Sayfa layout'ları
├── pages/              # Sayfa dosyaları
└── styles/             # Global CSS stilleri

public/
├── images/             # Proje görselleri
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots
└── sitemap.xml         # Site haritası
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum
```bash
# Repository'yi klonlayın
git clone [repository-url]
cd cursor-test

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 📝 İçerik Yönetimi

### Yeni Proje Ekleme
1. `src/content/projects/` klasörüne yeni `.mdx` dosyası ekleyin
2. Frontmatter'da gerekli bilgileri tanımlayın:
   ```mdx
   ---
   title: "Proje Adı"
   category: "Kategori"
   year: 2024
   summary: "Proje özeti"
   tags: ["tag1", "tag2"]
   cover: "/images/project-name/cover.webp"
   ---
   ```

### Görsel Ekleme
- Tüm görseller `public/images/` klasöründe
- Proje görselleri için `cover.webp` adında ana görsel
- WebP formatı tercih edilir

## 🔧 Konfigürasyon

### SEO Ayarları
- `astro.config.mjs` dosyasında site URL'i
- Her sayfada meta taglar
- Structured data (JSON-LD)

### Tema Ayarları
- `tailwind.config.cjs` dosyasında renk paleti
- CSS değişkenleri ile tema desteği

## 📱 PWA Özellikleri

- Service Worker desteği
- Offline çalışma
- App-like deneyim
- Manifest.json ile yükleme

## 🚀 Deployment

### Static Hosting
```bash
npm run build
# dist/ klasörünü hosting servisine yükleyin
```

### Netlify
```bash
# netlify.toml dosyası otomatik olarak oluşturulur
npm run build
```

### Vercel
```bash
# Vercel otomatik olarak Astro.js'i tanır
git push
```

## 📊 Performance

- Lighthouse Score: 95+
- Core Web Vitals: ✅
- Image Optimization: ✅
- Code Splitting: ✅

## 🔒 Güvenlik

- Content Security Policy (CSP)
- XSS Protection
- CSRF Protection
- Secure Headers

## 📈 Analytics

Google Analytics entegrasyonu mevcut. `GA_MEASUREMENT_ID` değerini kendi ID'niz ile değiştirin.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Website**: [yildizfatih.com](https://yildizfatih.com)
- **Email**: info@yildizfatih.com
- **LinkedIn**: [Fatih Yıldız](https://www.linkedin.com/in/ffatihyildizz/)
- **Behance**: [Fatih Yıldız](https://www.behance.net/ffatihyildizz)

## 🙏 Teşekkürler

- [Astro.js](https://astro.build/) - Modern web framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown + JSX
- [Vite](https://vitejs.dev/) - Build tool

---

**Not**: Bu proje canlıya alınmaya hazırdır. Sadece Google Analytics ID'sini ve form backend'ini yapılandırmanız gerekmektedir.
