import {ObjectID} from 'mongodb';

export interface ILookup
{
     Id : ObjectID
     Key : string;
     Value: string;
     Name: string;
     Description: string;
}