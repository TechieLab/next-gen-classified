import { MongoDBConnection } from '../data/connection';
import { ElasticSearchConnection } from '../data/ElasticSearchConnection';
import { Db, Collection, ObjectID } from 'mongodb';
import logger = require('winston');
var es = require('elasticsearch');

//import Logger from '../Logger'; 
//const logger = Logger('server');

export interface IBaseRepository<TEntity> {
    aggregate(query: any, aggregate: any[], callback: (err: Error, item: Array<TEntity>) => any);
    get(query: any, callback: (err: Error, item: Array<TEntity>) => any);
    getById(id: string, callback: (err: Error, item: TEntity) => any);
    getCount(query: any, callback: (err: Error, item: number) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string, data: TEntity, option: Object, callback: (errr: Error, item: TEntity) => any);
    replace(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);

    checkIndexes(indexes: Array<string>, callback: (err: Error, item: boolean) => any);
    createIndexes(indexes: Array<Object>, callback: (err: Error, item: boolean) => any);
    dropIndex(index: string, callback: (err: Error, item: boolean) => any);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    client: any;
    collection: Collection;
    collectionname: string;

    constructor(public collectionName: string) {
        logger.debug("Collection name-----" + collectionName);
        this.collectionname = collectionName;

        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
            this.collection = this.db.collection(collectionName);
        });

        this.client = new es.Client({
            host: '127.0.0.1:9200',
            log: 'error'
        });
    }

    public checkIndexes(indexes: Array<string>, callback: (err: Error, item: boolean) => any) {
        this.collection.indexExists(indexes, callback);
    }

    public dropIndex(index: string, callback: (err: Error, item: boolean) => any) {
        this.collection.dropIndex(index, callback);
    }

    public createIndexes(indexes: Array<Object>, callback: (err: Error, item: boolean) => any) {
        this.collection.createIndexes(indexes, callback);
    }

    public getCount(query: any, callback: (err: Error, item: number) => any) {
        this.collection.count(query, callback);
    }

    public getById(id: string, callback: (err: Error, item: TEntity) => any) {
        if (id == undefined || id == '') {
            callback(new Error('value of id is null or Empty'), null);
        }
        
        this.collection.findOne({ _id: new ObjectID(id) }, (err, res) => {
            if (err) {
                callback(err, null);
            }   

            logger.debug('reading get data..with id......' + id);       

            callback(err, res);
        });
    }

    public get(query: any, callback: (err: Error, item: Array<TEntity>) => any) {
        let fields: Array<string> = this.getFields(query);
        let sortObj = this.getSortBy(query);
        let pageSize: number = query['pageSize'];
        let pageNbr: number = query['page'];

        delete query['sortKey'];
        delete query['sortOrder'];
        delete query['fields'];
        delete query['pageSize'];
        delete query['page'];

        logger.debug('reading many data..with query....');
        console.log(query);

        this.collection.find(query, fields, null, pageSize * pageNbr).sort(sortObj).toArray(callback);
    }

    public aggregate(query: any, aggregate: any[], callback: (err: Error, item: Array<TEntity>) => any) {
        let aggregationArray = [];
        let fields: Array<string> = this.getFields(query);
        let sortObj = this.getSortBy(query);
        let pageSize: number = query['pageSize'];
        let pageNbr: number = query['page'];
        let searchCriteria: any = query['$text'];

        delete query['sortKey'];
        delete query['sortOrder'];
        delete query['fields'];
        delete query['pageSize'];
        delete query['page'];

        logger.debug('reading many data..with aggregate....');
      

        if (query) {
            aggregationArray.push({
                $match: query
            });
        }

        if (pageSize && pageNbr) {
            aggregationArray.push({
                $limit: pageSize * pageNbr
            });
        }   

        if(sortObj){
            aggregationArray.push({
                $sort: sortObj
            });
        }     

        aggregationArray = aggregationArray.concat(aggregate);

        console.log(aggregationArray);

        this.collection.aggregate(aggregationArray).toArray(callback);
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called create data--------', data);
        if (!data) {
            callback(new Error('Empty'), null);
        }

        this.collection.insert(data, (err, res) => {
            logger.debug('debug', 'inserting data..');

            if (err) {
                callback(err, null);
            }

            this.saveEntityElasticSearch(res.ops[0]);
            callback(err, res.ops[0]);
        });
    }

    public bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any) {
        logger.debug('debug', 'called bulk data-------', data);

        if (!data) {
            callback(new Error("Empty data.."), null);
        }


        this.collection.insertMany(data, (err, res) => {
            logger.debug('debug', 'inserting bulk data..');

            callback(err, null);
        });
    }

    public update(id: string, data: TEntity, options: Object, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data-----', data);

        this.collection.findOneAndUpdate({ _id: new ObjectID(id) }, data, options, (err, res) => {
            if (err) {
                callback(err, null);
            }

            logger.debug('debug', 'updated data with id------' + id);
            callback(err, res.value);
        });
    }

    public replace(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data--------', data);
        this.collection.findOneAndReplace({ _id: new ObjectID(id) }, data, (err, res) => {
            logger.debug('debug', 'replaced data with id------' + id);

            callback(err, res.value);
        });
    }


    public delete(id: string, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called delele data---------', id);

        this.collection.findOneAndDelete({ _id: id }, (err, res) => {
            logger.debug('debug', 'deleleed data..');

            callback(err, res.value);
        });
    }

    /*************PRIVATE FUNCTIONS****************************** */

    private getFields(query: any) {
        let fields: Array<string>;

        if (query['fields']) {
            fields = query['fields'].split(',');
        }

        return fields;
    }

    private getSortBy(query: any) {
        let sortObj: any = null;

        if (query['sortKey'] == 'Price') {
            sortObj = { 'Product.Description.Price': +query['sortOrder'] }
        }

        if (query['sortKey'] == 'ModifiedOn') {
            sortObj = { "ModifiedOn": +query['sortOrder'] };
        }

        if (query['sortKey'] == 'Discount') {
            sortObj = { 'Product.Description.Discount': +query['sortOrder'] };
        }     

        return sortObj;
    }

    private saveEntityElasticSearch(data) {

        let bulkBody = [];
        bulkBody.push({
            index: {
                _index: this.collectionname,
                _type: this.collectionname
            }
        });

        bulkBody.push(data);
        this.client.bulk({ body: bulkBody });
    }
}