export class Message{
     Content : string;  
     Room : string;  
     SentOn : Date;
     ReceivedOn : Date;
     ReadOn : Date;
     FromUserId : string;
     ToUserId : string;
     Status : boolean;
     TimeStamp : Date;

     constructor(){
         this.SentOn = new Date();
         this.ReceivedOn = new Date();
         this.ReadOn = new Date();
     }
}