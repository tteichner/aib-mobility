var contactForm = {
    host: null,

    init: function(host) {
        contactForm.host = host;

        $('#contact_form .success-message').hide();

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
            $.post(contactForm.host, data, function() {
                btn.removeAttr('disabled');
                form.find('input[type="text"], input[type="tel"], input[type="email"], input[type="date"], textarea, select').val('');
                form.addClass('success');
                $('#contact_form .success-message').show();
                window.setTimeout(function() {
                    btn.removeAttr('disabled');
                    $('#contact_form .success-message').hide();
                }, 10000);
            }).fail(function(res) {
                console.log(res);
                btn.removeAttr('disabled');
            });
        });
    }
};
