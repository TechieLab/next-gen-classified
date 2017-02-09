import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Category
{
     Id : ObjectID
     Value: string;
     Name: string;
     Description: string;
}