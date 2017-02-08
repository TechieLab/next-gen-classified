
import { Express, Router, Request, Response } from 'express';
import logger = require('winston');

export class IndexRoute {    

    constructor(private app: Express) {
        this.app = app;

        this.app.get('/', function (req, res) {
            return res.render('index.html');
        });

        this.app.get('/home', function (req, res) {
            return res.render('index.html');
        });
    }
}

