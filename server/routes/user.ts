import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IUserService, UserService } from '../services/userService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { UserController, IUserController } from '../controllers/userController';

var self = this;
export class UserRoute extends BaseApiRoute<User> implements IBaseApiRoute<User>{
    controller: IUserController;

    constructor(public app: Express) {
        super(app, 'users');

        self = this;

        this.chat();
    }

    chat(){
        this.app.get('/api/users/:id/chat-history', (req: Request, res: Response) => {
            self.setUserCollection()();
            self.controller.getChatHistory(req,res);
        });
    }
  
    setUserCollection() {
        var repository = new UserRepository();
        var service = new UserService(repository);
        this.controller = new UserController(service);
    }
}