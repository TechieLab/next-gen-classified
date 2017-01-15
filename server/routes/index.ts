
import {Express, Router, Request, Response} from 'express';
import logger = require('winston');

export class IndexRoute
{   
    app: any;

    constructor(app)
    {   
        this.app = app;
    }

   public getBase()
    {
       this.app.get('/', function (req, res)
       {
           return res.render('index.html');
       });
    }

   public getHome() {
       this.app.get('/home', function (req, res) {
           return res.render('index.html');
       });
   }
}

