"use strict";

var mongoose    = require('mongoose'),
    logger      = require('./log');

//Local Database
var connection = 'mongodb://localhost/devCrew';



var env = process.env.NODE_ENV || 'development';

var dbURI = connection;
// Mongoose connection events

// Mongoose connecting event
mongoose.connection.on('connecting', function () {
    logger.info('Mongoose connecting ');
    console.info('Mongoose connecting');
});

// Mongoose conneccted event
mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected ' );
    console.info('Mongoose connected ');
});

// Mongoose open event
mongoose.connection.once('open', function () {
    logger.info('Mongoose connection opened ');
    console.info('Mongoose connection opened ');
});

// Mongoose reconnected event
mongoose.connection.on('reconnected', function () {
    logger.info('Mongoose reconnected ');
    console.info('Mongoose reconnected ');
});

// Mongoose disconnected event
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
    console.info('Mongoose disconnected');
});

// Mongoose error event
mongoose.connection.on('error', function (error) {
    logger.error('Mongoose: ' + error);
    console.error('Mongoose: ' + error);
    mongoose.disconnect();
});

// Mongoose SIGINT event
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info('Mongoose disconnected through app termination');
        console.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

// Create the database connection
mongoose.connect(
    dbURI,
    {server: {auto_reconnect: true}}
);