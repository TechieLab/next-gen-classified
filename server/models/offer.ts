import { BaseEntity } from './baseEntity';
import {Contact} from './contact';

export class Offer extends BaseEntity {
    Price: string;
    UserId: string;
    Comments:string;
    CreatedOn: Date;

    constructor() {
        super();
        
        this.Price = '';
        this.Comments = '';
        this.UserId = null;
        this.CreatedOn = new Date();
    }
}