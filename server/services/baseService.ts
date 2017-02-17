import {BaseRepository, IBaseRepository} from '../repository/baseRepository';
import logger = require('winston');
import {ObjectID} from 'mongodb';

export interface IBaseService<TEntity>
{
    initData(sampleData: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);   
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    get(query : Object, callback: (errr: Error, item: Array<TEntity>) => any);
    getCount(callback: (errr: Error, item: number) => any);
    getById(id: ObjectID, callback: (errr: Error, item: TEntity) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    update(id: ObjectID, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: ObjectID, callback: (errr: Error, item: TEntity) => any);
}

export class BaseService<TEntity> implements IBaseService<TEntity>
{
    repository: IBaseRepository<TEntity>;

    public constructor(repository: IBaseRepository<TEntity>)
    {
        this.repository = repository;
    }

    public initData(sampleData: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.bulkCreate(sampleData, callback);
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any)
    {
        this.repository.create(data, callback);
    }

    public bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.bulkCreate(data, callback);
    }

    public get(query: Object, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.get(query,callback);
    }    

    public getCount(callback: (errr: Error, item: number) => any)
    {
        this.repository.getCount(callback);
    }

     public getById(id: ObjectID, callback: (errr: Error, item: TEntity) => any)
    {
        this.repository.getById(id, callback);
    }    

    public update(id: ObjectID, data : TEntity, callback: (errr: Error, item: TEntity) => any)
    {
        return this.repository.update(id, data, callback);
    }

    public delete(id: ObjectID, callback: (errr: Error, item: TEntity) => any)
    {
        return this.repository.delete(id, callback);
    }
}


  