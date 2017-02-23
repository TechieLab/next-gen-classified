import { Express, Request, Response } from "express";
import { IBaseService } from '../services/baseService';
import logger = require('winston');
import { ObjectID } from 'mongodb';
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
        
        logger.log('debug', 'base controller  create  data---', data);

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

        req.query.UserId = <ObjectID>(req['userId']);

        this.baseService.get(req.query, (err, item) => {
            if (err) logger.log('debug', 'get err---', err);

            logger.log('debug', 'base controller get')

            return res.json(item);
        });
    }

    public getAll(req: Request, res: Response) {     
        this.baseService.get(req.query, (err, item) => {
            if (err) logger.log('debug', 'get err---', err);

            logger.log('debug', 'base controller get')

            return res.json(item);
        });
    }

    public getById(req: Request, res: Response) {  
        this.baseService.getById(<ObjectID>req.params.id, (err, item) => {
            if (err) logger.log('debug', ' create getById err---', err);

            return res.json(item);
        });
    }

    public update(req: Request, res: Response) {
        var data = <TEntity>req.body;

        return this.baseService.update(new ObjectID(req.params.id), data, (err, item) => {
            if (err) logger.log('debug', 'update  err---', err);

            return res.json(item);
        });
    }

    public delete(req: Request, res: Response) {     
        return this.baseService.delete(new ObjectID(req.params.id), (err, item) => {
            if (err) logger.log('debug', 'delete  err---', err);

            return res.json(item);
        });
    }
}  