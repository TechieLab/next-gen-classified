import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Rental } from '../models/rental';

export interface IRentalController extends IBaseController<Rental> {
}

export class RentalController extends BaseController<Rental> implements IRentalController {
}