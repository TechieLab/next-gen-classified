import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Location extends BaseEntity
{
     Long: string;
     Lat: string;
     Name: string;
     AddressId: ObjectID;
}