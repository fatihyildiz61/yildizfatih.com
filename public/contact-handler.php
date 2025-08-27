<?php
// Natro Hosting Contact Form Handler
// PHPMailer ile SMTP mail gönderimi

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

    // PHPMailer ile mail gönderimi
    require_once 'PHPMailer.php';
    require_once 'SMTP.php';
    require_once 'Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.kurumsaleposta.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@yildizfatih.com';
        $mail->Password = 'qL_n43Ux17aHA=-@';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom('info@yildizfatih.com', 'Yildiz Fatih Website');
        $mail->addAddress('info@yildizfatih.com', 'Yildiz Fatih');
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Website Contact Form: ' . $subject;
        
        $htmlMessage = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .value { background-color: #f8f9fa; padding: 10px; border-radius: 3px; }
                .message-box { background-color: #e9ecef; padding: 15px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Website Contact Form Mesajı</h2>
                    <p>Yeni bir iletişim formu mesajı alındı.</p>
                </div>
                
                <div class='field'>
                    <div class='label'>İsim:</div>
                    <div class='value'>{$name}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>E-posta:</div>
                    <div class='value'>{$email}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Konu:</div>
                    <div class='value'>{$subject}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Mesaj:</div>
                    <div class='message-box'>{$message}</div>
                </div>
                
                <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;'>
                    <p>Bu mesaj yildizfatih.com websitesinden otomatik olarak gönderilmiştir.</p>
                    <p>Gönderim zamanı: " . date('d.m.Y H:i:s') . "</p>
                </div>
            </div>
        </body>
        </html>";

        $mail->Body = $htmlMessage;
        $mail->AltBody = "Website Contact Form Mesajı\n\nİsim: {$name}\nE-posta: {$email}\nKonu: {$subject}\nMesaj: {$message}\n\nGönderim zamanı: " . date('d.m.Y H:i:s');

        $mail->send();
        
        // Form verilerini log'a kaydet
        $log_entry = date('Y-m-d H:i:s') . " | MAIL SENT | {$name} | {$email} | {$subject}\n";
        @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        // Rate limiting güncelle
        $_SESSION['last_form_submit'] = $current_time;
        
        // Başarılı mesajı döndür
        echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.']);
        
    } catch (Exception $e) {
        // Mail gönderim hatası
        $log_entry = date('Y-m-d H:i:s') . " | MAIL ERROR | {$name} | {$email} | {$subject} | {$e->getMessage()}\n";
        @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode(['success' => false, 'error' => 'Mail gönderilemedi: ' . $e->getMessage()]);
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
