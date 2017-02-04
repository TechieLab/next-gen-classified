import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IPreferences extends IBaseEntity
{
    
     UserId: ObjectID;
}