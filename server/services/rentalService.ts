
import { Rental } from '../models/index';
import { IRentalRepository } from '../repository/RentalRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IRentalService extends IBaseService<Rental> {

}
export class RentalService extends BaseService<Rental> implements IRentalService {
    repository: IRentalRepository;

    public constructor(repository: IRentalRepository) {
        super(repository);
    }
}
