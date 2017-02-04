import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IReview extends IBaseEntity
{
     Title: string;
     Description: string;
     Rating: number;
     ProductId : ObjectID;   
     UserId: ObjectID;
}