import {Contact} from './contact';

export class Offer {
    Price: string;
    Contact:Contact;
    Comments:string;
    PostId:string;

    constructor() {
        this.Price = '';
        this.Comments = '';
        this.PostId='';
        this.Contact = new Contact();
    }
}