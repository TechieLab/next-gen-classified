import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Seller extends BaseEntity
{
  
    UserId: ObjectID;
}