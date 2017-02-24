import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
import { IUserService, UserService } from '../services/userService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { UserController, IUserController } from '../controllers/userController';

var self = this;
export class UserRoute extends BaseApiRoute<User> implements IBaseApiRoute<User>{
    constructor(public app: Express) {
        super(app, "users");

        self = this;

        this.app.post('/profile/upload', upload.single('avatar'), function (req: Request, res: Response, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any

            var repository = new UserRepository()
            var service = new UserService(repository);
            var controller = new UserController(service);

            controller.upload(req, res);
        });
    }

}