<section class="pad1">
    <script type="text/javascript" src="/dist-form/calculate.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            contactForm.init('/server/send_contact_mail.php');
        });
    </script>
    <form id="contact_form">
        <div class="ccontent4" data-aos="fade-up"><h1>Kontaktformular</h1>
            <p><br></p>
            <div class="section group">
                <div class="col span_1_of_1 pad4"><label for="Vor-und-Nachname">Vor- und Nachname*</label><br>
                    <input class="formtext3" maxlength="50" id="Vor-und-Nachname" name="Vor-und-Nachname" required />
                </div>
                <div class="col span_1_of_1 pad4"><label for="E-Mail-Adresse">E-Mail Adresse*</label><br>
                    <input class="formtext3" type="email" maxlength="50" id="E-Mail-Adresse" name="E-Mail-Adresse"
                                                                                           required /></div>
                <div class="col span_1_of_1 pad4"><label for="Telefonnummer">">Telefonnummer*</label><br>
                    <input class="formtext3" type="tel" maxlength="20" id="Telefonnummer" name="Telefonnummer" required />
                </div>
                <div class="col span_1_of_1 pad4"><label for="Strasse-Hausnummer">Strasse &amp; Hausnummer</label>
                    <input class="formtext3" type="text" maxlength="50" id="Strasse-Hausnummer" name="Strasse-Hausnummer" required />
                </div>
                <div class="col span_1_of_1 pad4"><label for="PLZ-Ort">PLZ, Ort</label>
                    <input class="formtext3" type="text" maxlength="50" id="PLZ-Ort" name="PLZ-Ort" required /></div>
                <div class="col span_1_of_1 pad4"><label for="Nachricht">Ihre Nachricht</label>
                    <textarea class="formtext3" maxlength="1000" id="Nachricht" name="Nachricht" rows="3"></textarea></div>
                <div class="col span_1_of_1 pad4"><br>
                    <input type="checkbox" id="Datenschutz" name="Datenschutz" required /> <label for="Datenschutz">&nbsp;&nbsp;Ja ich habe die <a target="_blank" href="datenschutz.php">Datenschutzerklärung</a>
                        gelesen, verstanden und akzeptiert.*</label></div>
                <div class="col span_1_of_1">
                    <button type="submit" class="button" name="Senden" value="Senden" id="button">Senden<br></button>
                </div>
            </div>
        </div>
    </form>
</section>
