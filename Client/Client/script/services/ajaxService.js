app.service("ajaxService", function( $http, $q ) {

    // Return public API.
    var baseURL = 'http://localhost:3000';




    function getProduct() {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/product'
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function getProductById(id) {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/product/'+id
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function getCart() {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/cart'
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function getCartDetail() {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/cartDetail'
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function checkout() {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/checkOut'
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function addCart(id) {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/cart/'+id
        });
        return ( request.then(handleSuccess, handleError) );
    }

    function removeCart(id,pId) {
        var request = $http({
            method  : 'GET',
            url     : baseURL+'/cart/'+ id + '/' + pId
        });
        return ( request.then(handleSuccess, handleError) );
    }


//----------------------------------------------------------------------------------------------------------------------
    // ---
    // PRIVATE METHODS.
    // ---

    function handleError( response ) {
        console.log('Error');
        return( $q.reject( response.data.error ) );
    }

    function handleSuccess(response) {
        if(response.status){
            return( response.data.response );
        }else{
            handleError(response)
        }
    }

//----------------------------------------------------------------------------------------------------------------------

    return {
        getProductById        : getProductById,
        getCartDetail         : getCartDetail,
        getProduct            : getProduct,
        removeCart            : removeCart,
        checkout              : checkout,
        addCart               : addCart,
        getCart               : getCart
    };

});
