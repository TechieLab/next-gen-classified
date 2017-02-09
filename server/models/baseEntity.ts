import {ObjectID} from 'mongodb';
export class BaseEntity
{
     Id: ObjectID;
     Status: boolean;

     CreatedBy: string;
     CreatedOn: string;
     ModifiedBy : string;
     ModifiedOn : string;
}