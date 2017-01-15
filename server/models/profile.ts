import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Profile extends BaseEntity
{
    public EmailId: string;
    public FullName: string;
    public DisplayName: string;   
    public Signature : string;
    public AddressId : ObjectID;
    public ContactId: ObjectID;
    public ThemeId: ObjectID;
    public Language: string;   
    public MediaId : ObjectID;
    public UserId: ObjectID;
}