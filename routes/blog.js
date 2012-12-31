var mongoose = require('mongoose')
  , blogModel = require('../models/blogmodel.js');


var blogs = [
  { id: 1, name: 'Blog #1'},
  { id: 2, name: 'Blog #2'},
  { id: 3, name: 'Blog #3'}
];

module.exports = Blog;

function Blog(connection) {
	mongoose.connect(connection);
}

Blog.prototype = {

    index: function(req, res) {
	    res.render('blog', { title: 'Blog List', data: blogs } );
    },

	addBlog: function(req, res) {
		var name = req.body.name;

		var newBlog = new blogModel();

		newBlog.name = name;

		newBlog.save(function(err) {
			if(err) 
				throw err;
			res.json({ isvalid: true, message: "blog is saved with id of " + newBlog._id });
		});

		console.log("Name is " + name);

		//res.json({ isvalid: true, message: "blog is saved for " + name });
	},

	deleteBlog: function(req, res) {
		var id = req.params.id;

		console.log("Blog to delete: " + id);
		res.json({ isvalid: true, message: "blog deleted with id of " + id });
	}
}