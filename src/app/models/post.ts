import { Product } from './product';

export class Post {
    _id: string;
    Title: string;
    Category: string;
    Location: string;
    Product: Product;
    Views: Array<string>;
    Offers: Array<string>;
    LastViewed: Date;
    LastOffered: Date;
    Likes:Array<string>;
    UserId: string;
    isFav : boolean;

    constructor() {
        this.Title = '';
        this.Category = '';
        this.Location = '';
        this.Likes = new Array<string>();
        this.Product = new Product();
        this.Views = new Array<string>();
        this.Offers = new Array<string>();
        this.isFav = false;
    }
}