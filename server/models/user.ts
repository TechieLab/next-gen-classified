import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class User extends BaseEntity
{
    public UserName: string;
    public Passward: string;
    public EmailId: string;
    public HintQues: string;
    public HintAns: string;
    public Status: boolean;
}