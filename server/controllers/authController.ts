import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';


import { Post } from '../models/post';
import {Result} from '../models/result';

export interface IAuthController extends IBaseController<Post> {

}
var self;
export class AuthController extends BaseController<Post> implements IAuthController {

}
