
import { Activity } from '../models/activity';
import { IActivityRepository } from '../repository/activityRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IActivityService extends IBaseService<Activity> {

}
export class ActivityService extends BaseService<Activity> implements IActivityService {
    repository: IActivityRepository;

    public constructor(repository: IActivityRepository) {
        super(repository);
    }
}
