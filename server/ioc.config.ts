import { Container } from "inversify";
import {Db, Collection} from 'mongodb';
import { TYPES } from "./types";
import {UserController} from './controllers/userController';

import {UserService, IUserService } from './services/userService';
import {UserRepository, IUserRepository } from './repository/userRepository';

var myContainer = new Container();

myContainer.bind<IUserService>(TYPES.UserService).to(UserService);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
myContainer.bind<UserController>(TYPES.UserController).to(UserController);

export { myContainer };