import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Media extends BaseEntity
{
    public DisplaySequence: number;
    public Caption: string;
    public Description: string;
    public ImageType: string;
    public ImageUrl: string;
    public Name: boolean;
    public SizeInBytes: boolean;
    public Height: string;
    public Width: number; 
    public UserId: ObjectID;
}