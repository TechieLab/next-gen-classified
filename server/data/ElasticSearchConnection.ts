import { Db, MongoClient} from 'mongodb';
import logger = require('winston');

var fs = require('fs');
var es = require('elasticsearch');

export class ElasticSearchConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error: Error, db: Db) => {
                if (error) throw error;

                return result(this.db);
            });
        }
    }

    private static connect(result: (error: Error, db: Db) => void) {
     var client = new es.Client({
                host: '127.0.0.1:9201',
                log: 'error'
            });
        client.ping({}, (error: Error, db: Db) => {
            this.db = client;
            this.isConnected =  true;

            return result(error,db);

        });
    }
}