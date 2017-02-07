import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { IPost } from '../models/post';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class PostRoute extends BaseApiRoute<IPost> implements IBaseApiRoute<IPost>{
    constructor(public app: Express) {
        super(app, "posts");
    }
}