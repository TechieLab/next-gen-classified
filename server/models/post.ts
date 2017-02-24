import { BaseEntity } from './baseEntity';
import { ObjectID } from 'mongodb';
import { Product } from './product';

export class Post extends BaseEntity {
    PostId: number;
    AdType: string;
    Title: string;
    Category: string;
    Location: string;
    Product: Product;
    Views: Array<ObjectID>;
    Offers: Array<ObjectID>;
    LastViewed: Date;
    LastOffered: Date;
    UserId: ObjectID;

    constructor() {
        super();

        this.PostId = 0;
        this.AdType = '';
        this.Title = '';
        this.UserId = null;
        this.Category = '';
        this.Views = new Array<ObjectID>();
        this.Offers = new Array<ObjectID>();
        this.Product = new Product();
    }
}