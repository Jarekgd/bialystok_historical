<?php
declare(strict_types=1);

$siteName = 'Historical Bialystok';
$configPaths = [
    __DIR__ . '/../contact-config.php',
    __DIR__ . '/contact-config.php',
];

$contactConfig = null;
foreach ($configPaths as $configPath) {
    if (is_readable($configPath)) {
        $contactConfig = require $configPath;
        break;
    }
}

if (!is_array($contactConfig)) {
    $contactConfig = [];
}

$recipientEmail = (string)($contactConfig['recipient_email'] ?? '');
$senderEmail = (string)($contactConfig['sender_email'] ?? '');
$smtpHost = (string)($contactConfig['smtp_host'] ?? 'smtp.ionos.com');
$smtpHosts = $contactConfig['smtp_hosts'] ?? [$smtpHost, 'smtp.ionos.co.uk'];
if (!is_array($smtpHosts)) {
    $smtpHosts = [$smtpHost];
}
$smtpHosts = array_values(array_unique(array_filter(array_map('strval', $smtpHosts))));
$smtpPort = (int)($contactConfig['smtp_port'] ?? 587);
$smtpUsername = (string)($contactConfig['smtp_username'] ?? $senderEmail);
$smtpPassword = (string)($contactConfig['smtp_password'] ?? '');

function redirectWithStatus(string $status): void
{
    header('Location: contact.html?contact=' . rawurlencode($status) . '#contact-form', true, 303);
    exit;
}

function cleanHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function smtpRead($socket): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtpCommand($socket, string $command, array $expectedCodes): string
{
    fwrite($socket, $command . "\r\n");
    $response = smtpRead($socket);
    $code = substr($response, 0, 3);

    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException(trim($response));
    }

    return $response;
}

function smtpStatusFromError(Throwable $exception): string
{
    $message = $exception->getMessage();

    if (stripos($message, 'connect') !== false || stripos($message, 'timed out') !== false) {
        return 'smtpconnect';
    }

    if (stripos($message, 'TLS') !== false || stripos($message, 'STARTTLS') !== false) {
        return 'smtptls';
    }

    if (str_starts_with($message, '535') || stripos($message, 'authentication') !== false) {
        return 'smtpauth';
    }

    if (str_starts_with($message, '550') || str_starts_with($message, '554')) {
        return 'smtprejected';
    }

    return 'mailerror';
}

function smtpAddress(string $email): string
{
    return '<' . str_replace(['<', '>', "\r", "\n"], '', $email) . '>';
}

function smtpAuthenticate($socket, string $username, string $password): void
{
    $plainException = null;

    try {
        $plain = base64_encode("\0" . $username . "\0" . $password);
        smtpCommand($socket, 'AUTH PLAIN ' . $plain, ['235']);
        return;
    } catch (RuntimeException $exception) {
        $plainException = $exception;
    }

    try {
        smtpCommand($socket, 'AUTH LOGIN', ['334']);
        smtpCommand($socket, base64_encode($username), ['334']);
        smtpCommand($socket, base64_encode($password), ['235']);
    } catch (RuntimeException $loginException) {
        if ($plainException) {
            throw $plainException;
        }

        throw $loginException;
    }
}

function smtpSendMail(
    string $host,
    int $port,
    string $username,
    string $password,
    string $from,
    string $to,
    string $subject,
    string $body,
    array $headers
): bool {
    $socket = stream_socket_client(
        'tcp://' . $host . ':' . $port,
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException($errstr !== '' ? $errstr : 'Could not connect to SMTP server.');
    }

    stream_set_timeout($socket, 20);

    try {
        $response = smtpRead($socket);
        if (substr($response, 0, 3) !== '220') {
            throw new RuntimeException(trim($response));
        }

        $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
        smtpCommand($socket, 'EHLO ' . $serverName, ['250']);
        smtpCommand($socket, 'STARTTLS', ['220']);

        $cryptoMethod = defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')
            ? STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT
            : STREAM_CRYPTO_METHOD_TLS_CLIENT;

        if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
            throw new RuntimeException('Could not start TLS encryption.');
        }

        smtpCommand($socket, 'EHLO ' . $serverName, ['250']);
        smtpAuthenticate($socket, $username, $password);
        smtpCommand($socket, 'MAIL FROM:' . smtpAddress($from), ['250']);
        smtpCommand($socket, 'RCPT TO:' . smtpAddress($to), ['250', '251']);
        smtpCommand($socket, 'DATA', ['354']);

        $message = implode("\r\n", array_merge(
            [
                'To: ' . smtpAddress($to),
                'Subject: ' . $subject,
            ],
            $headers,
            ['', $body]
        ));

        $message = preg_replace('/^\./m', '..', $message);
        smtpCommand($socket, $message . "\r\n.", ['250']);
        smtpCommand($socket, 'QUIT', ['221']);
    } finally {
        fclose($socket);
    }

    return true;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectWithStatus('error');
}

if (
    $recipientEmail === ''
    || $senderEmail === ''
    || $smtpUsername === ''
    || $smtpPassword === ''
    || $smtpPassword === 'PUT_IONOS_EMAIL_PASSWORD_HERE'
    || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)
    || !filter_var($senderEmail, FILTER_VALIDATE_EMAIL)
) {
    redirectWithStatus('config');
}

$name = cleanHeaderValue((string)($_POST['name'] ?? ''));
$email = cleanHeaderValue((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    redirectWithStatus('validation');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectWithStatus('validation');
}

if (strlen($name) > 120 || strlen($email) > 254 || strlen($message) > 5000) {
    redirectWithStatus('validation');
}

$subject = 'New contact form message - ' . $siteName;
$body = "You received a new message from the website contact form.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n\n"
    . "Message:\n{$message}\n";

$headers = [
    'From: ' . $siteName . ' <' . $senderEmail . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
    'X-Mailer: PHP SMTP/' . phpversion(),
];

$sent = false;
$lastException = null;

foreach ($smtpHosts as $host) {
    try {
        $sent = smtpSendMail(
            $host,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $senderEmail,
            $recipientEmail,
            $subject,
            $body,
            $headers
        );
        break;
    } catch (Throwable $exception) {
        $lastException = $exception;
        error_log('Contact form SMTP error using ' . $host . ': ' . $exception->getMessage());
    }
}

if (!$sent && $lastException) {
    redirectWithStatus(smtpStatusFromError($lastException));
}

redirectWithStatus($sent ? 'sent' : 'mailerror');
