import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Posting extends BaseEntity
{
    
    public UserId: ObjectID;
}