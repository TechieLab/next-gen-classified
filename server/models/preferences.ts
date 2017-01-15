import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Preferences extends BaseEntity
{
    
    public UserId: ObjectID;
}