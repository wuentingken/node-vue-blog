const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/default')
const mongo = require('../lib/mongo')
const jwt = require('jsonwebtoken');

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (req.headers.token) {
      const token = req.headers.token
      console.log(token)
      MongoClient.connect(config.mongodb, function (err, client) {
        assert.equal(null, err);
        const db = client.db(config.dbName);
        mongo.findDocuments(db, 'token', {token:token}, function (data) {
          if(data.length>0){
            // invalid token
            jwt.verify(token, 'ken', function(err, decoded) {
              if(err) {
                return res.json({
                  code:401,
                  msg:'token过期，请重新登录～'
                })
              }
              req.username = decoded.name
              client.close();
              next()
            });
          } else {
            client.close();
            return res.json({
              code:401,
              msg:'宁还未登录，请登录～'
            })
          }
        });
      });
    } else {
      return res.json({
        code:401,
        esg:'token过期，请重新登录～'
      })
    }
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录')
      return res.redirect('back')// 返回之前的页面
    }
    next()
  }
}
