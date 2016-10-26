/**
 * Created by M Usama Shahid on 9/28/2016.
 */

var env             = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config          = require('./config'),
// Custom winston logger
    logger          = require('./log'),
    express         = require('express'),
    methodOverride  = require('method-override'),
    cors            = require('cors'),
   // redisClient     = require('./redis'),
// RedisStore       = require('connect-redis')(express),
    bodyParser      = require('body-parser'),
// gzip/deflate outgoing responses
    compression     = require('compression'),
// Express HTTP access and error logging
// Default winston logger for express-winston to use
    /*winston         = require('winston'),
    expressWinston  = require('express-winston'),*/
    morgan          = require('morgan'),
   // multer          = require('multer'),
    path            = require('path');



module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    app.use(bodyParser.json({limit: '10mb'}));

    app.disable('x-powered-by');
    app.use(morgan('dev'));
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, '../static')));
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'ejs');
    app.use(cors());
    app.set('superSecret', config.secret);

    /* app.use(multer({
         dest: './app/files'
     }));*/
   // app.use(compression);

};