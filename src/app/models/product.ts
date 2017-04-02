
import {Description} from './description';
import {Review} from './review';
import {Media} from './media';

export class Product {
    public Name: string;
    public Description : Description;
    public Photos : Array<Media>;
    public Accesseroies : Array<string>;    
    public Defects : Array<string>;

    constructor() {        
        this.Name = '';  
        this.Description = new Description();
        this.Photos = new Array<Media>();  
        this.Accesseroies = new Array<string>();
        this.Defects =  new Array<string>();
    }
}