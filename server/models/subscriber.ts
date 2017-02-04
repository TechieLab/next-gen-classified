import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface ISubscriber extends IBaseEntity
{
  
    UserId: ObjectID;
}