import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Report extends BaseEntity
{
     Name: string;   
     Type : string
     UserId: ObjectID;
}