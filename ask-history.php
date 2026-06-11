<?php
declare(strict_types=1);

$configPaths = [
    __DIR__ . '/../gemini-config.php',
    __DIR__ . '/gemini-config.php',
];

$geminiConfig = null;
foreach ($configPaths as $configPath) {
    if (is_readable($configPath)) {
        $geminiConfig = require $configPath;
        break;
    }
}

if (!is_array($geminiConfig)) {
    $geminiConfig = [];
}

$apiKey = (string)($geminiConfig['api_key'] ?? '');
$model = (string)($geminiConfig['model'] ?? 'gemini-2.5-flash');

function jsonResponse(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed.'], 405);
}

if ($apiKey === '' || $apiKey === 'YOUR_GEMINI_API_KEY') {
    jsonResponse(['error' => 'Gemini API key is not configured.'], 500);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    jsonResponse(['error' => 'Invalid request body.'], 400);
}

$question = trim((string)($payload['question'] ?? ''));
$context = trim((string)($payload['context'] ?? ''));

if ($question === '') {
    jsonResponse(['error' => 'Please enter a question.'], 400);
}

if (strlen($question) > 500) {
    jsonResponse(['error' => 'Please enter a shorter question.'], 400);
}

if (strlen($context) > 6000) {
    $context = substr($context, 0, 6000);
}

$instructions = <<<TEXT
You are a careful history assistant for the Historical Bialystok project.
Answer questions about Bialystok history, the 1930s city context, local communities, and the reconstruction project.
Use the provided project context when it is relevant.
If the answer is not known from the context or your reliable historical knowledge, say that you do not know.
Do not invent exact dates, names, buildings, citations, or sources.
Keep answers concise and accessible for website visitors.
TEXT;

$requestBody = json_encode([
    'systemInstruction' => [
        'parts' => [
            ['text' => $instructions],
        ],
    ],
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                [
                    'text' => "Project context:\n" . $context . "\n\nQuestion:\n" . $question,
                ],
            ],
        ],
    ],
    'generationConfig' => [
        'temperature' => 0.3,
        'maxOutputTokens' => 700,
    ],
]);

$url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($model) . ':generateContent';
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'x-goog-api-key: ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 45,
]);

$responseBody = curl_exec($ch);
$curlError = curl_error($ch);
$httpStatus = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false) {
    jsonResponse(['error' => 'Could not connect to Gemini: ' . $curlError], 500);
}

$response = json_decode($responseBody, true);

if ($httpStatus < 200 || $httpStatus >= 300) {
    $message = $response['error']['message'] ?? 'Gemini request failed.';
    jsonResponse(['error' => $message], 500);
}

$answer = '';
if (isset($response['candidates']) && is_array($response['candidates'])) {
    foreach ($response['candidates'] as $candidate) {
        $parts = $candidate['content']['parts'] ?? [];
        if (!is_array($parts)) {
            continue;
        }

        foreach ($parts as $part) {
            if (isset($part['text'])) {
                $answer .= (string)$part['text'];
            }
        }
    }
}

$answer = trim($answer);

jsonResponse([
    'answer' => $answer !== '' ? $answer : 'No answer was returned.',
]);
