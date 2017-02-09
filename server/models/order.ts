import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Order extends BaseEntity
{   
     TransactionId: ObjectID;
     Description: boolean;
     Status: boolean;
     ProductId: ObjectID;
     postId: ObjectID; 
     UserId: ObjectID;
}