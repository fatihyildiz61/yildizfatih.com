<?php
// Natro Hosting Contact Form Handler
// Natro SMTP ile email gönderimi

// PHPMailer sınıflarını dahil et
require_once 'PHPMailer.php';
require_once 'SMTP.php';
require_once 'Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Debug modu - hata detaylarını görmek için
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS ayarları
header('Access-Control-Allow-Origin: https://yildizfatih.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
    // Rate limiting (1 dakikada 1 form)
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $current_time = time();
    $last_submit_time = isset($_SESSION['last_form_submit']) ? $_SESSION['last_form_submit'] : 0;

    if ($current_time - $last_submit_time < 60) {
        echo json_encode(['success' => false, 'error' => 'Çok hızlı gönderim. Lütfen 1 dakika bekleyin.']);
        exit;
    }

    // Form verilerini al ve temizle
    $name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $subject = isset($_POST['subject']) ? trim(htmlspecialchars($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

    // Validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'error' => 'Tüm alanlar zorunludur.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Geçerli bir email adresi girin.']);
        exit;
    }

    if (strlen($name) < 2 || strlen($name) > 100) {
        echo json_encode(['success' => false, 'error' => 'İsim 2-100 karakter arasında olmalıdır.']);
        exit;
    }

    if (strlen($message) < 10 || strlen($message) > 2000) {
        echo json_encode(['success' => false, 'error' => 'Mesaj 10-2000 karakter arasında olmalıdır.']);
        exit;
    }

    // PHPMailer ile email gönder - Natro SMTP ayarları
    $mail = new PHPMailer(true);
    
    try {
        // Server ayarları - Natro için
        $mail->isSMTP();
        $mail->Host = 'mail.yildizfatih.com'; // Natro mail sunucusu
        $mail->SMTPAuth = true; // Natro'da authentication gerekli
        $mail->Username = 'info@yildizfatih.com'; // Email kullanıcı adı
        $mail->Password = 'qL_n43Ux17aHA=-@'; // Email şifresi
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS encryption
        $mail->Port = 587; // TLS port
        
        // Debug modu (test için)
        $mail->SMTPDebug = 2; // Detaylı debug
        $mail->Debugoutput = 'html'; // HTML formatında debug
        
        // Email ayarları
        $mail->setFrom('info@yildizfatih.com', 'Portfolio Contact Form');
        $mail->addAddress('info@yildizfatih.com', 'Fatih Yıldız');
        $mail->addReplyTo($email, $name);
        
        // Email içeriği
        $mail->isHTML(false);
        $mail->Subject = "Portfolio'dan Yeni Mesaj: " . $subject;
        $mail->Body = "
Yeni bir mesaj alındı:

📧 **İletişim Bilgileri:**
Ad Soyad: {$name}
Email: {$email}
Konu: {$subject}

💬 **Mesaj:**
{$message}

---
Bu mesaj yildizfatih.com portfolio sitesinden otomatik olarak gönderilmiştir.
Gönderim Zamanı: " . date('d.m.Y H:i:s') . "
IP Adresi: " . $_SERVER['REMOTE_ADDR'] . "
";

        // Email gönder
        $mail_sent = $mail->send();
        
        if ($mail_sent) {
            // Başarılı - rate limiting güncelle
            $_SESSION['last_form_submit'] = $current_time;
            
            // Log dosyasına kaydet
            $log_entry = date('Y-m-d H:i:s') . " | SUCCESS | {$name} | {$email} | {$subject}\n";
            @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
            
            echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.']);
        } else {
            throw new Exception('Email gönderilemedi');
        }
        
    } catch (Exception $e) {
        // PHPMailer hatası
        $log_entry = date('Y-m-d H:i:s') . " | PHPMailer ERROR | {$name} | {$email} | {$subject} | {$e->getMessage()}\n";
        @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode(['success' => false, 'error' => 'Email gönderilirken PHPMailer hatası: ' . $e->getMessage()]);
    }

} catch (Exception $e) {
    // Genel hata durumunda
    error_log("Contact form error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Sunucu hatası: ' . $e->getMessage()]);
} catch (Error $e) {
    // Fatal error durumunda
    error_log("Contact form fatal error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Kritik sunucu hatası: ' . $e->getMessage()]);
}
?>
