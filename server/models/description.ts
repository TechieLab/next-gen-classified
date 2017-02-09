import {BaseEntity} from './baseEntity';

export class Description
{   
    public Title : string;
    public IsNew: boolean;
    public IsUsed: boolean;
    public IsRepaired: boolean
    public Features: Array<string>;
    public IsBillAvaialbe: boolean;
    public PurchasedOn: Date;   
    public Price: string;
    public Brand : string;
    public Model : string;
    public Defects : Array<string>;

    constructor(){
        this.Title = '';
        this.IsNew = false;
        this.IsUsed = false;
        this.Features = [];
        this.IsBillAvaialbe = false;
        this.PurchasedOn = new Date();       
        this.Price = '';    
        this.Brand = '';
        this.Model = '';  
        this.Defects =  [];
    }
}