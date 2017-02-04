import {ObjectID} from 'mongodb';
export interface IBaseEntity
{
     Id: ObjectID;
     Status: boolean;

     CreatedBy: string;
     CreatedOn: string;
     ModifiedBy : string;
     ModifiedOn : string;
}