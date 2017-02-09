import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Review extends BaseEntity
{
     Title: string;
     Description: string;
     Rating: number;
     ProductId : ObjectID;   
     UserId: ObjectID;
}