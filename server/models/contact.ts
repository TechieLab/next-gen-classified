import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IContact extends IBaseEntity
{
     PhoneNumber: string;
     LandLineNumber: string;
     AltPhoneNumber: string;
     EmailId: string;
     AltEmailId: string;
     UserId: ObjectID;
}