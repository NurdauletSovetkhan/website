<?php
session_start();

$sendInterval = 60; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['last_sent']) && (time() - $_SESSION['last_sent']) < $sendInterval) {
        echo "You can send a message only once every $sendInterval seconds.";
        exit;
    }
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "sovetkhan.nurdaulet@gmail.com";

    $subject = "New Message from Website Contact Form";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Sorry, currently we can't send messages :(";
    }
}
?>
