import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IProfile} from '../models/profile';

export module Controllers {

    export interface IProfileController extends IBaseController<IProfile> {
        
    }

    export class ProfileController extends BaseController<IProfile> implements IProfileController
    {        
        
    }
}
