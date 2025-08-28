# SSL Sorun Giderme Rehberi

## 🔍 Mevcut Sorunlar
1. Site dosyaları doğru yerde ama açılmıyor
2. SSL sertifikası yanlış (*.srvpanel.com gösteriyor)
3. HTTPS'de SSL hatası var
4. Cloudflare "Always Use HTTPS" aktif

## 🚀 Çözüm Adımları

### 1. Cloudflare Ayarları
```
Cloudflare Dashboard > SSL/TLS > Overview
├── SSL/TLS encryption mode: Full (strict)
├── Edge Certificates > Always Use HTTPS: KAPALI (geçici)
├── Edge Certificates > Minimum TLS Version: 1.2
└── Edge Certificates > Opportunistic Encryption: AÇIK
```

### 2. cPanel SSL Kontrolü
```
cPanel > SSL/TLS > Manage SSL Sites
├── Domain: yildizfatih.com
├── SSL Certificate: Let's Encrypt ile yeni oluştur
└── Private Key: Otomatik oluştur
```

### 3. DNS Ayarları
```
Cloudflare > DNS > Records
├── Type: A
├── Name: @
├── Content: Hosting IP adresi
└── Proxy status: Proxied (orange cloud)
```

### 4. .htaccess Güncellemesi
- HTTP'den HTTPS'e yönlendirme geçici olarak kapatıldı
- SSL hazır olduğunda aktif edilecek

## 🧪 Test Komutları

### SSL Testi
```bash
npm run test-ssl
```

### Manuel Test
```bash
# HTTPS testi
curl -I https://yildizfatih.com

# HTTP testi  
curl -I http://yildizfatih.com

# SSL sertifika detayı
openssl s_client -connect yildizfatih.com:443 -servername yildizfatih.com
```

## ⚠️ Önemli Notlar

1. **SSL sertifikası yayılması 24-48 saat sürebilir**
2. **Cloudflare cache'i temizlemek gerekebilir**
3. **Hosting sağlayıcısı SSL desteği olmalı**
4. **Domain DNS'i Cloudflare'e yönlendirilmiş olmalı**

## 🔄 Sonraki Adımlar

1. SSL sertifikası yayıldıktan sonra:
   - .htaccess'de HTTPS yönlendirmeyi aktif et
   - Cloudflare'de "Always Use HTTPS" aç
   
2. Test et:
   - Site açılıyor mu?
   - SSL sertifikası doğru mu?
   - HTTPS yönlendirme çalışıyor mu?

## 📞 Destek

- **Hosting Sağlayıcısı**: SSL sertifika desteği
- **Cloudflare**: DNS ve SSL ayarları
- **Domain Registrar**: DNS yönlendirme
