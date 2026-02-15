<?php
header('Content-Type: text/plain; charset=utf-8');


// Sanitize
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Kötelező mezők ellenőrzése
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    die('Minden mező kitöltése kötelező.');
}

// Email formátum + @uni-corvinus.hu validáció
$emailParts = explode('@', $email);
$emailDomain = strtolower(end($emailParts));
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $emailDomain !== 'uni-corvinus.hu') {
    die('Csak @uni-corvinus.hu végű email cím fogadható el.');
}

// Hossz korlátok
if (strlen($name) > 100 || strlen($subject) > 200 || strlen($message) > 5000) {
    die('A megadott adatok túl hosszúak.');
}

// Email küldés
$to = 'hok@uni-corvinus.hu';

$headers  = 'From: Corvinus HÖK <noreply@uni-corvinus.hu>' . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'X-Mailer: Corvinus HÖK Mailer';

$body  = "Feladó: " . $name . "\r\n";
$body .= "Email: " . $email . "\r\n";
$body .= "Tárgy: " . $subject . "\r\n\r\n";
$body .= $message;

$sent = mail($to, '[HÖK Kapcsolat] ' . $subject, $body, $headers);

if (!$sent) {
    error_log('HÖK contact form: mail() failed for ' . $email);
}

echo $sent ? 'OK' : 'Az üzenet küldése sikertelen. Kérjük, próbáld újra később.';
