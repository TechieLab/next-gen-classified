/// <reference path='../typings/index.d.ts' />

import express = require('express');
import MongoDB = require('mongodb');
import path = require('path');
import logger = require('winston');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import http = require('http');
import swig = require('swig');

import { IndexRoute } from './routes/index';
import { UserRoute } from './routes/user';

var app = express();

app.set('port', process.env.PORT || '3000');



swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../app')));


// Register our templating engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + './dist/app');
app.set('view cache', true);

// create a write stream (in append mode) 
logger.add(logger.transports.File, { filename: 'server.log' });
//logger.remove(logger.transports.Console);

logger.log('info', 'Application Started....');

logger.level = 'debug';

// database verification.
//new InitialData(db).verifyData();

// Application routes
var indexRoute = new IndexRoute(app);
indexRoute.getBase();
// indexRoute.getMovies();
//indexRoute.getHome();
//indexRoute.getMoviesDetails();

 var movieRoute = new UserRoute(app);
 movieRoute.getRoutes();

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});