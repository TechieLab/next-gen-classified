import {ObjectID} from 'mongodb';
export abstract class BaseEntity
{
    public Id: ObjectID;
    public Status: boolean;

    public CreatedBy: string;
    public CreatedOn: string;
    public ModifiedBy : string;
    public ModifiedOn : string;
}