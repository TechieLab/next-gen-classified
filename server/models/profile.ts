import {BaseEntity} from './baseEntity';
import {Address} from './address';
import {Contact} from './contact';
import {Theme} from './theme';
import {Media} from './media';

export class Profile
{
     FullName: string;
     DisplayName: string;
     EmailId:string;   
     Address : Address;
     Contact: Contact;
     Theme: Theme;
     Language: string;   
     Media : Media;     
     CreatedOn : Date;
     Status : string;

     constructor(){
         this.FullName = '';
         this.Address = new Address()
         this.Contact = new Contact();
         this.Theme = new Theme();
         this.Media = new Media();
         this.CreatedOn = new Date();
     }
}