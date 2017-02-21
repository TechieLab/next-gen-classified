import { BaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';
import {Description} from './description';
import {Review} from './review';
import {Media} from './media';

export class Product extends BaseEntity {
    public Name: string;    
    public Category: string; 
    public Description : Description;
    public Review : Review;
    public Photos : Array<Media>;

    constructor() {
        super();

        this.Name = '';        
        this.Category = '';      
        this.Description = new Description();
        this.Photos = new Array<Media>();
        this.Review = new Review();
    }
}