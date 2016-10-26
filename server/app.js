"use strict";

var config              = require('./config/config'),
    express             = require('express'),
    logger              = require('./config/log');


var app = express();    // calling express

/* Mongodb and Mongoose setup and configs Start */

require('./config/mongoose');

/* Express Config Start ------------------------*/

require('./config/express')(app);

/* ROUTES FUNCTIONS Start 25-jan-2016------------*/

var apiRoutes = express.Router();

require('./routes/index')(apiRoutes);

app.use(apiRoutes);

/* Server function Start Listening --------------*/

app.set('port', config.port);

var server = app.listen(app.get('port'),function(){
    var msg = 'Express App server listening on Port : ' + app.get('port');
    console.log(msg);
    logger.info(msg);
});
