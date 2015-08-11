var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Test = require('./model');

var test = {
    default: {
        _id: new ObjectId(),
        name: 'default'
    },
    test1: {
        _id: new ObjectId(),
        name: 'test1'
    },
    test2: {
        _id: new ObjectId(),
        name: 'test2'
    }
};

module.exports = {
    test: test
};
