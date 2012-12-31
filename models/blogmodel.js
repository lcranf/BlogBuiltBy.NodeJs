var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 var BlogSchema = new Schema({
      name: { type: String, required: true }
 });

 module.exports = mongoose.model('BlogModel', BlogSchema);