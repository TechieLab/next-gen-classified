import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPost } from '../models/post';

export interface IPostingController extends IBaseController<IPost> {

}

export class PostingController extends BaseController<IPost> implements IPostingController {

}
