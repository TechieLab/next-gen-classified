import { Express, Request, Response } from "express";
import { IBaseService } from '../services/baseService';
import logger = require('winston');
import { ObjectID } from 'mongodb';
import { Result } from '../models/result';

export interface IBaseController<TEntity> {
    createEntity(req: Request, res: Response);
    getEntities(req: Request, res: Response);
    getEntity(req: Request, res: Response);
    updateEntity(req: Request, res: Response);
    deleteEntity(req: Request, res: Response);
}

export class BaseController<TEntity> implements IBaseController<TEntity> {
    public result: Result;

    public constructor(public baseService: IBaseService<TEntity>) {
        this.result = new Result();
    }

    public createEntity(req: Request, res: Response) {
        var data = <TEntity>req.body;
        
        logger.log('debug', 'create entity data---', data);

        return this.baseService.create(data, (err, item) => {
            if (err) logger.log('debug', 'create entity err---', err);

            this.result = {
                Message: 'Entity created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }

    public getEntities(req: Request, res: Response) {
        var userId = req['userId'];

        this.baseService.get(userId, req.query, (err, item) => {
            if (err) logger.log('debug', 'getEntities err---', err);

            logger.log('debug', 'getEntities')

            return res.json(item);
        });
    }

    public getEntity(req: Request, res: Response) {

        var id = req.query.id;

        this.baseService.getById(id, (err, item) => {
            if (err) logger.log('debug', 'create getById err---', err);

            return res.json(item);
        });
    }

    public updateEntity(req: Request, res: Response) {
        var id = new ObjectID();
        var data = <TEntity>{};

        return this.baseService.update(id, data, (err, item) => {
            if (err) logger.log('debug', 'update entity err---', err);

            return res.json(item);
        });
    }

    public deleteEntity(req: Request, res: Response) {
        var id = new ObjectID();
        return this.baseService.delete(id, (err, item) => {
            if (err) logger.log('debug', 'delete entity err---', err);

            return res.json(item);
        });
    }
}  