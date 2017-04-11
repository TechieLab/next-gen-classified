import { Express, Request, Response } from "express";
import logger = require('winston');
import { IBaseController, BaseController } from './baseController';
import { IUserService, UserService } from '../services/userService';
import { User } from '../models/user';
import { Media } from '../models/media';

export interface IUserController extends IBaseController<User> {
    upload(req: Request, res: Response);
}

export class UserController extends BaseController<User> implements IUserController {

    constructor(public userService: IUserService) {
        super(userService);
    }

    public upload(req: any, res: any) {
        console.log(req.file);
        
        this.userService.getById(req['userId'], (err, user) => {
            if (err) logger.log('debug', ' getById err---', err);

            if (user) {
                var media = new Media();
            }
        });
    }

    public getById(req: Request, res: Response) {
        logger.log('debug', 'user controller getById------' + req['userId']);

        this.userService.getById(req['userId'], (err, item) => {
            if (err) logger.log('debug', ' create getById err---', err);

            return res.json(item);
        });
    }
}