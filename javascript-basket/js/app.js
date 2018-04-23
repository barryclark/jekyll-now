'use strict';

var shop = function () {

    var currencies = [];
    var basket = [];

    // PRIVATE methods

    // Base properties of our item class declared first
    function Item(name, price, qty) {
        this.name = name, this.price = price, this.qty = qty;
    };

    /* Save the basket to Local Storage so it can be passed to another view,
        or retrieved.
        Local Storage requires a string, so our object must be stringified.
    */
    var saveBasket = function saveBasket() {
        localStorage.setItem('basketContents', JSON.stringify(listBasket()));
        renderBasket();
    };

    // Load up the basket from local storage if present
    var loadBasket = function loadBasket() {
        basket = JSON.parse(localStorage.getItem('basketContents')) || [];
    };

    // Return the basket value based on currency of the original Items
    var totalCost = function totalCost() {
        var totalCost = 0;
        for (var i in basket) {
            totalCost += basket[i].price * basket[i].qty;
        }
        return totalCost.toFixed(2);
    };

    // Decouple the basket. Copy it, so it's not a reference.
    // It's an array of objects so needs to be looped over at two levels.
    var listBasket = function listBasket() {
        var basketCopy = [];
        for (var i in basket) {
            var item = basket[i];
            var itemCopy = {};
            for (var p in item[p]) {
                itemCopy[p] = item[p];
            }
            basketCopy.push(item);
        }
        return basketCopy;
    };

    // Fetch currencies from endpoint to populate dropdown.  
    var populateCurrencies = function populateCurrencies() {
        var currencyDropdown = document.querySelector('.js-currencies');
        var currencyTotal = document.querySelector('.js-currency');
        var currencyTpl = '';
        var currencyTplErr = '<li class="dropdown-item dropdown-item--error"> \n        <p>Sorry, no currencies available at the moment!</p>\n        <p>In the meantime, try a manual conversion at <a href="http://xe.com/">Xe.com</a> while we fix it.\n        </li>';

        // Populate dropdown with available currencies
        // set endpoint and our access key
        //const url = 'http://apilayer.net/api/live?access_key=0f0cd603e88461f93914c25ac233252a&format=1';  
        var endpoint = 'live';
        var access_key = '0f0cd603e88461f93914c25ac233252a';

        // get the most recent exchange rates via the "live" endpoint.
        // Using popular jQuery Ajax call for ease of integration and as recommended in API docs.
        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,
            dataType: 'jsonp',
            success: function success(json) {
                if (json.success) {
                    for (var key in json.quotes) {
                        //Get the currency abbreviation from the key name
                        var abbr = key.split('USD')[1];
                        var rate = Number(json.quotes[key].toFixed(2));
                        currencies.push({ abbr: abbr, rate: rate });
                        currencyTpl += '<li class="dropdown-item" data-type="currency" data-name="' + abbr + '" data-rate="' + rate + '"> \n                                ' + abbr + ' - <span class="text-muted"><small>' + rate + '</small></span>\n                            </li>';
                    }
                    currencyDropdown.innerHTML = currencyTpl;
                } else {
                    // Helpful message in dropdown if response doesnt indicate success
                    currencyDropdown.innerHTML = currencyTplErr;
                }
            },
            error: function error(xhr) {
                // Helpful message in dropdown if no currencies can be retrieved
                currencyDropdown.innerHTML = currencyTplErr;
            }
        });
    };

    // Populate the UL element with the items
    var renderBasket = function renderBasket() {
        // Get the latest saved basket
        var currentBasket = listBasket();
        // Cache DOM elements
        var basketEl = document.querySelector('.js-basket-items');
        var totalEl = document.querySelector('.js-totalItems');
        var totalCostEl = document.querySelector('.js-totalCost');
        var step1El = document.querySelector('.js-reveal-step1');
        var step2El = document.querySelector('.js-reveal-step2');

        // Generate new markup
        var lineItems = '';
        currentBasket.forEach(function (item) {
            lineItems += '<li class="list-group-item p-3"> \n                <p class="mb-0 float-left"><strong>' + item.name + '</strong>\n                <span class="text-muted basket-qty">qty: ' + item.qty + '</span>\n                <div class="increment-btns float-right">\n                    <span class="btn btn-outline-danger btn-sm btn-increment js-remove-item" data-type="remove-item" data-name="' + item.name + '">-</span> \n                    <span class="btn btn-outline-success btn-sm btn-increment js-remove-item" data-type="add-item" data-name="' + item.name + '">+</span> \n                </div>\n                </li>';
        });

        // Populate the DOM with updated basket
        basketEl.innerHTML = lineItems;
        totalEl.innerHTML = (currentBasket.length < 1 ? 'Basket empty' : currentBasket.length + ' products') + ' ';
        totalCostEl.innerHTML = totalCost();

        // Hide elements on each basket change if nothing in basket
        if (currentBasket.length < 1) {
            step1El.classList.remove('show');
            step1El.classList.add('hide');
            step2El.classList.remove('show');
            step2El.classList.add('hide');
        } else {
            step1El.classList.remove('hide');
            step1El.classList.add('show');
        }
    };

    // PUBLIC methods returned by shop object

    return {

        // Creates a new item and adds it to the basket
        addItem: function addItem(name, price, qty) {
            console.log('item added: ', name);
            /*  Loop through basket contents to check if item already added.
                Incrementor buttons will reach this flow as item is already present.
            */
            for (var i in basket) {
                if (basket[i].name === name) {
                    basket[i].qty += 1;
                    saveBasket();
                    return;
                }
            }

            // Item doesnt exist in cart. Add it, and save.
            var item = new Item(name, price, qty);
            basket.push(item);
            saveBasket();
        },

        // Handles the click and passes values to basket
        addToBasketBtn: function addToBasketBtn(e) {
            // Get product details from their data attrs
            var name = e.currentTarget.dataset.name;
            var price = Number(e.target.dataset.price || e.target.parentElement.dataset.price);
            var qty = Number(e.target.dataset.qty);
            shop.addItem(name, price, 1);
        },

        // Update total when new currrency is clicked
        updateTotal: function updateTotal(abbr, rate) {
            var totalEl = document.querySelector('.js-totalCost');
            var currencyEl = document.querySelector('.js-currency');
            totalEl.innerHTML = Number((totalCost() * rate).toFixed(2));
            currencyEl.innerHTML = abbr;
        },

        // Handle decrease qty
        removeItem: function removeItem(name) {
            for (var i in basket) {

                // If item is in the basket, minus one from qty
                if (basket[i].name === name) {
                    basket[i].qty--;
                    // Has it reached zero? Remove item from the basket array using function
                    if (basket[i].qty === 0) {
                        shop.removeItemAll(basket[i].name);
                    }
                    // Update the view
                    saveBasket();
                    // Exit this function
                    return;
                }
            }
            saveBasket();
        },

        // If qty is decreased to zero, remove that item
        removeItemAll: function removeItemAll(name) {
            for (var i in basket) {
                // If item is in the basket, remove it
                if (basket[i].name === name) {
                    basket.splice(i, 1);
                    break;
                }
            }
            saveBasket();
        },

        // Shows total products
        countItems: function countItems() {
            var totalItems = 0;
            for (var i in basket) {
                totalItems += basket[i].qty;
            }
            return totalItems;
        },

        // Clear the basket contents, save basket
        clearBasket: function clearBasket() {
            basket = [];
            saveBasket();
        },

        // When clicking Checkout, reveal the total and currency options with CSS
        revealTotals: function revealTotals() {
            var step2El = document.querySelector('.js-reveal-step2');
            step2El.classList.remove('hide');
            step2El.classList.add('show');
        },

        /* Initialise functions on page load
            - Load up a saved basket if there is one
            - Display the basket
            - Attach events to buttons
        */

        init: function init() {
            // Load and render most recent saved basket
            loadBasket();
            renderBasket();
            populateCurrencies();
        }
    };
}();

shop.init();

/* 
    Attach Event listeners, using the public methods
*/

// Product buttons
var buttons = document.querySelectorAll('.js-add-item');
buttons.forEach(function (button) {
    button.addEventListener('click', shop.addToBasketBtn);
});

// Clear button
document.querySelector('.js-clear').addEventListener('click', shop.clearBasket);

// Checkout button
document.querySelector('.js-checkout').addEventListener('click', shop.revealTotals);

// Select currency
document.querySelector('.js-currencies').addEventListener('click', function (e) {
    if (e.target.dataset.type === "currency") {
        var abbr = e.target.dataset.name;
        var rate = e.target.dataset.rate;
        shop.updateTotal(abbr, rate);
    }
});

// Decrease button
document.querySelector('.js-basket-items').addEventListener('click', function (e) {
    if (e.target.dataset.type === "remove-item") {
        var name = e.target.dataset.name;
        shop.removeItem(name);
    }
});

// Increase button
document.querySelector('.js-basket-items').addEventListener('click', function (e) {
    if (e.target.dataset.type === "add-item") {
        var name = e.target.dataset.name;
        shop.addItem(name);
    }
});
//# sourceMappingURL=app.js.map
