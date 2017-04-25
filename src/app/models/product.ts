
import {Description} from './description';
import {Review} from './review';
import {Media} from './media';
import {Lookup} from './lookup';

export class Product {
    public Name: string;
    public Description : Description;
    public Photos : Array<Media>;
    public Accesseroies : Array<any>;    
    public Defects : Array<Lookup>;

    constructor() {        
        this.Name = '';  
        this.Description = new Description();
        this.Photos = new Array<Media>();  
        this.Accesseroies = new Array<any>();
        this.Defects =  new Array<Lookup>();
    }
}