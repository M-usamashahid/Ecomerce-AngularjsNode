"use strict";

var productController = require("../controllers/product");

exports.product = function(app){

    /**
     * @api {get} /product Get all Products
     * @apiName getProduct
     * @apiGroup Products
     *
     *  @api {Post} /product Add products with faker module
     * @apiName CreateProduct
     * @apiGroup Products
     *
     * @apiSuccess {Boolean} status True.
     * @apiSuccess {Object[]} response  Array of objects.
     * @apiSuccess {String} Error Null
     *
     * @apiError {Boolean} status False.
     * @apiError {Object[]} response  Null.
     * @apiError {String} Error message
     *
     */

    app.route('/product')
        .get    ( productController.getProducts)
        .post   ( productController.createProduct);


    /**
     * @api {get} /product Get Product with param :id
     * @apiName getProductByID
     * @apiGroup Products
     *
     * @api {delete} /product Delete Product with param :id
     * @apiName deleteProduct
     * @apiGroup Products
     *
     * @api {put} /product Update Product with param :id
     * @apiName updateProduct
     * @apiGroup Products
     *
     * @apiParam {String} :id Id of the product ( /230948230942 )
     *
     * @apiSuccess {Boolean} status True.
     * @apiSuccess {Object[]} response  Array of objects.
     * @apiSuccess {String} Error Null
     *
     * @apiError {Boolean} status False.
     * @apiError {Object[]} response  Null.
     * @apiError {String} Error message
     *
     */

    app.route('/product/:id')
        .get    ( productController.getProductByID)
        .delete ( productController.deleteProduct)
        .put    ( productController.updateProduct);

};

