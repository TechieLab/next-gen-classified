import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Product extends BaseEntity
{
    public CategoryId: ObjectID;
    public Name: string;
    public DescriptionId: ObjectID;   
    public PurchasedOn : string;
    public IsBillAvaialbe : boolean;
    public UserId: ObjectID;
}