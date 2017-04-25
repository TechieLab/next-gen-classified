
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Chat } from '../models/chat';

export interface IChatRepository extends IBaseRepository<Chat> {}

export class ChatRepository extends BaseRepository<Chat> implements IChatRepository {   
    constructor() {
        super('chats');
    }
} 
