# 🌐 Natro Hosting Deployment Rehberi

## 📋 Ön Gereksinimler

- ✅ Natro hosting hesabı
- ✅ yildizfatih.com domain'i
- ✅ Natro mail hesabı (info@yildizfatih.com)
- ✅ FTP bilgileri

## 🚀 Deployment Adımları

### 1. **Build Alma**

```bash
npm run build
```

### 2. **FTP ile Dosya Yükleme**

#### **FTP Bilgileri (Natro Panel'den alın):**
- **Host**: ftp.yildizfatih.com (veya Natro'nun verdiği FTP adresi)
- **Username**: Natro hosting kullanıcı adınız
- **Password**: Natro hosting şifreniz
- **Port**: 21 (varsayılan)

#### **Yüklenecek Dosyalar:**
```
dist/ klasöründeki TÜM dosyalar:
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── manifest.json
├── favicon.ico
├── images/ klasörü
├── work/ klasörü
├── projects/ klasörü
├── privacy/ klasörü
├── terms/ klasörü
├── thank-you/ klasörü
└── 404.html
```

### 3. **Natro Hosting Panel Ayarları**

#### **Domain Yönetimi:**
1. Natro panel'e giriş yapın
2. "Domains" sekmesine gidin
3. yildizfatih.com domain'ini seçin
4. DNS ayarlarını kontrol edin

#### **SSL Sertifikası:**
1. "SSL Certificates" sekmesine gidin
2. "Install SSL" butonuna tıklayın
3. Domain'i seçin ve SSL'i aktif edin

#### **Mail Ayarları:**
1. "Email" sekmesine gidin
2. info@yildizfatih.com hesabı oluşturun
3. SMTP ayarlarını not edin:
   - **SMTP Server**: mail.yildizfatih.com
   - **Port**: 587 (TLS) veya 465 (SSL)
   - **Username**: info@yildizfatih.com
   - **Password**: Mail hesabı şifresi

### 4. **Contact Form Natro Mail Entegrasyonu**

Formspree yerine Natro mail kullanmak için:

#### **Seçenek A: PHP ile Mail Gönderimi**
`public/contact.php` dosyası oluşturun:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "info@yildizfatih.com";
    $email_subject = "Portfolio'dan Yeni Mesaj: " . $subject;
    
    $email_body = "Yeni bir mesaj alındı:\n\n".
        "Ad Soyad: $name\n".
        "Email: $email\n".
        "Konu: $subject\n".
        "Mesaj:\n$message\n";
    
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    if(mail($to, $email_subject, $email_body, $headers)) {
        header("Location: /thank-you");
    } else {
        header("Location: /?error=1");
    }
}
?>
```

#### **Seçenek B: JavaScript ile Formspree Kullanımı (Önerilen)**
Formspree.io kullanmaya devam edin (ücretsiz ve güvenilir).

### 5. **DNS Ayarları**

Natro DNS panel'de şu kayıtları kontrol edin:

```
A Record:
- Name: @
- Value: Natro hosting IP adresi

CNAME Record:
- Name: www
- Value: yildizfatih.com

MX Record:
- Name: @
- Value: mail.yildizfatih.com
- Priority: 10

TXT Record:
- Name: @
- Value: v=spf1 include:yildizfatih.com ~all
```

### 6. **Test Etme**

#### **Site Testleri:**
- [ ] Ana sayfa yükleniyor mu?
- [ ] Tüm proje sayfaları çalışıyor mu?
- [ ] 404 sayfası çalışıyor mu?
- [ ] SSL sertifikası aktif mi?
- [ ] www ve non-www yönlendirmeleri çalışıyor mu?

#### **Form Testleri:**
- [ ] Contact form çalışıyor mu?
- [ ] Email gönderiliyor mu?
- [ ] Teşekkür sayfasına yönlendiriliyor mu?

#### **Performance Testleri:**
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] Pingdom

### 7. **Post-Deployment Kontroller**

#### **SEO Kontrolleri:**
- [ ] Google Search Console'a site ekleyin
- [ ] Sitemap.xml erişilebilir mi?
- [ ] Robots.txt çalışıyor mu?
- [ ] Meta taglar doğru mu?

#### **Güvenlik Kontrolleri:**
- [ ] HTTPS aktif mi?
- [ ] Security headers çalışıyor mu?
- [ ] .htaccess dosyası yüklendi mi?

## 🔧 Sorun Giderme

### **Yaygın Sorunlar:**

#### **1. 404 Hataları**
- `.htaccess` dosyasının yüklendiğinden emin olun
- Natro'da mod_rewrite aktif mi kontrol edin

#### **2. CSS/JS Yüklenmiyor**
- Dosya izinlerini kontrol edin (644)
- Klasör izinlerini kontrol edin (755)

#### **3. SSL Sertifikası Çalışmıyor**
- DNS ayarlarını kontrol edin
- SSL sertifikasının aktif olduğundan emin olun

#### **4. Mail Gönderilmiyor**
- SMTP ayarlarını kontrol edin
- Port numaralarını test edin

## 📞 Natro Destek

Eğer sorun yaşarsanız:
- **Live Chat**: Natro panel'de sağ alt köşe
- **Ticket Sistemi**: Support sekmesinden ticket açın
- **Telefon**: Natro müşteri hizmetleri

## 🎯 Son Kontroller

- [ ] Site erişilebilir
- [ ] Tüm sayfalar çalışıyor
- [ ] SSL aktif
- [ ] Mail çalışıyor
- [ ] Form çalışıyor
- [ ] Performance iyi
- [ ] SEO meta tagları doğru

---

**Not**: Bu rehberi takip ederek sitenizi Natro'ya başarıyla deploy edebilirsiniz. Herhangi bir sorun yaşarsanız Natro destek ekibi size yardımcı olacaktır.
