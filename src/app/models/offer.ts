import {Contact} from './contact';

export class Offer {
    Price: string;
    Contact:Contact;
    Comments:string;

    constructor() {
        this.Price = '';
        this.Comments = '';
        this.Contact = new Contact();
    }
}