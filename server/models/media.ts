import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Media extends BaseEntity
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