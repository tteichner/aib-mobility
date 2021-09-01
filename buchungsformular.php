<form method="post" action="" id="request_vehicle_form">
    <div class="section group">
        <div class="col span_1_of_3"><label for="Mietfahrzeug-auswaehlen">Mietfahrzeug*<br></label>
            <select class="formtext" id="Mietfahrzeug-auswaehlen" name="Mietfahrzeug-auswaehlen" required="required" aria-required="true"></select></div>

        <div class="col span_1_of_3"><label for="Datum-von">Datum von*<br></label>
            <input class="formtext" type="date" id="Datum-von" name="Datum-von" required></div>

        <div class="col span_1_of_3"><label for="Datum-bis">Datum bis*<br></label>
            <input class="formtext" type="date" id="Datum-bis" name="Datum-bis" required></div>
    </div>

    <div class="section group">
        <div class="col span_1_of_3"><label for="freie-KM">freie KM*<br></label>
            <input class="formtext" type="number" placeholder="0" id="freie-KM" name="freie-KM" required />
        </div>

        <div class="col span_1_of_3"><label>weitere KM*<br></label>
            <input class="formtext" type="number" placeholder="0" id="weitere-KM" name="weitere-KM" required/>
        </div>

        <div class="col span_1_of_3"><label>Preis<br></label>
            <input class="formtext2" type="text" value="0,00 EUR" id="Preis" name="Preis" required />
        </div>
    </div>
    <hr>

    <div class="section group">
        <div class="col span_1_of_3 pad">
            <input class="formtext" type="text" autocomplete="name" placeholder="Vor- und Nachname*" maxlength="50" id="Vor-und-Nachname" name="Vor-und-Nachname" required />
        </div>

        <div class="col span_1_of_3 pad">
            <input class="formtext" type="text" autocomplete="street-address" placeholder="Strasse &amp; Hausnummer*" maxlength="50" id="Strasse-Hausnummer" name="Strasse-Hausnummer" required />
        </div>

        <div class="col span_1_of_3 pad">
            <input class="formtext" type="text" autocomplete="address-level2" placeholder="PLZ &amp; Ort*" maxlength="50" id="PLZ-Ort" name="PLZ-Ort" required></div>
    </div>

    <div class="section group">
        <div class="col span_1_of_3 pad">
            <input class="formtext" type="email" autocomplete="email" placeholder="E-Mail Adresse*" maxlength="50" id="E-Mail-Adresse" name="E-Mail-Adresse" required></div>

        <div class="col span_1_of_3 pad">
            <input class="formtext" type="tel" autocomplete="tel" placeholder="Telefonnummer*" maxlength="20" id="Telefonnummer" name="Telefonnummer" required></div>

        <div class="col span_1_of_3 pad">
            <input class="formtext" type="text" placeholder="Bemerkungen" maxlength="300" id="Bemerkungen" name="Bemerkungen"></div>
    </div>

    <div class="section group">
        <div class="col span_1_of_1"><br><label for="Datenschutz">* Diese Felder sind Pflichtfelder!<br></label>
            <input type="checkbox" id="Datenschutz" name="Datenschutz" required><label for="Datenschutz">&nbsp;&nbsp;Ja
                ich habe die <a href="datenschutz.php" target="_blank">Datenschutzerklärung</a> gelesen, verstanden und akzeptiert.*</label></div>
    </div>

    <div class="section group">
        <div class="col span_1_of_1">
            <button type="submit" class="button" name="Senden" value="Senden" access="false" id="button">Senden<br></button>
        </div>
    </div>

    <div class="section group success-message">
        <div class="col span_1_of_1">
            <h4 class="red">Vielen Dank für Ihre Anfrage!!</h4><br><label>Wir haben diese erhalten und werden uns umgehend mit Ihnen in Verbindung setzen.</label><br><br>
        </div>
    </div>
</form>

