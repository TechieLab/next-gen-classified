
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Media } from '../models/Media';

export interface IMediaRepository extends IBaseRepository<Media> {

}

export class MediaRepository extends BaseRepository<Media> implements IMediaRepository {
   
    constructor() {
        super('medias');
    }
}

