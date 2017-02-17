import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class User extends BaseEntity
{
     UserName: string;
     Passward: string;
     EmailId: string;     
     Status: boolean;
     Token : any;     
}