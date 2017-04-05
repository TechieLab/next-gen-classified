import {Contact} from './contact';

export class Offer {
    Price: string;
    Comments:string;
    UserId : string;
    PostId : string;

    constructor() {
        this.Price = '';
        this.Comments = '';
        this.UserId='';
        this.PostId = '';
    }
}