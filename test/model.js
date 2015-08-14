var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/node-mongoose-tags');

mongoose.connection.on('error', function(err) {
    console.log('database connection error:', err);
});

mongoose.connection.on('open', function() {
    console.log('database connection open...');
});

var documentSchema = new Schema({
    name: String
}, {
    collection: 'documentCollection'
});

var tagSchema = new Schema({
    label: String
}, {
    collection: 'tagCollection'
});

var tags = require('../');

documentSchema.plugin(tags);

module.exports = {
  document: mongoose.model('document', documentSchema),
  tag: mongoose.model('tag', tagSchema)
};
