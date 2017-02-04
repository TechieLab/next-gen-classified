
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Activity } from '../models/activity';

export interface IActivityRepository extends IBaseRepository<Activity> {

}

export class ActivityRepository extends BaseRepository<Activity> implements IActivityRepository {
   
    constructor() {
        super('activities');
    }
} 
