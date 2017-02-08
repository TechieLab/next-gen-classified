import { IBaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';

export interface IProduct extends IBaseEntity {   
    Name: string;
    IsNew: boolean;
    IsUsed: boolean;
    isRepaired: boolean
    feature: string;
    IsBillAvaialbe: boolean;
    PurchasedOn: Date;
    Category: string;
    Price: string;
    Location : string;
    UserId: ObjectID;
}