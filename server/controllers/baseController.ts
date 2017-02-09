import { Express, Request, Response } from "express";
import {IBaseService} from '../services/baseService';
import logger = require('winston');
import {Result} from '../models/result';

 export interface IBaseController<TEntity> {
        createEntity(req: Request, res: Response);
        getEntities(req: Request, res: Response);
        getEntity(req: Request, res: Response);
        getEntityByQuery(query: Object, callback: (errr: Error, item: Array<TEntity>) => any);
        updateEntity(req: Request, res: Response);
        deleteEntity(req: Request, res: Response);
    }

var self;
export class BaseController<TEntity> implements IBaseController<TEntity> {  
    public result : Result; 
    public constructor(public baseService :  IBaseService<TEntity>) {
        self = this;
        self.result = <Result>{};
        self.baseService = baseService;
    }

    public createEntity(req: Request, res: Response) {
       var data = <TEntity>req.body;
       console.log(data);

       return self.baseService.create(data, function (err, item) {
            if (err) console.log(err);

            self.result = {
                Meesage : 'Entity created',
                Success : true,
                Content: item
            }; 

            return res.json(self.result);
        });
    }

    public getEntities(req: Request, res: Response) {

        var sortKey = req.query.sortKey;
        var sortOrder = req.query.sortOrder;

        self.baseService.get(function (err, item) {
            if (err) console.log(err);

            logger.log('debug', 'getEntities')

            return res.json(item);
        });
    }

     public getEntityByQuery(query, callback: (errr: Error, item: Array<TEntity>) => any) {  
        this.baseService.getByQuery(query, callback);
    }

    public getEntity(req: Request, res: Response) {

        var id = req.query.id;

       self.baseService.getById(id, null, null, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }  

    public updateEntity(req: Request, res: Response) {
        var id = "";
        var data = <TEntity>{};

        return this.baseService.update(id, data, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }

    public deleteEntity(req: Request, res: Response) {
        var id = "";
        return this.baseService.delete(id, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }
}  