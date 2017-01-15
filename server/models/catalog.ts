import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Catalog extends BaseEntity
{
    public ProductId: ObjectID;
    public UserId: ObjectID;
}