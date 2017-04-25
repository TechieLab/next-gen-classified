import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Chat } from '../models/chat';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IChatService, ChatService } from '../services/chatService';
import { IChatRepository, ChatRepository } from '../repository/chatRepository';
import { ChatController, IChatController } from '../controllers/chatController';

var self = this;
export class ChatRoute extends BaseApiRoute<Chat> implements IBaseApiRoute<Chat>{
    controller: IChatController;

    constructor(public app: Express) {
        super(app, 'chats');

        self = this;       
    }    
  
    setChatCollection() {
        var repository = new ChatRepository();
        var service = new ChatService(repository);
        this.controller = new ChatController(service);
    }
}