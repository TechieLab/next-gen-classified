import {Message} from './message';

export class Chat
{       
     _id : string;
     Messages : Array<Message>;
     IsOnline: boolean;
     UserId: string;
     UserName : string;
}