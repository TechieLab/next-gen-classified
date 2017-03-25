import {BaseRepository, IBaseRepository} from '../repository/baseRepository';
import logger = require('winston');

export interface IBaseService<TEntity>
{
    initData(sampleData: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);   
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    get(query : any, callback: (errr: Error, item: Array<TEntity>) => any);
    getByUserId(userId : string ,query : any, callback: (errr: Error, item: Array<TEntity>) => any);
    getCount(callback: (errr: Error, item: number) => any);
    getById(id: string, callback: (errr: Error, item: TEntity) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    update(id: string, data: TEntity,option:Object, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);
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

    public get(query: any, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.get(query,callback);
    } 

    public getByUserId(userId : string , query: any, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.getByUserId(userId,query,callback);
    }   

    public getCount(callback: (errr: Error, item: number) => any)
    {
        this.repository.getCount(callback);
    }

     public getById(id: string, callback: (errr: Error, item: TEntity) => any)
    {
        this.repository.getById(id, callback);
    }    

    public update(id: string, data : TEntity, option:Object, callback: (errr: Error, item: TEntity) => any)
    {
        return this.repository.update(id, data,option,callback);
    }

    public delete(id: string, callback: (errr: Error, item: TEntity) => any)
    {
        return this.repository.delete(id, callback);
    }
}


  