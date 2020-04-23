const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/default')
const mongo = require('../lib/mongo')

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/essayList', checkLogin, function (req, res, next) {
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'essay', {}, (data) => {
      res.json({
        code: 200,
        data: {list: data}
      })
      client.close();
    })
  });
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  const essay = {
    ...req.body,
    name: req.username,
    createTime: new Date(),
    visit: 0
  }
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'user', {name:essay.name}, (data) => {
      if(data.length>0) {
        essay.headImg = data[0].headImg
        mongo.insertDocuments(db, 'essay', essay, (data) => {
          if(data.result.ok > 0) {
            res.json({
              code: 200,
              msg: '恭喜宁，发布成功～'
            })
          } else {
            res.json({
              code: 500,
              msg: '发布失败，请重新尝试～'
            })
          }
          client.close();
        })
      }
    })
  });
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:essayId', function (req, res, next) {
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.findDocuments(db, 'essay', {_id:req.params.essayId}, (data) => {
      res.json({
        code: 200,
        data: data[0]
      })
    })
  });
})

// GET /posts/:postId/remove 删除一篇文章
router.delete('/:essayId', checkLogin, function (req, res, next) {
  MongoClient.connect(config.mongodb, function (err, client) {
    assert.equal(null, err);
    const db = client.db(config.dbName);
    mongo.removeDocument(db, 'essay', {_id:req.params.essayId}, (data) => {
      res.json({
        code: 200,
        msg: '删除成功～'
      })
    })
  });
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})


module.exports = router
