import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IChatHistory extends IBaseEntity
{
   
     UserId: ObjectID;
}