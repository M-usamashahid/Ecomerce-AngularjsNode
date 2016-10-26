"use strict";

var mongoose            = require("mongoose"),
    Schema              = mongoose.Schema;

var ProductSchema          = new Schema ({

    name                : String,
    price               : String,
    image               : String,
    description         : String,
    isDeleted           : {
        type : Boolean,
        default : false
    }

}, { timestamps: true });

var ProductModel           = mongoose.model('products',ProductSchema);

exports.ProductModel       = function(){
    return ProductModel;
};
