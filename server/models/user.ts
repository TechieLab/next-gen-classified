import {BaseEntity} from './baseEntity';
import {Profile} from './profile';
import {Session} from './session';
import {ObjectID} from 'mongodb';

export class User extends BaseEntity
{
     UserName: string;
     Passward: string;
     EmailId: string;     
     Question : string;
     Answer : string;
     Token : string;
     TokenValidity: Date;
     Profile : Profile;   

     constructor(){
         super();
         this.Profile = new Profile();
     } 
}