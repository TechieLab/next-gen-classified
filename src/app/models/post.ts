import { Product } from './product';
import {Location} from './location';
import {Offer} from './offer';

export class Post {
    _id: string;
    Title: string;
    Category: string;
    Location: Location;
    Product: Product;
    Views: Array<string>;
    Offers: Array<Offer>;
    LastViewed: Date;
    LastOffered: Date;
    Likes:Array<string>;
    UserId: string;
    IsFav : boolean;
    IsOffered:boolean;
    PostedOn : Date;

    constructor() {
        this.Title = '';
        this.Category = '';
        this.Location = new Location();
        this.PostedOn = new Date();
        this.Likes = new Array<string>();
        this.Product = new Product();
        this.Views = new Array<string>();
        this.Offers = new Array<Offer>();
        this.IsFav = false;
        this.IsOffered = false;
    }
}