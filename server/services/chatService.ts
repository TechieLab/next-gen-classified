
import { Chat } from '../models/chat';
import { IActivityRepository } from '../repository/activityRepository';
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
