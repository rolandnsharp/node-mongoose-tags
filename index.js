var _ = require('lodash');

module.exports = function(schema, options) {

  // add fields to mongoose schema
  schema.add({
    tags: [String]
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
			$pushAll: {
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

  schema.statics.removeTags = function(conditions, tags, callback) {

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
