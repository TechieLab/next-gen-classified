import { Db, Collection, ObjectID } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';

import { Product } from '../models/product';
import { Post } from '../models/post';

export interface IPostingRepository extends IBaseRepository<Post> {
}

export class PostingRepository extends BaseRepository<Post> implements IPostingRepository {

    postAggregate: any[] = [{
        $lookup: {
            from: "lookups",
            localField: "Category",
            foreignField: "_id",
            as: "Category"
        }
    }, {
        $unwind: "$Category"
    }, {
        $lookup: {
            from: "lookups",
            localField: "Product.Description.Brand",
            foreignField: "_id",
            as: "Product.Description.Brand"
        }
    }, {
        $unwind: "$Product.Description.Brand"
    }, {
        $lookup: {
            from: "lookups",
            localField: "Product.Defects",
            foreignField: "_id",
            as: "Product.Defects"
        }
    }
        // }, {
        //     $unwind: "$Product.Defects"
        // }
    ];

    constructor() {
        super("posts");
    }

    public getById(id: string, callback: (err: Error, item: Post) => any) {
        this.aggregate({ _id: new ObjectID(id)}, this.postAggregate, (error, res) => {
            logger.debug('getById post count.....', res.length );
            callback(error, res[0]);
        });
    }

    public get(query: any, callback: (err: Error, item: Array<Post>) => any) {
        this.aggregate(query, this.postAggregate, callback);
    }
}

