
import { Preferences } from '../models/Preferences';
import { IPreferencesRepository } from '../repository/PreferencesRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IPreferencesService extends IBaseService<Preferences> {

}
export class PreferencesService extends BaseService<Preferences> implements IPreferencesService {
    repository: IPreferencesRepository;

    public constructor(repository: IPreferencesRepository) {
        super(repository);
    }
}
