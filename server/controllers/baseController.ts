import { Express, Request, Response } from "express";
import { IBaseService } from '../services/baseService';
import logger = require('winston');
import { Result } from '../models/result';

export interface IBaseController<TEntity> {
    create(req: Request, res: Response);
    get(req: Request, res: Response);
    getAll(req: Request, res: Response);
    getById(req: Request, res: Response);
    update(req: Request, res: Response);
    delete(req: Request, res: Response);
}

export class BaseController<TEntity> implements IBaseController<TEntity> {
    public result: Result;

    public constructor(public baseService: IBaseService<TEntity>) {
        this.result = new Result();
    }

    public create(req: Request, res: Response) {
        var data = <TEntity>req.body;

        logger.log('debug', 'base controller  create  data---',data);

        return this.baseService.create(data, (err, item) => {
            if (err) logger.log('debug', 'create  err---', err);

            this.result = {
                Message: ' created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }

    public get(req: Request, res: Response) {
               
        logger.log('debug', 'base controller get------');

        this.baseService.getByUserId(req['userId'], req.query, (err, item) => {
            if (err) logger.log('debug', 'get err---', err);
            
            return res.json(item);
        });
    }

    public getAll(req: Request, res: Response) {
        logger.log('debug', 'base controller getAll------');

        this.baseService.get(req.query, (err, item) => {
            if (err) logger.log('debug', 'get err---', err);

            return res.json(item);
        });
    }

    public getById(req: Request, res: Response) {
        logger.log('debug', 'base controller getById------' + req.params.id);
        
        this.baseService.getById(req.params.id, (err, item) => {
            if (err) logger.log('debug', ' create getById err---', err);

            return res.json(item);
        });
    }

    public update(req: Request, res: Response) {
    
        var data:any = <TEntity>req.body;
        var option = {upsert:true, returnOriginal:true};
         req.params.id = req.params.id ? req.params.id : data._id;
         logger.log('debug', 'base controller  update  data---');

        return this.baseService.update(req.params.id, data, option,(err, item) => {
            if (err) logger.log('debug', 'update  err---', err);

            return res.json(item);
        });
    }

    public delete(req: Request, res: Response) {
         logger.log('debug', 'base controller  delete  data---', req.params.id);

        return this.baseService.delete(req.params.id, (err, item) => {
            if (err) logger.log('debug', 'delete  err---', err);

            return res.json(item);
        });
    }
}  