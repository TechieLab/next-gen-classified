
import { Profile } from '../models/Profile';
import { IProfileRepository } from '../repository/ProfileRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IProfileService extends IBaseService<Profile> {

}
export class ProfileService extends BaseService<Profile> implements IProfileService {
    repository: IProfileRepository;

    public constructor(repository: IProfileRepository) {
        super(repository);
    }
}
