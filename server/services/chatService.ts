
import { Chat } from '../models/chat';
import { IChatRepository } from '../repository/chatRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IChatService extends IBaseService<Chat> {

}
export class ChatService extends BaseService<Chat> implements IChatService {
    repository: IChatRepository;

    public constructor(repository: IChatRepository) {
        super(repository);
    }
}
