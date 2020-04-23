
module.exports = function (app) {
  //在req.files中获取文件数据
  app.use('/upload',require('./upload'))
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))
}
