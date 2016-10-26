'use strict';
app.controller('productDetailCtrl', function(product,cart,ajaxService,$stateParams){
    console.log(product);
    var vm = this;
    vm.product = product;
    vm.count = 0;
    if(cart && cart.products && cart.products.length){
        vm.count = cart.products.length
    }

    this.addCart = function () {
        var id = $stateParams.id;
        ajaxService
            .addCart(id)
            .then(function(){
                vm.count++;
            },function(error){
                console.log(error);
            });
    };
});