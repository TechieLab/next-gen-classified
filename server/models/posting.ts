import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IPosting extends IBaseEntity
{    
    UserId: ObjectID;
}