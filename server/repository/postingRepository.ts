
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';

import { Product } from '../models/product';
import { Post } from '../models/post';

export interface IPostingRepository extends IBaseRepository<Post> {
}

export class PostingRepository extends BaseRepository<Post> implements IPostingRepository {

    constructor() {
        super("posts");
    }

    public get(query: any, callback: (err: Error, item: Array<Post>) => any) {
        let aggergate = [{
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
        },{
            $lookup: {
                from: "lookups",
                localField: "Product.Defects",
                foreignField: "_id",
                as: "Product.Defects"
            }
        }, {
            $unwind: "$Product.Defects"
        }];

        this.aggregate(query, aggergate, callback);
    }
}

