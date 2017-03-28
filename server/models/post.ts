import { BaseEntity } from './baseEntity';
import { Product } from './product';

export class Post extends BaseEntity {
    PostId: number;
    AdType: string;
    Title: string;
    Category: string;
    Location: string;
    Product: Product;
    Views: Array<string>;
    Offers: Array<string>;
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
        this.Offers = new Array<string>();
        this.Product = new Product();
        
    }
}