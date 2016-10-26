


module.exports = function (apiRoutes) {

    require("./cart").cart(apiRoutes);
    require("./product").product(apiRoutes);



};