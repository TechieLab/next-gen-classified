import {ObjectID} from 'mongodb';

export class BaseEntity {
    _id: ObjectID;

    CreatedBy: string;
    CreatedOn: Date;
    ModifiedBy: string;
    ModifiedOn: Date;

    constructor() {       
        this.CreatedBy = null;
        this.CreatedOn = new Date();
        this.ModifiedBy = null;
        this.ModifiedOn = new Date()
    }
}