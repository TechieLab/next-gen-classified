
import { Express, Request, Response } from "express";
import logger = require('winston');
import {IBaseService} from '../services/baseService';

 export interface IBaseController<TEntity> {
        createEntity();
        getEntities(req: Request, res: Response);
        getEntity(req: Request, res: Response);
        updateEntity();
        deleteEntity();
    }

export class BaseController<TEntity> {

    public baseService : IBaseService<TEntity>;

    public constructor(baseService :  IBaseService<TEntity>) {

    }

    public createEntity() {
        //return (this.movieService.create());
    }

    public getEntities(req: Request, res: Response) {

        var sortKey = req.query.sortKey;
        var sortOrder = req.query.sortOrder;

        this.baseService.getAll(sortKey, sortOrder, function (err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }

    public getEntity(req: Request, res: Response) {

        var query = { rating: { $gt: 4 } }

       this.baseService.getByQuery(query, null, null, function (err, item) {
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