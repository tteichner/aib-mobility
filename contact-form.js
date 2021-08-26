var contactForm = {
    host: null,

    init: function(host) {
        contactForm.host = host;

        $('#contact_form').on('submit', function(e) {
            e.preventDefault();

            var form = $(this);
            var btn = form.find('button[type="submit"]');
            btn.attr('disabled', 'disabled');
            var data = {
                name: $('#Vor-und-Nachname').val(),
                email: $('#E-Mail-Adresse').val(),
                phone: $('#Telefonnummer').val(),
                address: $('#Strasse-Hausnummer').val(),
                city: $('#PLZ-Ort').val(),
                notice: $('#Nachricht').val(),
                submit: 1
            };
            $.post(priceForm.host, data, function() {
                btn.removeAttr('disabled');
                form.find('input[type="text"], input[type="tel"], input[type="email"], input[type="date"], textarea, select').val('');
                form.addClass('success');
                window.setTimeout(function() {
                    btn.removeAttr('disabled');
                }, 10000);
            }).fail(function(res) {
                console.log(res);
                btn.removeAttr('disabled');
            });
        });
    }
};
