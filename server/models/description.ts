import {BaseEntity} from './baseEntity';

export class Description extends BaseEntity
{
   
    public Title: string;
    public Price: number;
    public IsNew : boolean;
    public IsRepaired : boolean;
    public IsUsed : boolean;
    public Features : Array<String>;
    
}