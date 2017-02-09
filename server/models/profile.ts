import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Profile extends BaseEntity
{
     EmailId: string;
     FullName: string;
     DisplayName: string;   
     Signature : string;
     AddressId : ObjectID;
     ContactId: ObjectID;
     ThemeId: ObjectID;
     Language: string;   
     MediaId : ObjectID;
     UserId: ObjectID;
}