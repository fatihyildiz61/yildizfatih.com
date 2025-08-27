<?php
// Basit test dosyası - PHPMailer olmadan
header('Content-Type: application/json; charset=utf-8');

try {
    // Form verilerini al
    $name = isset($_POST['name']) ? trim($_POST['name']) : 'Test';
    $email = isset($_POST['email']) ? trim($_POST['email']) : 'test@test.com';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'test';
    $message = isset($_POST['message']) ? trim($_POST['message']) : 'Bu bir test mesajıdır ve 10 karakterden uzun olmalıdır.';
    
    // Basit validation
    if (strlen($message) < 10) {
        throw new Exception('Mesaj çok kısa');
    }
    
    // Başarılı response
    echo json_encode([
        'success' => true,
        'message' => 'Test başarılı!',
        'data' => [
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message_length' => strlen($message)
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} catch (Error $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Fatal error: ' . $e->getMessage()
    ]);
}
?>

