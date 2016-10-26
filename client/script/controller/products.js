
'use strict';
app.controller('productCtrl' , function (products,cart,ajaxService){
    var self = this;
    this.products = products;
    this.count = 0;
    if(cart){
        this.carts = cart.products;
        this.carts.forEach(function (e) {
            self.count += e.quantity
        });
        self.products.forEach(function (el,i) {
            self.carts.forEach(function (e) {
                if(el._id == e.productId){
                    self.products[i].sold = e.quantity
                }
            })
        })
    }


    this.addCart = function (id,ind) {
        ajaxService
            .addCart(id)
            .then(function(){
                self.count++;
                if(self.products[ind].sold){
                    self.products[ind].sold++
                }else{
                    self.products[ind].sold = 1
                }
            },function(error){
                console.log(error);
            });
    };

    this.removeProd = function (pId,ind) {
        ajaxService
            .removeCart(cart._id,pId)
            .then(function(){
                self.count--;
                self.products[ind].sold--
            },function(error){
                console.log(error);
            });
    }

});

