import { Express, Request, Response } from "express";
import { IBaseService } from '../services/baseService';
import logger = require('winston');
import { Result } from '../models/result';

export interface IBaseController<TEntity> {
    create(req: Request, res: Response);
    get(req: Request, res: Response);
    getCount(req: Request, res: Response);
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
            if (err) {
                return res.json(err);
            }

            this.result = {
                Message: 'Item Created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }

    public get(req: Request, res: Response) {        

        if (req.query.UserId == '') {
            delete req.query["UserId"];
        } else {
            req.query.UserId = req['userId'];
        }

        logger.debug('base controller get userid------', req.query);

        this.baseService.get(req.query, (err, item) => {
            if (err) {
                return res.json(err);
            }
            return res.json(item);
        });
    }

    public getCount(req: Request, res: Response) {
        logger.log('debug', 'base controller getCount------');

        this.baseService.getCount({ UserId: req['userId'] }, (err, item) => {
            if (err) {
                return res.json(err);
            }

            return res.json(item);
        });
    }

    public getById(req: Request, res: Response) {
        logger.log('debug', 'base controller getById------' + req.params.id);

        this.baseService.getById(req.params.id, (err, item) => {
            if (err) {
                return res.json(err);
            }

            return res.json(item);
        });
    }

    public update(req: Request, res: Response) {
        var data: any = <TEntity>req.body;
        var options = { upsert: true, returnOriginal: true };

        logger.debug('base controller  update  data---', data);

        return this.baseService.update(req.params.id, data, options, (err, item) => {
            if (err) {
                return res.json(err);
            }

            return res.json(item);
        });
    }

    public delete(req: Request, res: Response) {
        logger.log('debug', 'base controller  delete  data---', req.params.id);

        return this.baseService.delete(req.params.id, (err, item) => {
            if (err) {
                return res.json(err);
            }

            return res.json(item);
        });
    }
}  