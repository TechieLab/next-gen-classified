import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IUser extends IBaseEntity
{
     UserName: string;
     Passward: string;
     EmailId: string;
     HintQues: string;
     HintAns: string;
     Status: boolean;
}