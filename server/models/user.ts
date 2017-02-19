import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class User extends BaseEntity
{
     UserName: string;
     Password: string;
     EmailId: string;
     Token : string;
     TokenValidity : Date;     
}