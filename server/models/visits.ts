import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IVisit extends IBaseEntity
{    
     UserId: ObjectID;
}