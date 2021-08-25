// Einblendung
jQuery(function( $ ) {$("#test").addClass("load");});function MM_effectAppearFade(targetElement, duration, from, to, toggle)
{Spry.Effect.DoFade(targetElement, {duration: duration, from: from, to: to, toggle: toggle});}

// SmoothScroll
$(function() {$('a[href*="#"]:not([href="#"])').click(function() {if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {var target = $(this.hash);target = target.length ? target : $('[name=' + this.hash.slice(1) +']');if (target.length) {$('html, body').animate({scrollTop: target.offset().top}, 500);return false;}}});});

// Sticky Nav
var new_scroll_position = 0;var last_scroll_position;var header = document.getElementById("header");window.addEventListener('scroll', function(e) {last_scroll_position = window.scrollY;if (new_scroll_position < last_scroll_position && last_scroll_position > 100) {header.classList.remove("slideDown");header.classList.add("slideUp");} else if (new_scroll_position > last_scroll_position) {header.classList.remove("slideUp");header.classList.add("slideDown");}new_scroll_position = last_scroll_position;});


// svg png //
if(!Modernizr.svg) {$('img[src$="svg"]').attr('src', function() {return $(this).attr('src').replace('.svg', '.png');});}


// Parallax
var fensterHoehe=0,seitenHoehe=0,bewegungsTeiler=2;
function bezieheDimensionen() {fensterHoehe = $( window ).height(),seitenHoehe = $(document).height();$('.sektion').css('height', fensterHoehe);}
function parallaxeVerschiebung() {
var gescrollt = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
gegenwaertigeSektion = Math.ceil(gescrollt / fensterHoehe),
gescrolltInSektion = gescrollt - (Math.ceil (fensterHoehe * gegenwaertigeSektion)),
bewegungAktiv= Math.round( ( gescrolltInSektion / bewegungsTeiler ) + ( fensterHoehe / bewegungsTeiler)),
bewegungProaktiv = Math.round( gescrolltInSektion / bewegungsTeiler );
if (gegenwaertigeSektion == 1) {$('#1 .hintergrundbild').css('top', bewegungAktiv );} else {$('#1 .hintergrundbild').css('top', bewegungProaktiv);}
if (gegenwaertigeSektion == 2) {$('#2 .hintergrundbild').css('top', bewegungAktiv );} else {$('#2 .hintergrundbild').css('top', bewegungProaktiv);}
if (gegenwaertigeSektion == 3) {$('#3 .hintergrundbild').css('top', bewegungAktiv );} else {$('#3 .hintergrundbild').css('top', bewegungProaktiv);}
if (gegenwaertigeSektion == 4) {$('#4 .hintergrundbild').css('top', bewegungAktiv );} else {$('#4 .hintergrundbild').css('top', bewegungProaktiv);}
if (gegenwaertigeSektion == 5) {$('#5 .hintergrundbild').css('top', bewegungAktiv );} else {$('#5 .hintergrundbild').css('top', bewegungProaktiv);}}
$(document ).ready(function() {bezieheDimensionen();$( window ).scroll(function() {parallaxeVerschiebung();});});
$( window ).resize( function() {bezieheDimensionen();});