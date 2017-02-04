import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IProduct extends IBaseEntity
{
     CategoryId: ObjectID;
     Name: string;
     DescriptionId: ObjectID;   
     PurchasedOn : string;
     IsBillAvaialbe : boolean;
     UserId: ObjectID;
}