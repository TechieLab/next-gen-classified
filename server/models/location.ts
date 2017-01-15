import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
export class Location extends BaseEntity
{
    public Long: string;
    public Lat: string;
    public Name: string;
    public AddressId: ObjectID;
}