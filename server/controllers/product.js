"use strict";

var repository              = require('../repository/index'),
    models                  = require('../models/index').allModels,
    constants               = require('../helper/constants'),
    faker                   = require('faker');



function getProducts(req, res){

    repository.getData(models.ProductModel,{},false, null,null,'name')
        .then(function (product) {
                if (!product) {
                    res.send({
                        "status":false,
                        "response":null,
                        "error":[constants.not_found]
                    });
                } else if (product) {
                    res.send({
                        "status":true,
                        "response":product,
                        "error":null
                    });
                }
            },
            function(err){
                if (err) throw err;
            });

}

function getProductByID(req, res){

    if(req.params && req.params.id){

        var body  = req.params;
        var query = {
            _id : body.id
        };
        repository.getData(models.ProductModel,query,true)
            .then(function (product) {
                    if (!product) {
                        res.send({
                            "status":false,
                            "response":null,
                            "error":[constants.not_found]
                        });
                    } else if (product) {
                        res.send({
                            "status":true,
                            "response":product,
                            "error":null
                        });
                    }
                },
                function(err){
                    if (err) throw err;
                });
    }
}



function createProduct(req, res){

    var PRODUCT_COUNT = 10;
    var products = [];

    for(var i=0; i<PRODUCT_COUNT; i++) {
        var obj = {
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.image(),
            description: faker.lorem.sentence()
        };
        products.push(obj);
    }

    repository.bulkInsert(models.ProductModel,products)
        .then(function(Product){
            console.log("Product saved");
            res.send({
                "status": true,
                "response": Product.ops,
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

function updateProduct(req, res){
    if(req.params && req.params.id){

        var body  = {$set : req.body};
        console.log('/product Update ------------------');
        console.log(body);

        var query = {
            _id : req.params.id
        };
        repository.updateData(models.ProductModel,query,body)
            .then(function(product){
                console.log("Order saved");
                res.send({
                    "status": true,
                    "response": product,
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
}

function deleteProduct(req, res){

    if(req.params && req.params.id){

        var  query = {
            _id : req.params.id
        };
        repository.updateData(models.ProductModel,query,{isDeleted: true})
            .then(function (product) {
                    if (!product) {
                        res.send({
                            "status":false,
                            "response":null,
                            "error":[constants.not_found]
                        });
                    } else if (product) {
                        res.send({
                            "status":true,
                            "response":true,
                            "error":null
                        });
                    }
                },
                function(err){
                    if (err) throw err;
                });

    }else{

        res.send({
            "status":true,
            "response":null,
            "error":'Missing required parameter '
        });

    }
}



exports.getProducts           = getProducts;
exports.createProduct         = createProduct;
exports.updateProduct         = updateProduct;
exports.deleteProduct        = deleteProduct;
exports.getProductByID       = getProductByID;