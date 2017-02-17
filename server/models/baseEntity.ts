import { ObjectID } from 'mongodb';
export class BaseEntity {
    _id: ObjectID;
    Status: string;

    CreatedBy: ObjectID;
    CreatedOn: Date;
    ModifiedBy: ObjectID;
    ModifiedOn: Date;

    constructor() {        
        this.Status = 'inactive';

        this.CreatedBy = null;
        this.CreatedOn = new Date();
        this.ModifiedBy = null;
        this.ModifiedOn = new Date()
    }
}