<?php
// PHP Test Dosyası
header('Content-Type: application/json; charset=utf-8');

$test_data = [
    'success' => true,
    'message' => 'PHP çalışıyor!',
    'php_version' => PHP_VERSION,
    'server_time' => date('Y-m-d H:i:s'),
    'mail_function' => function_exists('mail') ? 'Available' : 'Not Available'
];

echo json_encode($test_data);
?>

