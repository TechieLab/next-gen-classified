import { BaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';
import {Description} from './description';


export class Product extends BaseEntity {
    public Name: string;
    public Location: string;
    public Category: string;
    public UserId: ObjectID;
    public Description : Description;

    constructor() {
        super();

        this.Name = '';
        this.Location = '';
        this.Category = '';
        this.UserId = new ObjectID();
        this.Description = new Description();
    }
}