
import { ILookup } from '../models/Lookup';
import { ILookupRepository } from '../repository/LookupRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface ILookupService extends IBaseService<ILookup> {

}
export class LookupService extends BaseService<ILookup> implements ILookupService {
    repository: ILookupRepository;

    public constructor(repository: ILookupRepository) {
        super(repository);
    }
}
