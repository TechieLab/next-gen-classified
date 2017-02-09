import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Visit extends BaseEntity
{    
     UserId: ObjectID;
}