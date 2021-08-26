<?php
require_once 'config.php';
require_once '../vendor/autoload.php';
require_once 'mailer.php';

$text = '<html lang="de">
    <head>
        <title>Neue Anfrage</title>
    </head>
    <body>
    <h4>Anfrage für Fahrzeug {vehicle}</h4>
    <p>Von: {from} Bis: {to}<br />
    Frei Km: {free}<br />
    weitere Km: {exta}<br />
    Preis: {price}
    </p>
    <p>
    Name: {name}<br />
    Email: {email}<br />
    Rückrufnummer: {phone}<br />
    Adresse: {address}<br />
    PLZ: {zip}<br />
    Ort: {town}<br />
    </p>
    <p>{notice}</p>
    </body>
</html>';

if (isset($_POST['submit'])) {
    $keys = [];
    $vals = [];
    foreach ($_POST as $k => $val) {
        $keys[] = '{' . $k . '}';
        $vals[] = strip_tags($val);
    }

    $mail = new Mailer();
    $mail->send(array(
        'to' => $GLOBALS['AIB_ENV']['default']['to'],
        'subject' => 'Neue Anfrage für Fahrzeug: ' . strip_tags($_POST['vehicle']),
        'body' => str_replace($keys, $vals, $text)
    ));
    $mail->send(array(
        'to' => $_POST['email'],
        'subject' => 'Ihre Anfrage für das Fahrzeug: ' . strip_tags($_POST['vehicle']),
        'body' => str_replace($keys, $vals, $text)
    ));
    echo '{"status": true}';
} else {
    echo '{"error": "Missing data"}';
}
