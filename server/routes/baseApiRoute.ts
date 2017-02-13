import { Express, Router, Request, Response } from 'express';
import { IBaseService, BaseService } from '../services/baseService';
import { IBaseRepository, BaseRepository } from '../repository/baseRepository';
import { BaseController, IBaseController } from '../controllers/baseController';
import logger = require('winston');

export interface IBaseApiRoute<TEntity> {
    get();
    getById();
   // post();
    put();
    del();
}

var self;
export class BaseApiRoute<TEntity> implements IBaseApiRoute<TEntity>
{
    baseController: IBaseController<TEntity>;
    baseService: IBaseService<TEntity>;

    constructor(public app: Express, public apiName: string) {
        this.app = app;
        self = this;

        this.get();
        this.getById();
        //this.post();
        this.put();
        this.del();
    }

    setCollection(apiName) {
        var repository = new BaseRepository(apiName);
        this.baseService = new BaseService(repository);
        this.baseController = new BaseController(this.baseService);
    }

    get() {
        this.app.get('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            console.log("route name ----" + this.apiName);
            self.baseController.getEntities(req, res);
        });
    }

    getById() {
        this.app.get('/api/' + this.apiName + '/:id', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.getEntity(req, res);
        });
    }

    post() {
        this.app.post('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.createEntity(req, res);
        });
    }

    put() {
        this.app.put('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.updateEntity(req, res);
        });
    }

    del() {
        this.app.delete('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.deleteEntity(req, res);
        });
    }
}