import {ObjectID} from 'mongodb';
import {IBaseEntity} from './baseEntity';

export interface IAddress extends IBaseEntity
{
    AddressLine1: string;
    AddressLine2: string;
    Street: string;
    City: string;
    Landmark: string;
    IsOfficeAddress: boolean;
    IsPermanetAddress: boolean;
    StateId: string;
    CounntryId: number; 
    UserId: ObjectID;
}