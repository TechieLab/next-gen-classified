import {ObjectID} from 'mongodb';
import {BaseEntity} from './baseEntity';

export class Address extends BaseEntity
{
    public AddressLine1: string;
    public AddressLine2: string;
    public Street: string;
    public City: string;
    public Landmark: string;
    public IsOfficeAddress: boolean;
    public IsPermanetAddress: boolean;
    public StateId: string;
    public CounntryId: number; 
    public UserId: ObjectID;
}