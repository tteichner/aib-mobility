<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de-DE" lang="de-DE">
<head>


<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="format-detection" content="telephone=no">
<meta name="robots" content="index,follow">
<link href="https://www.aib-mobility.de/buchung.php" rel="canonical">
<link href="https://www.aib-mobility.de/buchung.php" rel="alternate" hreflang="de-DE">
<link href="favicon.ico" rel="shortcut icon">
<link href="apple-touch-icon.png" rel="apple-touch-icon-precomposed">
<link href="style/screen.css" rel="stylesheet" type="text/css">
<link href="dist/aos.css" rel="stylesheet">


<title>Buchung | AIB mobility GmbH</title>
<meta name="description" content="">
<meta name="keywords" content="">
</head>


<body id="test" style="background:#eee;">
<div class="content">
	

<?php include ("head.php"); ?>
	

<main>
<section>
<div class="sscontainer2"><div class="headline2"><p class="c sstitle" data-aos="zoom-in">FAHRZEUG BUCHUNG</p></div><div data-am-gallery> 
<input type="radio" name="gallery" id="img-1" checked />
<div class="images">
<div class="image" style="background-image: url(img/buchung.jpg);"></div></div>
</div></div>
</section>
	
	
<section class="fsection"><div class="ccontent">
<div data-aos="fade-up"><h3>Fahrzeug Buchung</h3><p><br></p>
<p class="j shy">Nutzen Sie unser praktisches Online-Buchungsformular und sichern Sie sich Ihr Mietfahrzeug noch heute, bequem von zu Hause aus. Sie erhalten die Bestätigung Ihrer Buchung sofort nach dem Auftragseingang.</p></div></div></section>
	


<div class="buchung" data-aos="zoom-in" style="margin-bottom:80px;">
<?php include ("buchungsformular.php"); ?>
</div>

	

<?php include ("foot.php"); ?>


</div><div class="abs"></div>
</main>
	
	
<script src="style/jquery.js"></script>
<script src="style/hp.js"></script>
<script src="dist/aos.js"></script>
<script type="text/javascript" src="/dist-form/calculate.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        priceForm.init('/server/send_mail.php', '<?php echo (int)$_GET['vehicle']; ?>');
        setTimeout(function() {AOS.init()}, 500);
    });
</script>
<script>;setTimeout(function() {AOS.init()}, 500);</script>
</body>