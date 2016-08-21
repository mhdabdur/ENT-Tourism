var isiCart = [];
// var cartElm = document.getElementById('cart');
var cartList = document.querySelector('#cd-cart>ul');
var removeButton = cartList.querySelectorAll('.cd-item-remove');


var removeCart = function(idx) {
    isiCart.splice(idx, 1);
    // changeCart(cartElm, isiCart.length);
    stash.set('nttCart', isiCart);
}

var changeCart = function(dest, text) {
    dest.innerHTML = text;
}

var addCart = function(event, name, price, count) {
    var isiTmp = [name, price, count];
    var isEdit = false;
    for (var i = 0; i < isiCart.length; i++) {
        if (isiCart[i][0] == name) {
            isiCart[i][2]+=count;
            isEdit = true;
        }
    }
    if (!isEdit){
        isiCart.push(isiTmp);
    }
    // changeCart(cartElm, isiCart.length);
    stash.set('nttCart', isiCart);
    processCart();
}

var clearCart = function() {
    isiCart.length = 0;
    // changeCart(cartElm, isiCart.length);
    stash.cut('nttCart');
}

var clearCartList = function() {
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
}

var processCart = function() {
    clearCartList();

    var totalElm = document.querySelector('.cd-cart-total');
    var total = 0;
    if (isiCart.length == 0) {
        cartList.innerHTML += '<li>No Items<div class="cd-price">Please add your trip plan!</div></li>';
        totalElm.innerHTML = '<p>Total <span>$0</span></p>';
    }else {
        for (var i = 0; i < isiCart.length; i++) {
            var name = isiCart[i][0];
            var price = isiCart[i][1] * isiCart[i][2];
            var count = isiCart[i][2];
            total += price;

            //Add
            cartList.innerHTML += '<li><span class="cd-qty">' + count + 'x</span> ' + name + '<div class="cd-price">$' + price + '</div><a href="#0" class="cd-item-remove cd-img-replace">Remove</a></li>'
        };
        totalElm.innerHTML = '<p>Total <span>$' + total + '</span></p>';
        removeButton = cartList.querySelectorAll('.cd-item-remove');
        addListen();
    }
}


var addListen = function() {
    for (var i = 0, len = removeButton.length; i < len; i++) {

        (function(index) {
            removeButton[i].onclick = function() {
                removeCart(index);
                processCart();
            }
        })(i);

    }
}

var modalcheckout = nanoModal(document.getElementById("checkout-modal"), {
                overlayClose: true,
                buttons: [{
                    text: "Submit",
                    handler: function() {
                        var name = document.getElementById("name").value;
                        modalcheckout.hide();
                        if (name.length < 1) {
                            nanoModal("Error! Enter your Email!", {autoRemove: true}).show().onHide(modalcheckout.show);
                        } else {
                            clearCart();
                            processCart();
                            nanoModal("Thank You, your request will be processed", {autoRemove: true}).show();
                            
                        }
                    },
                    primary: true
                }]
            });

function openCheckout() {
                modalcheckout.show();
            }

document.getElementById('cart-trigger').addEventListener('click', function() {
    var cart = document.getElementById('cd-cart');

    if (cart.style.right != '0%') {
        cart.style.right = '0%';
    } else {

        cart.style.right = '-100%';
    }
}, false);

if (stash.get('nttCart') != null) {
    isiCart = stash.get('nttCart');
}
// changeCart(cartElm,isiCart.length);
processCart();
