(function () {
  'use strict';

  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
    let post;

    data.forEach(obj => {
      console.log('item', obj);
      // Rework the data slightly
      post = {
        id: obj._id, // Was originally a mongodb entry
        Title: obj.Title,
        Status: obj.Status,
        CreatedBy: obj.CreatedBy,
	      CreatedOn: obj.CreatedOn,
      	ModifiedBy: obj.ModifiedBy,
	      ModifiedOn: obj.ModifiedOn,
        PostId: obj.PostId,
	      AdType: obj.AdType,
        UserId: obj.UserId,
        Product: {
          Status: obj.Product.Status,
          Name: obj.Product.Name,
          Category: obj.Product.Category,
          CreatedBy: obj.Product.CreatedBy,
	        CreatedOn: obj.Product.CreatedOn,
        	ModifiedBy: obj.Product.ModifiedBy,
	        ModifiedOn: obj.Product.ModifiedOn,
          Description: {
            Title: obj.Product.Description.Title,
            IsNew: false,
            IsUsed: false,
            Features: [],
            IsBillAvaialbe: false,
            PurchasedOn: obj.Product.Description.PurchasedOn,
            Price: obj.Product.Description.Price,
            Brand: obj.Product.Description.Brand,
            Model: obj.Product.Description.Model,
            Defects: obj.Product.Description.Defects
          },
          Photos: [],
          Review: {
            Status: "",
            Title: "",
            Description: "",
            Rating: 0
          }

        },
        Location: obj.Location
      };


      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: obj._id
        }
      });

      bulkBody.push(post);
    });

    esClient.bulk({ body: bulkBody })
      .then(response => {
        console.log('chechk ---->>', response.items);
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
      })
      .catch(console.err);
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    const articlesRaw = fs.readFileSync('post.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('post', 'article', articles);
  };

  test();

  module.exports = {
    bulkIndex
  };
} ());



