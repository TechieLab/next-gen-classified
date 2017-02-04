import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IMedia extends IBaseEntity
{
     DisplaySequence: number;
     Caption: string;
     Description: string;
     ImageType: string;
     ImageUrl: string;
     Name: boolean;
     SizeInBytes: boolean;
     Height: string;
     Width: number; 
     UserId: ObjectID;
}