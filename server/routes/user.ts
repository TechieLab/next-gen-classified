import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { User} from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class UserRoute extends BaseApiRoute<User> implements IBaseApiRoute<User>{
    constructor(public app: Express) {
        super(app, "users");
    }
}