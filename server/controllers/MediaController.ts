import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IMedia} from '../models/media';

export module Controllers {

    export interface IMediaController extends IBaseController<IMedia> {
        
    }

    export class MediaController extends BaseController<IMedia> implements IMediaController
    {        
        
    }
}
