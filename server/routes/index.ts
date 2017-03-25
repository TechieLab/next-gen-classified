
import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
var path = require('path');

export class IndexRoute {    

    constructor(private app: Express) {
        this.app = app;

        this.app.get('/', function (req, res) {
            return res.render('index.html');
        });

        this.app.get('/home', function (req, res) {
            return res.render('index.html');
        });

        this.app.get('/images/:name', function (req, res) {
            return res.sendFile(path.join(__dirname, '../../../uploads/' + req['userId'] + '/'   + req.params.name) );
        });
    }
}

