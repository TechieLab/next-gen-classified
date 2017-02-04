import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IUser } from '../models/user';


export interface IUserController extends IBaseController<IUser> {

}

export class UserController extends BaseController<IUser> implements IUserController {

}