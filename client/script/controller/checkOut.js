
'use strict';
app.controller('checkOutCtrl',function(cart,ajaxService,$state){
    var vm = this;
    vm.cart = cart;
    vm.total = 0;
    vm.message = null;

    if(cart && cart.products&& cart.products.length ){
        cart.products.forEach(function (e) {

            vm.total += e.quantity * Number(e.productId.price)
        })
    }else{
        vm.message = true
    }

    vm.checkOut = function () {
        ajaxService
            .checkout()
            .then(function(){
                $state.go("products")
            },function(error){
                console.log(error);
            });
    }
});