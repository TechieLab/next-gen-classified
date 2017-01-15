import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Gallery extends BaseEntity
{
    public Name: string;
    public UserId: ObjectID;
}