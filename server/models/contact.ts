
export class Contact
{
     PhoneNumber: string;
     LandLineNumber: string;
     AltPhoneNumber: string;
     EmailId: string;
     SkypeId : string;
     AltEmailId: string;

     constructor(){
         this.AltEmailId = '';
         this.LandLineNumber = '';
         this.AltPhoneNumber = '';
         this.EmailId = '';
         this.PhoneNumber = '';
         this.SkypeId = '';
     }
}