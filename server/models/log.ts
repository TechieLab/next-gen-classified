import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Log extends BaseEntity
{
   
    public UserId: ObjectID;
}