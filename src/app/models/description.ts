import {Lookup} from './lookup';
export class Description
{   
    public Title : string;
    public IsNew: boolean;
    public IsUsed: boolean;
    public IsRepaired: boolean
    public Features: Array<string>;
    public IsBillAvaialbe: boolean;
    public PurchasedOn: Date;   
    public Price: number;
    public Brand : Lookup;
    public Model : any;

    constructor(){
        this.Title = '';
        this.IsNew = false;
        this.IsUsed = false;
        this.Features = [];
        this.IsBillAvaialbe = false;
        this.PurchasedOn = new Date();       
        this.Price = 0;    
        this.Brand = new Lookup();
        this.Model = '';  
    }
}