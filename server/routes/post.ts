import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';
import {IPostingService,PostingService} from '../services/postingService';
import {IPostingRepository,PostingRepository} from '../repository/postingRepository';
import {PostingController,IPostingController} from '../controllers/postingController';
import logger = require('winston');

export class PostRoute
{
    postingController: IPostingController;  
    service: IPostingService;  
    app: Express;

    constructor(app: Express)
    {
        this.app = app;

        var repository = new PostingRepository()
        this.service = new PostingService(repository);
        this.postingController = new PostingController(this.service);
    }

    getRoutes()
    {   
        this.app.post('/api/posts/', this.postingController.createEntity);
        this.app.get('/api/posts/', this.postingController.getEntities)
    }
}