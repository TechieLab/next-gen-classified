import {IBaseEntity} from './baseEntity';

export interface IDescription extends IBaseEntity
{   
     Title: string;
     Price: number;
     IsNew : boolean;
     IsRepaired : boolean;
     IsUsed : boolean;
     Features : Array<String>;    
}