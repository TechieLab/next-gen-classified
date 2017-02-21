import {BaseEntity} from './baseEntity';
import {Profile} from './profile';
import {Session} from './session';
import {ObjectID} from 'mongodb';

export class User extends BaseEntity
{
     UserName: string;
     Password: string;
     EmailId: string;     
     Question : string;
     Answer : string;
     Token : string;
     TokenValidity: Date;
     Profile : Profile;
     Session : Session;   

     constructor(){
         super();
         this.Profile = new Profile();
         this.Session = new Session();
     } 
}