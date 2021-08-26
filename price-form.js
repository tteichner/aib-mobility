var priceForm = {
    selected: null,
    selectedRange: null,

    offers: [
        {
            label: 'Kleinwagen',
            overUsePrice: 0.20,
            prices: [
                {
                    inclKm: 100,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 38
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 45
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 4,
                        to: 7,
                        amount: 36
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 8,
                        to: 10,
                        amount: 34
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 11,
                        to: 13,
                        amount: 32
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 14,
                        to: -1,
                        amount: 29
                    }
                }
            ]
        },
        {
            label: 'Mittelklasse',
            overUsePrice: 0.20,
            prices: [
                {
                    inclKm: 100,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 58
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 65
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 4,
                        to: 7,
                        amount: 62
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 8,
                        to: 10,
                        amount: 58
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 11,
                        to: 13,
                        amount: 55
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 14,
                        to: -1,
                        amount: 49
                    }
                }
            ]
        },
        {
            label: 'SUV',
            overUsePrice: 0.30,
            prices: [
                {
                    inclKm: 100,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 99
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 115
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 4,
                        to: 7,
                        amount: 105
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 8,
                        to: 10,
                        amount: 102
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 11,
                        to: 13,
                        amount: 99
                    }
                },
                {
                    inclKm: 200,
                    dayFee: {
                        from: 14,
                        to: -1,
                        amount: 95
                    }
                }
            ]
        },
        {
            label: '9-Sitzer Bus',
            overUsePrice: 0.25,
            prices: [
                {
                    inclKm: 150,
                    dayFee: {
                        from: 1,
                        to: 3,
                        amount: 79
                    }
                },
                {
                    inclKm: 150,
                    dayFee: {
                        from: 4,
                        to: 7,
                        amount: 73
                    }
                },
                {
                    inclKm: 150,
                    dayFee: {
                        from: 8,
                        to: 10,
                        amount: 65
                    }
                },
                {
                    inclKm: 150,
                    dayFee: {
                        from: 11,
                        to: 13,
                        amount: 58
                    }
                },
                {
                    inclKm: 150,
                    dayFee: {
                        from: 14,
                        to: -1,
                        amount: 49
                    }
                }
            ]
        }
    ],

    host: null,

    init: function(host) {
        priceForm.host = host;

        if (!$('#request_vehicle_form').length) {
            return;
        }

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
        $('#weitere-KM, #freie-KM, #Preis').each(function() {
            $(this).prop('readonly', true);
        });

        // Bind the change detection
        choose.on('change', function() {
            // The change of vehicle changes everything
            if ($(this).val().match(/^\d+$/)) {
                priceForm.selected = priceForm.offers[$(this).val()];
                priceForm.change();
            } else {
                priceForm.selected = null;
                priceForm.selectedRange = null;
                priceForm.calculate();
            }
        });
        $('#Datum-von, #Datum-bis').on('change', function() {
            // Date from and to are just triggers for the time based price table
            priceForm.calculate();
        });

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
                street: $('#Strasse-Hausnummer').val(),
                name: $('#Vor-und-Nachname').val(),
                email: $('#E-Mail-Adresse').val(),
                phone: $('#Telefonnummer').val(),
                zip: $('#PLZ-Ort').val(),
                notice: $('#Bemerkungen').val(),
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
    },

    calculate: function() {
        var diff = priceForm.lib.duration();
        var matching = null;
        if (priceForm.selected) {
            priceForm.selected.prices.forEach(function(p) {
                if (p.dayFee.from <= diff && (p.dayFee.to === -1 || p.dayFee.to >= diff) && p.inclKm === priceForm.selectedRange) {
                    matching = p;
                }
            });
        }

        var priceView = $('#Preis');
        if (matching) {
            priceView.val((matching.dayFee.amount * diff) + ',00 €');
        } else {
            priceView.val('-,-- €');
        }
    },

    changeInclRange: function(val) {
        priceForm.selectedRange = val * 1;
        priceForm.calculate();
    },

    change: function() {
        if (priceForm.selected) {
            var matching = [];
            var diff = priceForm.lib.duration();
            priceForm.selected.prices.forEach(function(p) {
                if (p.dayFee.from <= diff && (p.dayFee.to === -1 || p.dayFee.to >= diff)) {
                    matching.push(p);
                }
            });

            // fill the static extra km price
            var extraView = $('#weitere-KM');
            extraView.val(priceForm.selected.overUsePrice);

            // update the gui to make the available prices for different included ranges selectable on demand
            var freeView = $('#freie-KM');
            if (matching.length === 1) {
                // 1 option found
                var fv = $('<input class="formtext" type="number" readonly value="' + matching[0].inclKm + '" name="freie-KM" id="freie-KM" required="" />');
                freeView.replaceWith(fv);
                priceForm.selectedRange = matching[0].inclKm;
            } else if (matching.length === 0) {
                freeView.val('');
            } else {
                // multiple options available
                var fvs = $('<select class="formtext" name="freie-KM" id="freie-KM" required="">' +
                    '<option value="" disabled selected>incl. KM Option wählen</option>' +
                    '</select>');
                matching.forEach(function(m) {
                    fvs.append('<option value="' + m.inclKm + '">' + m.inclKm + '</option>');
                });
                freeView.replaceWith(fvs);
                fvs.on('change', function() {
                    priceForm.changeInclRange($(this).val());
                });
            }

            priceForm.calculate();
        }
    },

    lib: {
        duration: function() {
            var from = $('#Datum-von').val();
            var to = $('#Datum-bis').val();
            var diff = 1;
            if (from && to) {
                from = luxon.DateTime.fromSQL(from);
                to = luxon.DateTime.fromSQL(to);
                diff = Math.abs(from.diff(to, ['months', 'days', 'hours', 'minutes', 'seconds']).days);
            }
            return diff;
        }
    }
};
