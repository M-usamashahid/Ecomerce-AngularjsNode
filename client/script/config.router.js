
'use strict';
app.config(["$stateProvider" , "$urlRouterProvider" , function($stateProvider, $urlRouterProvider,ajaxService){
    $stateProvider
        .state('products',{
            url          : '/products',
            templateUrl  : 'views/products.html?v=0.01',
            controller   : 'productCtrl',
            controllerAs :  'vm',
            resolve: {
                products: function(ajaxService){
                    return ajaxService
                        .getProduct()
                        .then(function(data){
                            return data;
                        },function(error){
                            console.log(error);
                        });
                },
                cart: function(ajaxService){
                    return ajaxService
                        .getCart()
                        .then(function(data){
                            console.log(data);
                            return data;
                        },function(error){
                            console.log(error);
                        });
                }
            }
        })

        .state('productDetail' , {
            url          : '/products/:id',
            templateUrl  : 'views/productDetail.html?v=0.01',
            controller   : 'productDetailCtrl',
            controllerAs :  'vm',
            resolve: {
                product: function(ajaxService,$stateParams){
                    if($stateParams.id){
                        return ajaxService
                            .getProductById($stateParams.id)
                            .then(function(data){
                                return data;
                            },function(error){
                                console.log(error);
                            });
                    }
                },
                cart: function(ajaxService){
                    return ajaxService
                        .getCart()
                        .then(function(data){
                            console.log(data);
                            return data;
                        },function(error){
                            console.log(error);
                        });
                }
            }
        })

        .state('checkOut' , {
            url          : '/checkout',
            templateUrl  : 'views/cart.html?v=0.010a0d',
            controller   : 'checkOutCtrl',
            controllerAs :  'vm',
            resolve: {
                cart: function(ajaxService){
                    return ajaxService
                        .getCartDetail()
                        .then(function(data){
                            console.log(data);
                            return data;
                        },function(error){
                            console.log(error);
                        });
                }
            }
        });

    $urlRouterProvider.otherwise('/products');
}]);


