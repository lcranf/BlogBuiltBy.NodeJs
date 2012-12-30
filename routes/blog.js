
var blogs = [
  { id: 1, name: 'Blog #1'},
  { id: 2, name: 'Blog #2'},
  { id: 3, name: 'Blog #3'}
]

exports.index = function(req, res) {
	res.render('blog', { title: 'Blog List', data: blogs } );
}