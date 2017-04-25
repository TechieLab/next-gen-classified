﻿import express = require('express');
import MongoDB = require('mongodb');
import path = require('path');

import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import http = require('http');
import swig = require('swig');
import { MongoDBConnection } from './data/connection';
import {SocketConnection} from './data/socketConnection';
import { ElasticSearchConnection } from './data/ElasticSearchConnection';
import { IndexRoute } from './routes/index';
import { IndexApiRoute } from './routes/indexApi';
import { InitializeSampleDb } from './data/initializeDb';
import Logger from './Logger';

const logger = Logger('server');
var fs = require('fs-extra');
var cors = require('cors');
var app = express();

app.set('port', process.env.PORT || '3000');

swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Register our templating engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

logger.info('Application Started....');

// Application routes
new IndexRoute(app);
new IndexApiRoute(app);


var server = http.createServer(app);

server.listen(app.get('port'), function () {

    fs.mkdirs(path.join(__dirname, '/config'));
    fs.mkdirs(path.join(__dirname, '/views'));

    fs.copy(path.join(__dirname + '/../../server/data/sample'), path.join(__dirname, '/data/sample'), (err) => {
        if (err) return console.error(err);

        MongoDBConnection.getConnection((connection) => {
            this.db = connection;

            new InitializeSampleDb().verifyData();

            logger.debug("db connected......");
        });

        SocketConnection.setup(server);
        // database verification.

        // ElasticSearchConnection.getConnection((connection) => {
        //     this.db = connection;
        //     logger.debug("elastic  connected......");
        // });
    });

    fs.copy(path.join(__dirname + '/../../server/views'), path.join(__dirname, '/views'), (err) => {
        if (err) return console.error(err);

        logger.info("views copied!")
    });

    logger.debug("Express server listening on port " + app.get('port'));
});
//});