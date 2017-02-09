import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Theme extends BaseEntity
{  
     UserId: ObjectID;
}