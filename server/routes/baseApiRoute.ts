import {Express, Router, Request, Response} from 'express';
import {IBaseService,BaseService} from '../services/baseService';
import {IBaseRepository,BaseRepository} from '../repository/baseRepository';
import {BaseController,IBaseController} from '../controllers/baseController';
import logger = require('winston');

export interface IBaseApiRoute<TEntity>{
    get();
    getById();
    post();
    put();
    del();
}

var self;
export class BaseApiRoute<TEntity> implements IBaseApiRoute<TEntity>
{
    baseController: IBaseController<TEntity>;  
    baseService: IBaseService<TEntity>;  

    constructor(public app: Express, public apiName : string )
    {
        this.app = app;
        self = this;

        var repository = new BaseRepository(apiName);
        this.baseService = new BaseService(repository);
        this.baseController = new BaseController(this.baseService);

        this.get();
        this.getById();
        this.post();
        this.put();
        this.del();
    }

    get()
    {   
        this.app.get('/api/' + this.apiName + '/', this.baseController.getEntities)
    }

    getById()
    {   
        this.app.get('/api/' + this.apiName + '/:id', this.baseController.getEntity)
    }   

     post()
    {   
        this.app.post('/api/' + this.apiName + '/', this.baseController.createEntity)
    }

     put()
    {   
        this.app.put('/api/' + this.apiName + '/', this.baseController.updateEntity)
    }

     del()
    {   
        this.app.delete('/api/' + this.apiName + '/', this.baseController.deleteEntity)
    }
}