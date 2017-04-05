import { BaseEntity } from './baseEntity';
import { Product } from './product';
import {Offer} from './offer';

export class Post extends BaseEntity {
    PostId: number;
    AdType: string;
    Title: string;
    Category: string;
    Location: string;
    Product: Product;
    Views: Array<string>;
    Offers: Array<Offer>;
    LastViewed: Date;
    LastOffered: Date;
    UserId: string;
    Likes:Array<string>;
   

    constructor() {
        super();

        this.PostId = 0;
        this.AdType = '';
        this.Title = '';
        this.UserId = null;
        this.Category = '';
        this.Likes = new Array<string>();
        this.Views = new Array<string>();
        this.Offers = new Array<Offer>();
        this.Product = new Product();
        
    }
}