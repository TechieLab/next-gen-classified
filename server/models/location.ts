import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export interface ILocation extends IBaseEntity
{
     Long: string;
     Lat: string;
     Name: string;
     AddressId: ObjectID;
}