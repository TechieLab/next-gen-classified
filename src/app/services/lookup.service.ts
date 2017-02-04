import {Injectable, Optional} from '@angular/core';
import {ILookup} from '../models/lookup';
import {IBaseService, BaseService} from './base.service'

export interface ILookupService extends IBaseService<ILookup>{

}

@Injectable()
export class LookupService extends BaseService<ILookup> implements ILookupService{

}