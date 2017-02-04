import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IPreferences} from '../models/Preferences';

export module Controllers {

    export interface IPreferencesController extends IBaseController<IPreferences> {
        
    }

    export class PreferencesController extends BaseController<IPreferences> implements IPreferencesController
    {        
        
    }
}
