import { Express, Request, Response } from "express";
import {IBaseService} from '../services/baseService';
import logger = require('winston');

 export interface IBaseController<TEntity> {
        createEntity(req: Request, res: Response);
        getEntities(req: Request, res: Response);
        getEntity(req: Request, res: Response);
        updateEntity(req: Request, res: Response);
        deleteEntity(req: Request, res: Response);
    }

var self;
export class BaseController<TEntity> implements IBaseController<TEntity> {

    public baseService : IBaseService<TEntity>;

    public constructor(baseService :  IBaseService<TEntity>) {
        self = this;
        self.baseService = baseService;
    }

    public createEntity(req: Request, res: Response) {
       var data = <TEntity>{};

       return this.baseService.create(data, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
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