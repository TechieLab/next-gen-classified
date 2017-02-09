import { BaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';

export class Product extends BaseEntity {   
    public Name: string;
    public IsNew: boolean;
    public IsUsed: boolean;
    public IsRepaired: boolean
    public Feature: string;
    public IsBillAvaialbe: boolean;
    public PurchasedOn: Date;
    public Category: string;
    public Price: string;
    public Location : string;
    public UserId: ObjectID;

    constructor(){
        super();

        this.Name = '';
        this.IsNew = false;
        this.IsUsed = false;
        this.Feature = '';
        this.IsBillAvaialbe = false;
        this.PurchasedOn = new Date();
        this.Category = '';
        this.Price = '';
        this.Location = '';
    }
}