import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Review extends BaseEntity
{
    public Title: string;
    public Description: string;
    public Rating: number;
    public ProductId : ObjectID;   
    public UserId: ObjectID;
}