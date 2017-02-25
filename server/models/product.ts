import { BaseEntity } from './baseEntity';
import {Description} from './description';
import {Review} from './review';
import {Media} from './media';

export class Product extends BaseEntity {
    public Name: string;    
    
    public Description : Description;  
    public Photos : Array<Media>;

    constructor() {
        super();
        this.Name = '';
        this.Description = new Description();
        this.Photos = new Array<Media>();
    }
}