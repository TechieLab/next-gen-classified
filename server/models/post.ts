import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IPost extends IBaseEntity
{    
    UserId: ObjectID;

    Title : string;
    Desciption:string;
    Price: string;
    Category : string;
    Location : string;
}