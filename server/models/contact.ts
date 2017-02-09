import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Contact extends BaseEntity
{
     PhoneNumber: string;
     LandLineNumber: string;
     AltPhoneNumber: string;
     EmailId: string;
     AltEmailId: string;
     UserId: ObjectID;
}