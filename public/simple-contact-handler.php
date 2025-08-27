<?php
// Basit Contact Handler - PHPMailer olmadan
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Debug modu
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
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

    // Form verilerini log'a kaydet (email gönderemiyoruz)
    $log_entry = date('Y-m-d H:i:s') . " | FORM RECEIVED | {$name} | {$email} | {$subject} | {$message}\n";
    @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // Başarılı response
    echo json_encode([
        'success' => true, 
        'message' => 'Form verileri başarıyla alındı! (Email gönderilemedi - hosting kısıtlaması)',
        'data' => [
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message_length' => strlen($message),
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);

} catch (Exception $e) {
    // Hata durumunda
    error_log("Simple contact form error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Sunucu hatası: ' . $e->getMessage()]);
} catch (Error $e) {
    // Fatal error durumunda
    error_log("Simple contact form fatal error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Kritik sunucu hatası: ' . $e->getMessage()]);
}
?>

