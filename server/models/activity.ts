import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Activity extends BaseEntity
{
   
    public UserId: ObjectID;
}