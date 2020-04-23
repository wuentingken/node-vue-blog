const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const path = require('path');


// POST /signup 用户注册
router.post('/',  function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, '../static/');
  // 解析 formData 数据
  form.parse(req, (err, fields ,files) => {
    if(err) return next(err)
    let imgPath = files.file.path;
    let imgName = files.file.name;
    console.log(imgName, imgPath);
    // 返回路径和文件名
    res.json({code: 1, data: { name: imgName, path: 'http://127.0.0.1:3000/'+imgPath.split('/')[imgPath.split('/').length-1] }});
  })
})

module.exports = router
