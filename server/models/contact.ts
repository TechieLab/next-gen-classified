import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Contact extends BaseEntity
{
    public PhoneNumber: string;
    public LandLineNumber: string;
    public AltPhoneNumber: string;
    public EmailId: string;
    public AltEmailId: string;
    public UserId: ObjectID;
}