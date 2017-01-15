import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Address extends BaseEntity
{
  
    public UserId: ObjectID;
}