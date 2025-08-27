<?php
// Ultra basit test - PHP 5.x uyumlu
header('Content-Type: application/json; charset=utf-8');

// Basit response
$response = array(
    'success' => true,
    'message' => 'PHP çalışıyor!',
    'php_version' => phpversion(),
    'time' => date('Y-m-d H:i:s')
);

echo json_encode($response);
?>

