import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IReport extends IBaseEntity
{
     Name: string;   
     Type : string
     UserId: ObjectID;
}