import {BaseEntity} from './baseEntity';

export class Description extends BaseEntity
{   
     Title: string;
     Price: number;
     IsNew : boolean;
     IsRepaired : boolean;
     IsUsed : boolean;
     Features : Array<String>;    
}