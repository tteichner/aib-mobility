var priceForm = {
    selected: null,
    selectedRange: null,

    offers: [],

    host: null,

    init: function(host, index) {
        priceForm.host = host;

        if (!$('#request_vehicle_form').length) {
            return;
        }

        $.getJSON("/offer.json", function(data) {
            priceForm.offers = data;
            priceForm._init(index);
        });
    },

    _init: function(index) {
        $('#request_vehicle_form .success-message').hide();

        // Bind the known values
        var choose = $('#Mietfahrzeug-auswaehlen');
        choose.html('<option disabled selected>Mietfahrzeug auswählen</option>');
        priceForm.offers.forEach(function(o, idx) {
            choose.append('<option value="' + idx + '">' + o.label + '</option>');
        });

        // Import luxon from cdn if not included from local server
        if (typeof luxon === 'undefined') {
            $('head').append('<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/luxon@2.0.2/build/global/luxon.min.js"></script>');
        }

        // Set the statics readonly
        $('#freie-KM, #Preis').each(function() {
            $(this).prop('readonly', true).prop('disabled', true);
        });

        // Bind the change detection
        choose.on('change', function() {
            // The change of vehicle changes everything
            if ($(this).val().match(/^\d+$/)) {
                priceForm.selected = priceForm.offers[$(this).val()];
                priceForm.calculate();
            } else {
                priceForm.selected = null;
                priceForm.selectedRange = null;
                priceForm.calculate();
            }
        });
        $('#weitere-KM, #Datum-von, #Datum-bis').on('change', function() {
            // Date from and to are just triggers for the time based price table
            priceForm.calculate();
        });

        // Auto select
        if (index > 0) {
            choose.val(index - 1 + '');
            choose.trigger('change');
        }

        $('#request_vehicle_form').on('submit', function(e) {
            e.preventDefault();
            var form = $(this);
            var btn = form.find('button[type="submit"]');
            btn.attr('disabled', 'disabled');
            var data = {
                vehicle: priceForm.selected.label,
                from: $('#Datum-von').val(),
                free: $('#freie-KM').val(),
                extra: $('#weitere-KM').val(),
                price: $('#Preis').val(),
                to: $('#Datum-bis').val(),
                address: $('#Strasse-Hausnummer').val(),
                name: $('#Vor-und-Nachname').val(),
                email: $('#E-Mail-Adresse').val(),
                phone: $('#Telefonnummer').val(),
                town: $('#PLZ-Ort').val(),
                notice: $('#Bemerkungen').val(),
                submit: 1
            };
            $.post(priceForm.host, data, function() {
                form.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], textarea, select').val('');
                form.addClass('success');
                $('#request_vehicle_form .success-message').show();
                window.setTimeout(function() {
                    btn.removeAttr('disabled');
                    $('#request_vehicle_form .success-message').hide();
                }, 10000);
            }).fail(function(res) {
                console.log(res);
                btn.removeAttr('disabled');
            });
        });
    },

    calculate: function() {
        var diff = priceForm.lib.duration();
        var matching = null;
        if (priceForm.selected) {
            priceForm.selected.prices.forEach(function(p) {
                if (p.dayFee.from <= diff && (p.dayFee.to === -1 || p.dayFee.to >= diff)) {
                    matching = p;
                }
            });
        }

        var priceView = $('#Preis');
        if (matching) {
            // Add info about included km
            var freeView = $('#freie-KM');
            freeView.val(matching.inclKm * diff);

            // fill the static extra km price
            var extraView = $('#weitere-KM');
            var extra = extraView.val() * priceForm.selected.overUsePrice;
            priceView.val(((matching.dayFee.amount * diff + extra).toFixed(2) + '').replace('.', ',') + ' €');
        } else {
            priceView.val('-,-- €');
        }
    },

    lib: {
        duration: function() {
            var from = $('#Datum-von').val();
            var to = $('#Datum-bis').val();
            var diff = 0;
            if (from && to) {
                from = luxon.DateTime.fromSQL(from);
                to = luxon.DateTime.fromSQL(to);
                diff = Math.abs(from.diff(to, ['days']).days);
            }
            return diff + 1;
        }
    }
};
