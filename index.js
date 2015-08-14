var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = function(schema, options) {

  // FIXME: perhaps we could set the ref from the options
  schema.add({
    tags: [{
      type: ObjectId,
      ref: 'tag'
    }]
  });

  schema.statics.addTags = function(documents, tags, callback) {

    if (!_.isArray(documents)) {
      documents = [documents];
    }

    if (!_.isArray(tags)) {
      tags = [tags];
    }

    var conditions = {
      _id: {
        '$in': documents
      }
    };

    var update = {
      '$addToSet': {
        tags: {
          "$each": tags
        }
      }
    };

    var options = {
      multi: true
    };

    this.update(conditions, update, options, function(err, numAffected) {
      if (err) {
        return callback(err);
      }
      callback(null, numAffected);
    });
  };

  schema.statics.removeTags = function(documents, tags, callback) {

    if (!_.isArray(documents)) {
      documents = [documents];
    }

    if (!_.isArray(tags)) {
      tags = [tags];
    }

    var conditions = {
      _id: {
        '$in': documents
      }
    };

    var update = {
      $pullAll: {
        tags: tags
      }
    };

    var options = {
      multi: true
    };

    this.update(conditions, update, options, function(err, numAffected) {
      if (err) {
        return callback(err);
      }
      callback(null, numAffected);
    });
  };


  schema.methods.addTags = function(tag, callback) {



    this.tags
  };

  schema.statics.removeTag = function(tag, callback) {

  };
};
