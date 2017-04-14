import { IBaseController, BaseController } from './baseController';
import { Media } from '../models/media';


export interface IMediaController extends IBaseController<Media> {

}

export class MediaController extends BaseController<Media> implements IMediaController {

}