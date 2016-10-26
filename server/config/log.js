'use strict';

var env         = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    winston     = require('winston'),
    config      = require('./config');

var logger;

//winston.remove(winston.transports.Console);

logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename: config.root + '/log/' + env + '.log',
            maxsize: config.logMaxFileSize,
            maxfiles: 10
        })
    ]
});

module.exports = logger;
