import { IBaseController, BaseController } from './baseController';
import { Preferences } from '../models/Preferences';

export interface IPreferencesController extends IBaseController<Preferences> {

}

export class PreferencesController extends BaseController<Preferences> implements IPreferencesController {

}