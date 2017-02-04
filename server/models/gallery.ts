import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export interface IGallery extends IBaseEntity
{
     Name: string;
     UserId: ObjectID;
}