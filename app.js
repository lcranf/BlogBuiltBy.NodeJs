
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var Blog = require('./routes/blog');
var blog = new Blog('mongodb://dbuser:KLQcvn8F@ds047057.mongolab.com:47057/blogs');
app.get('/', blog.index.bind(blog));
app.post('/blog/add', blog.addBlog.bind(blog));
app.post('/blog/delete/:id', blog.deleteBlog.bind(blog));
app.get("/sample", routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
