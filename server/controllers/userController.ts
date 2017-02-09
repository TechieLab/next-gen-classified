import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { User } from '../models/user';

export interface IUserController extends IBaseController<User> {

}

export class UserController extends BaseController<User> implements IUserController {

}