import { BaseEntity } from './baseEntity';
import {Contact} from './contact';

export class Offer extends BaseEntity {
    Price: string;
    Contact:Contact;
    UserId: string;
    Comments:string;
    Created: Date;
    PostId:string;

    constructor() {
        super();
        
        this.Price = '';
        this.Comments = '';
        this.UserId = null;
        this.PostId = null;
        this.Contact = new Contact();
    }
}