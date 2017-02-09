import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Gallery extends BaseEntity
{
     Name: string;
     UserId: ObjectID;
}