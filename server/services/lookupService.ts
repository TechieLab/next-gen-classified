
import { Lookup } from '../models/Lookup';
import { ILookupRepository } from '../repository/LookupRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface ILookupService extends IBaseService<Lookup> {

}
export class LookupService extends BaseService<Lookup> implements ILookupService {
    repository: ILookupRepository;

    public constructor(repository: ILookupRepository) {
        super(repository);
    }
}
