import {BaseEntity} from './baseEntity';
import {Address} from './address';
import {Contact} from './contact';
import {Theme} from './theme';
import {Media} from './media';

import {ObjectID} from 'mongodb';

export class Profile
{
     EmailId: string;
     FullName: string;
     DisplayName: string;   
     Signature : string;
     Address : Address;
     Contact: Contact;
     Theme: Theme;
     Language: string;   
     Media : Media;

     constructor(){
         this.FullName = '';
         this.Address = new Address()
         this.Contact = new Contact();
         this.Theme = new Theme();
         this.Media = new Media();
     }
}