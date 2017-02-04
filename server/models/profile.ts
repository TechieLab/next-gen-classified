import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IProfile extends IBaseEntity
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