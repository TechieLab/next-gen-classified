import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IActivity extends IBaseEntity
{
   
     UserId: ObjectID;
}