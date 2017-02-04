import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface ICatalog extends IBaseEntity
{
     ProductId: ObjectID;
     UserId: ObjectID;
}