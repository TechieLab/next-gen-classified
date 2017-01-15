
import { Media } from '../models/Media';
import { IMediaRepository } from '../repository/MediaRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IMediaService extends IBaseService<Media> {

}
export class MediaService extends BaseService<Media> implements IMediaService {
    repository: IMediaRepository;

    public constructor(repository: IMediaRepository) {
        super(repository);
    }
}
