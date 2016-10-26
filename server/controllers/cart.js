"use strict";

var repository              = require('../repository/index'),
    models                  = require('../models/index').allModels,
    constants               = require('../helper/constants');


exports.add = function (req, res) {
    var query = {
        products : {
            $elemMatch :{
                productId : req.params.id
            }
        },
        isCheckout : false
    };

    repository.getData(models.CartModel,query,true)
        .then(function (product) {
                if (!product) {
                    query = {
                        isCheckout : false
                    };
                    repository.getData(models.CartModel,query,true)
                        .then(function (pro) {
                                if(pro){
                                    var obj = {
                                        productId : req.params.id,
                                        quantity  : 1
                                    };
                                    pro.products.push(obj);
                                    pro.save(function (err, data) {
                                        if(err){
                                            res.status(400).json({"status":false, "response":null, "error":err });

                                        }
                                        res.status(200).json({"status":true, "response":true, "error":null });
                                    })
                                }else{
                                    var doc = {
                                        products : [{
                                            productId : req.params.id,
                                            quantity  : 1
                                        }],
                                        isCheckout : false
                                    };
                                    repository.saveData(models.CartModel,doc)
                                        .then(function(Product){
                                            console.log("Product saved");
                                            res.send({
                                                "status": true,
                                                "response": true,
                                                "error": null
                                            });
                                        },function(err){
                                            console.log("error in saving the data");
                                            res.send({
                                                "status":false,
                                                "response":null,
                                                "error":err
                                            })
                                        });
                                }
                            },
                            function(err){
                                if (err) throw err;
                            });

                } else if (product) {

                    product.products.forEach(function (e,i) {
                        if(e.productId == req.params.id){
                            product.products[i].quantity++
                        }
                    });
                    product.save(function (err, data) {
                        if(err){
                            res.status(400).json({"status":false, "response":null, "error":err });

                        }
                        res.status(200).json({"status":true, "response":true, "error":null });
                    })
                }
            },
            function(err){
                if (err) throw err;
            });
};

exports.removeCart = function (req, res) {
    var query = {
        _id : req.params.id
    };
    var doc = {
        $pull : {
            products : {
                productId : req.params.pId
            }
        }
    };
    repository.getData(models.CartModel,query,true)
        .then(function (pro) {

            pro.products.forEach(function (e,i) {
                if(e.productId == req.params.pId){
                    if(e.quantity > 1){
                        pro.products[i].quantity--;
                        pro.save(function (err) {
                            if(err){
                                res.status(400).json({"status":false, "response":null, "error":err });

                            }
                            res.status(200).json({"status":true, "response":true, "error":null });
                        })
                    }else {
                        repository.updateData(models.CartModel,query,doc)
                            .then(function () {
                                res.status(200).json({"status":true, "response":true, "error":null });
                            })
                    }
                }

            });
        })
};

exports.findData = function (req, res) {

    var query = {
        isCheckout : false
    };
    repository.getData(models.CartModel,query,true)
        .then(function (pro) {
            res.status(200).json({"status": true, "response": pro, "error": null});
        })
};

exports.findAllData = function (req, res) {

    var query = {
        isCheckout : false
    };
    repository.getData(models.CartModel,query,true,null,'products.productId')
        .then(function (pro) {
            res.status(200).json({"status": true, "response": pro, "error": null});
        })
};

exports.checkOut = function (req, res) {

    var query = {
        isCheckout : false
    };
    var doc = {
        isCheckout : true
    };
    repository.updateData(models.CartModel,query,doc)
        .then(function (pro) {
            res.status(200).json({"status": true, "response": true, "error": null});
        })
};

