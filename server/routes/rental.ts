import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Rental } from '../models/rental';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IRentalService, RentalService } from '../services/rentalService';
import { IRentalRepository, RentalRepository } from '../repository/rentalRepository';
import { RentalController, IRentalController } from '../controllers/rentalController';

var self = this;
export class RentalRoute extends BaseApiRoute<Rental> implements IBaseApiRoute<Rental>{
    controller: IRentalController;

    constructor(public app: Express) {
        super(app, 'rentals');
        self = this;       
    }    
  
    setRentalCollection() {
        var repository = new RentalRepository();
        var service = new RentalService(repository);
        this.controller = new RentalController(service);
    }
}