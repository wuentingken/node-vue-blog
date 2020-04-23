const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/default')
const mongo = require('../lib/mongo')

const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signup 用户注册
router.post('/', checkNotLogin,  function (req, res, next) {
  // Use connect method to connect to the server
  MongoClient.connect(config.mongodb, function(err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.insertDocuments(db, 'user', req.body,function(data) {
      res.send({
        status:200,
        data,
        message:'success'
      })
      client.close();
    });
  });
})

module.exports = router
