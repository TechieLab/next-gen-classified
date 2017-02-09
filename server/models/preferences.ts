import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Preferences extends BaseEntity
{
    
     UserId: ObjectID;
}