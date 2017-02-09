import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Profile } from '../models/profile';



export interface IProfileController extends IBaseController<Profile> {

}

export class ProfileController extends BaseController<Profile> implements IProfileController {

}
