<?php
require_once 'config.php';
require_once '../vendor/autoload.php';
require_once 'mailer.php';

$text = '<html lang="de">
    <head>
        <title>Neue allgemeine Anfrage</title>
    </head>
    <body>
    <h4>Allgemeine Anfrage</h4>
    <p>
    Name: {name}<br />
    Email: {email}<br />
    Rückrufnummer: {phone}<br />
    Adresse: {address}<br />
    Ort: {city}<br />
    </p>
    <p>{notice}</p>
    </body>
</html>';

if (isset($_POST['submit'])) {
    $keys = [];
    $vals = [];
    foreach ($_POST as $k => $val) {
        $keys[] = '{' . $k . '}';
        $vals[] = nl2br(trim(strip_tags($val)));
    }

    $mail = new Mailer();
    $mail->send(array(
        'to' => $GLOBALS['AIB_ENV']['default']['to'],
        'subject' => 'Neue Anfrage',
        'body' => str_replace($keys, $vals, $text)
    ));
    $mail->send(array(
        'to' => $_POST['email'],
        'subject' => 'Ihre Anfrage wurde empfangen',
        'body' => str_replace($keys, $vals, $text)
    ));
    echo '{"status": true}';
} else {
    echo '{"error": "Missing data"}';
}
