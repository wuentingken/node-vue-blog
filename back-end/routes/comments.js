const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/default')
const mongo = require('../lib/mongo')
const checkLogin = require('../middlewares/check').checkLogin

// POST /comments 创建一条留言
router.get('/:essayId', checkLogin, function (req, res, next) {
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'comment', {essayId:req.params.essayId}, (data) => {
      data.map((item)=>{
        if(item.name === req.username) {
          return item.isDelete = true
        } else {
          return item.isDelete = false
        }
      })
      res.json({
        code: 200,
        data: {
          list: data
        }
      })
    })
  });
})

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  const comment = {
    ...req.body,
    name: req.username,
    createTime: new Date(),
  }
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'user', {name:comment.name}, (data) => {
      if(data.length>0) {
        comment.headImg = data[0].headImg
        mongo.insertDocuments(db, 'comment', comment, (data) => {
          if(data.result.ok > 0) {
            res.json({
              code: 200,
              msg: '恭喜宁，评论成功～'
            })
          } else {
            res.json({
              code: 500,
              msg: '评论失败，请重新尝试～'
            })
          }
          client.close();
        })
      }
    })
  });
})

// GET /posts/:postId/remove 删除一篇文章
router.delete('/:commentId', checkLogin, function (req, res, next) {
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.removeDocument(db, 'comment', {_id:req.params.commentId}, (data) => {
      res.json({
        code: 200,
        msg: '删除成功～'
      })
    })
  });
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  res.send('删除留言')
})

module.exports = router
