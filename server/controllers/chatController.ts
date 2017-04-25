
import { Express, Request, Response } from "express";
import logger = require('winston');
import { IBaseController, BaseController } from './baseController';
import { IChatService, ChatService } from '../services/userService';
import { Chat } from '../models/chat';
import { Media } from '../models/media';

export interface IChatController extends IBaseController<Chat> {
    
}

export class ChatController extends BaseController<Chat> implements IChatController {

    constructor(public chatService: IChatService) {
        super(chatService);
    }
}