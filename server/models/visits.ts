import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Visit extends BaseEntity
{    
    public UserId: ObjectID;
}