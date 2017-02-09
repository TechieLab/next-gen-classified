import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Catalog extends BaseEntity
{
     ProductId: ObjectID;
     UserId: ObjectID;
}