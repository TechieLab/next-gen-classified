import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface ICategory
{
     Id : ObjectID
     Value: string;
     Name: string;
     Description: string;
}