import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IOrder extends IBaseEntity
{   
     TransactionId: ObjectID;
     Description: boolean;
     Status: boolean;
     ProductId: ObjectID;
     postId: ObjectID; 
     UserId: ObjectID;
}