"use strict";

var mongoose            = require("mongoose"),
    Schema              = mongoose.Schema;

var CartSchema          = new Schema ({

    products           : [{
        productId : {type : Schema.ObjectId , ref : 'products'},
        quantity  : Number
    }],
    isCheckout    : Boolean


}, { timestamps: true });

var CartModel           = mongoose.model('carts',CartSchema);

exports.CartModel       = function(){
    return CartModel;
};
