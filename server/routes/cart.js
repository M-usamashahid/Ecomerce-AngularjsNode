"use strict";

var cartController = require("../controllers/cart");

exports.cart = function(app){

    app.get('/cart/:id',cartController.add);
    app.get('/cart/:id/:pId',cartController.removeCart);
    app.get('/cart',cartController.findData);
    app.get('/cartDetail',cartController.findAllData);
    app.get('/checkOut',cartController.checkOut)
};

