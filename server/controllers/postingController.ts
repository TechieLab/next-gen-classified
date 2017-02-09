import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Post } from '../models/post';

export interface IPostingController extends IBaseController<Post> {

}

export class PostingController extends BaseController<Post> implements IPostingController {

}
