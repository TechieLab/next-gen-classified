import { Express, Request, Response } from "express";
import {IBaseService} from '../services/baseService';
import logger = require('winston');

 export interface IBaseController<TEntity> {
        createEntity();
        getEntities(req: Request, res: Response);
        getEntity(req: Request, res: Response);
        updateEntity();
        deleteEntity();
    }

var self;
export class BaseController<TEntity> implements IBaseController<TEntity> {

    public baseService : IBaseService<TEntity>;

    public constructor(baseService :  IBaseService<TEntity>) {
        self = this;
        self.baseService = baseService;
    }

    public createEntity() {
        //return (this.movieService.create());
    }

    public getEntities(req: Request, res: Response) {

        var sortKey = req.query.sortKey;
        var sortOrder = req.query.sortOrder;

        self.baseService.getAll(sortKey, sortOrder, function (err, item) {
            if (err) console.log(err);

            logger.log('debug', 'getEntities')

            return res.json(item);
        });
    }

    public getEntity(req: Request, res: Response) {

        var query = { rating: { $gt: 4 } }

       self.baseService.getByQuery(query, null, null, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }  

    public updateEntity() {
        var id = "";
        return this.baseService.update(id);
    }

    public deleteEntity() {
        var id = "";
        return this.baseService.delete(id);
    }
}  