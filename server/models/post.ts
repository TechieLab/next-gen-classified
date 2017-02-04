import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IPost extends IBaseEntity
{    
    UserId: ObjectID;
}