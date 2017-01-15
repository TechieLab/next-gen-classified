import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';
import {IUserService,UserService} from '../services/userService';
import {IUserRepository,UserRepository} from '../repository/userRepository';
import {UserController,IUserController} from '../controllers/userController';
import logger = require('winston');

export class UserRoute
{
    userController: IUserController;  
    service: IUserService;  
    app: Express;

    constructor(app: Express)
    {
        this.app = app;

        var repository = new UserRepository()
        this.service = new UserService(repository);
        this.userController = new UserController(this.service);
    }

    getRoutes()
    {   
        this.app.get('/api/users/getall', this.userController.getEntities);
        this.app.get('/api/users/get/:id', this.userController.getEntity)
    }
}