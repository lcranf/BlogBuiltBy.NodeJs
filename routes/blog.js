var mongoose = require('mongoose')
  , blogModel = require('../models/blogmodel.js');

module.exports = Blog;

function Blog(connection) {
	mongoose.connect(connection);
}

Blog.prototype = {

    index: function(req, res) {
    	blogModel.find(function (err, blogs) {

    		if(err)
    			throw err;

    		res.render('blog', { title: 'Blogs', data: blogs });
    	});	    
    },

	addBlog: function(req, res) {
		var name = req.body.name;

		var newBlog = new blogModel();
		newBlog.name = name;

		newBlog.save(function(err) {
			if(err) 
				throw err;
			res.json({
			            isvalid: true,
			            message: "'" + newBlog.name + "' was successfully saved.",
			            blog: { id: newBlog.id, name: newBlog.name }
			          });
		});
	},

	updateBlog: function(req, res) {
		var updatedBlog = {
			id: req.body.id,
			name: req.body.name
		};        

        blogModel.findByIdAndUpdate(updatedBlog.id, { name: updatedBlog.name }, function(err, item) {

        	if(err)
        		throw err;

        	res.json({
        	            isvalid: true,
        	            message: "'" + updatedBlog.name + "' was successfully updated.",
        	            blog: { id: updatedBlog.id, name: updatedBlog.name }
        	         });

        });
	},

	deleteBlog: function(req, res) {
		var id = req.params.id;

		blogModel.findByIdAndRemove(id, function(err, item) {
            if(err)
            	throw err;

            res.json({ isvalid: true, message: "Blog was successfully deleted with id of " + item.id, blog: { id: id } });
		});		
	}
}