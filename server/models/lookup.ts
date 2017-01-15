import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Lookup
{
    public Id : ObjectID
    public Value: string;
    public Name: string;
    public Description: string;
}