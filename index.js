module.exports = function(schema, options) {

  // add fields to mongoose schema
  schema.add({
    tags: [String]
  });

  schema.statics.addTag = function(tag, callback) {

    this.update(conditions, update, options, function(err, numAffected) {
      if (err) {
        return callback(err);
      }
      callback(null, numAffected);
    });
  };


  schema.methods.addTag = function(tag, callback) {

  };

  schema.statics.removeTag = function(tag, callback) {

  };
};
