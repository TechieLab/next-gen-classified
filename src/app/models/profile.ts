import {Address} from './address';
import {Contact} from './contact';
import {Theme} from './theme';
import {Media} from './media';
export class Profile
{    
     FullName: string;
     DisplayName: string;   
     Signature : string;
     Address : Address;
     Contact: Contact;
     Language: string;   
     Media : Media;
     CreatedOn : Date;
     Status : string;

     constructor(){
         this.FullName = '';    
         this.Address = new Address()
         this.Contact = new Contact();
         this.Media = new Media();
     }
}