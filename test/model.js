var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/node-mongoose-tags');

mongoose.connection.on('error', function(err) {
    console.log('database connection error:', err);
});

mongoose.connection.on('open', function() {
    console.log('database connection open...');
});

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

var tags = require('../');

schema.plugin(tags);

module.exports = mongoose.model('test', schema);
