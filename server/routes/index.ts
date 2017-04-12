
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

        this.app.get('/images/profiles/:name', function (req, res) {
            return res.sendFile(path.join(__dirname, '../../../uploads/profiles/' + req.params.name));
        });

        this.app.get('/images/posts/:id/:name', function (req, res) {
            return res.sendFile(path.join(__dirname, '../../../uploads/posts/' + req.params.id + '/' + req.params.name));
        });
    }
}

