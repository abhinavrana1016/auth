// Import dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Logger = require('./util/logger.util');
//Ensure Environment Variables
// Database connection
require('dotenv').config();
const api = require('./routes/routes');
const dbconfig = require("./config/db.config");
const bodyParser = require('body-parser');

// Initializing app 
const app = express();
// Initializing firebase 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });
/**
 * This application level middleware
 * logs incoming requests to the servers console,
 * useful to see incoming requests
 */
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Parsing Incoming requests
app.use(express.urlencoded({ extended: true }));

// TODO: Cofigure CORS, only accept the same origin
app.use(cors({}));
app.use(bodyParser.json());
app.use('/api/', api);

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Sorry, This route is not found on this server',
    });
});

/**
 * Handle all unhandled rejection API errors
 */
app.use(async function (error, req, res, next) {
    Logger.log('errorHandler', error, req.userId, {
        'query': req?.query,
        'params': req?.params,
        'body': req?.body,
        'route': req?._parsedUrl?.pathname,
        'method': req?.method
    });
    res.status(500).send(error.message || '');
});

module.exports = app;