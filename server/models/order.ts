import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Order extends BaseEntity
{   
    public TransactionId: ObjectID;
    public Description: boolean;
    public Status: boolean;
    public ProductId: ObjectID;
    public postId: ObjectID; 
    public UserId: ObjectID;
}