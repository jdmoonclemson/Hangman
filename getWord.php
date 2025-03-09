<?php
header('Content-Type: application/json');

$wordsFile = 'words.txt';

if (!file_exists($wordsFile)) {
    echo json_encode(["error" => "Word list not found"]);
    exit;
}

// Read words from the file
$words = file($wordsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if (!$words) {
    echo json_encode(["error" => "Could not read words"]);
    exit;
}

// Select a random word
$word = trim($words[array_rand($words)]);

// Send the word as JSON
echo json_encode(["word" => $word]);
?>
