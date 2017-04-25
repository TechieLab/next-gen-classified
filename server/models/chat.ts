import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
import {Message} from './message';

export class Chat extends BaseEntity
{       
     Messages : Array<Message>;
     IsOnline: boolean;
     UserId: string;
}