import { MongoDBConnection } from '../data/connection';
import { ElasticSearchConnection } from '../data/ElasticSearchConnection';
import { Db, Collection, ObjectID } from 'mongodb';
import logger = require('winston');
var es = require('elasticsearch');

//import Logger from '../Logger'; 
//const logger = Logger('server');

export interface IBaseRepository<TEntity> {
    get(query: any, callback: (err: Error, item: Array<TEntity>) => any);
    getByUserId(userId: string, query: any, callback: (err: Error, item: Array<TEntity>) => any);
    getById(id: string, callback: (err: Error, item: TEntity) => any);
    getCount(callback: (err: Error, item: number) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string, data: TEntity, option: Object, callback: (errr: Error, item: TEntity) => any);
    replace(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);
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

    public getCount(callback: (err: Error, item: number) => any) {
        this.collection.count(function (err, item) {
            logger.debug('Gettng Count...' + item);
            callback(err, item);
        });
    }

    public get(query: any, callback: (err: Error, item: Array<TEntity>) => any) {
        if (query) {
            this.getByPage(null, query, query["sortKey"], query["sortOrder"], query["pageSize"], query["pageNbr"], callback);
        } else {
            this.getAll(null, callback);
        }
    }

    public getByUserId(userId: string, query: any, callback: (err: Error, item: Array<TEntity>) => any) {
        logger.debug('base repo getByUserId...' + userId, query);
        if (query) {
            this.getByPage(userId, query, query["sortKey"], query["sortOrder"], query["pageSize"], query["pageNbr"], callback);
        } else {
            this.getAll(userId, callback);
        }
    }

    public getById(id: string, callback: (err: Error, item: TEntity) => any) {
        logger.debug('debug', 'reading get data..with id..' + id);
        this.collection.findOne({ _id: new ObjectID(id) }, function (err, results) {
            callback(err, results);
        });
    }

    private getAll(userId: string, callback: (err: Error, item: Array<TEntity>) => any) {
        this.collection.find({ UserId: new ObjectID(userId) }).toArray(function (err, item) {
            logger.debug('debug', 'reading all data for user..' + userId);
            callback(err, item);
        });
    }

    private getByPage(userId: string, query: any, sortKey: string, sortOrder: string, pageSize: number, pageNbr: number, callback: (err: Error, item: Array<TEntity>) => any) {

        var options;

        if (userId) {
            query.UserId = userId;
        }

        if (sortKey && sortOrder) {
            logger.debug('debug', 'reading many data..with query and sortkey, sortorder');
            options = {
                "sort": [sortKey, sortOrder]
            };

            this.collection.find(query, options).toArray((err, results) => {
                callback(err, results);
            });
        } else if (sortKey) {
            logger.debug('reading many data..with query and sortkey');
            options = {
                "sort": sortKey
            };
            this.collection.find(query, options).toArray(callback);
        } else {
            logger.debug('debug', 'reading many data..with query', query);
            console.log('query', query);
            this.collection.find(query).toArray(callback);
        }
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called create data--------', data);
        if (!data) {
            callback(new Error('Empty'), null);
        }

        this.collection.insert(data, function (err, res) {
            logger.debug('debug', 'inserting data..');

            callback(err, res.ops[0]);
        });

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

    public update(id: string, data: TEntity, option: Object, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data-----', data);
        console.log('before updated value is ', option);
        this.collection.findOneAndUpdate({ _id: new ObjectID(id) }, data, option, (err, res) => {
            logger.debug('debug', 'updated data with id------' + id);
            console.log('updated value is ', res);
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
}