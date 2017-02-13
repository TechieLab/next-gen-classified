import { BaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';
import {Description} from './description';
import {Review} from './review';

export class Product extends BaseEntity {
    public Name: string;    
    public Category: string; 
    public Description : Description;
    public Review : Review;

    constructor() {
        super();

        this.Name = '';        
        this.Category = '';      
        this.Description = new Description();
        this.Review = new Review();
    }
}