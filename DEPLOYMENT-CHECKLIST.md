# 🚀 Deployment Checklist - İletişim Formu

## ✅ Öncesi Kontroller

- [ ] Site başarıyla derlendi (`npm run build`)
- [ ] `dist` klasöründe tüm dosyalar mevcut
- [ ] `contact-handler.php` dosyası dist klasöründe
- [ ] `test-form.html` dosyası dist klasöründe
- [ ] `.htaccess` dosyası dist klasöründe

## 📁 Yüklenecek Dosyalar

### Ana Dosyalar
- [ ] `dist/` klasöründeki tüm dosyalar
- [ ] `dist/contact-handler.php` → `public_html/contact-handler.php`
- [ ] `dist/test-form.html` → `public_html/test-form.html`
- [ ] `dist/.htaccess` → `public_html/.htaccess`

### Önemli Not
`.htaccess` dosyası `public_html` klasörünün kök dizininde olmalıdır.

## 🔧 Kurulum Sonrası

### 1. Email Adresini Güncelle
`contact-handler.php` dosyasında:
```php
$to = 'info@yildizfatih.com'; // Kendi email adresinizi yazın
```

### 2. Test Et
1. `https://yildizfatih.com/test-form.html` adresine git
2. Test formu doldur ve gönder
3. Email'in gelip gelmediğini kontrol et

### 3. Ana Sitede Test Et
1. Ana sayfadaki iletişim formunu kullan
2. Form gönderimini test et

## 🚨 Sorun Giderme

### Form Gönderilmiyor
- [ ] PHP hata loglarını kontrol et
- [ ] `.htaccess` dosyasının doğru yüklendiğinden emin ol
- [ ] Dosya izinlerini kontrol et (644 veya 755)

### Email Gelmiyor
- [ ] Spam klasörünü kontrol et
- [ ] Natro email ayarlarını kontrol et
- [ ] `contact-handler.php`'deki email adresini doğrula

### CORS Hatası
- [ ] `.htaccess` dosyasındaki domain adresini kontrol et
- [ ] HTTPS kullandığından emin ol

## 📧 Natro Email Ayarları

### Control Panel
1. Natro Control Panel'e gir
2. **Email** > **Email Accounts** bölümüne git
3. SMTP ayarlarını kontrol et

### PHP Mail Fonksiyonu
Natro'da genellikle `mail()` fonksiyonu otomatik çalışır.

## 🔒 Güvenlik

- [ ] Rate limiting aktif (1 dakikada 1 form)
- [ ] Input validation aktif
- [ ] XSS protection aktif
- [ ] CORS protection aktif

## 📝 Log Dosyası

Form gönderimleri `contact_log.txt` dosyasına kaydedilir.
Bu dosya otomatik oluşturulur ve web'den erişilemez.

## 🎯 Test Senaryoları

### Başarılı Test
1. Form doldur ve gönder
2. Başarı mesajı görünmeli
3. Email gelmeli
4. 3 saniye sonra thank-you sayfasına yönlendirilmeli

### Hata Testi
1. Boş form göndermeye çalış
2. Hata mesajı görünmeli
3. Form reset olmamalı

### Rate Limiting Testi
1. Form gönder
2. Hemen tekrar göndermeye çalış
3. "Çok hızlı gönderim" mesajı görünmeli

---

**Son Güncelleme**: $(date)
**Durum**: ✅ Hazır
