import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface ITheme extends IBaseEntity
{  
     UserId: ObjectID;
}