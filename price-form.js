$(document).ready(function() {
    priceForm.init();
});

var priceForm = {
    selected: null,
    selectedRange: null,

    offers: [
        {
            label: 'Kleinwagen'
        },
        {
            label: 'Mittelklasse'
        },
        {
            label: 'SUV'
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

    init: function() {
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

        // Bind the change detection
        choose.on('change', function() {
            if ($(this).val().match(/^\d+$/)) {
                priceForm.selected = priceForm.offers[$(this).val()];
                priceForm.change();
            }
        });
    },

    calculate: function() {
        var diff = priceForm.lib.duration();
        var matching = null;
        priceForm.selected.prices.forEach(function(p) {
            if (p.dayFee.from <= diff && (p.dayFee.to === -1 || p.dayFee.to >= diff) && p.inclKm === this.selectedRange) {
                matching = p;
            }
        });

        var priceView = $('#Preis');
        if (matching) {
            priceView.val((matching.dayFee.amount * diff) + ',00 €');
        } else {
            priceView.val('-,-- €');
        }
    },

    changeInclRange : function(val) {
        priceForm.selectedRange = val * 1;
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
                var fv = $('<input class="formtext" type="number" value="' + matching[0].inclKm + '" name="freie-KM" id="freie-KM" required="" />');
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

    lib : {
        duration : function() {
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
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this === null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}
