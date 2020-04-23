const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/default')
const mongo = require('../lib/mongo')
const jwt  = require('jsonwebtoken');

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('登录页')
})

// POST /signin 用户登录
router.post('/', function (req, res, next) {
  const user = req.body
  MongoClient.connect(config.mongodb, function(err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'user', user,function(data) {
      if(user.name&&data.length>0) {
        let payload = req.body;
        let secret = 'ken';
        let token = jwt.sign(payload,secret,{expiresIn:60*60*12});
        mongo.insertDocuments(db,'token',{token:token}, ()=> {
          res.json({
            code: 200,
            msg:'登录成功～',
            token: token
          })
          client.close();
        })
        // let payload1 = jwt.verify(token,secret)
      } else {
        res.json({
          code:500,
          msg:'输入的用户名或密码错误'
        })
        client.close();
      }
    });
  });
})

module.exports = router
