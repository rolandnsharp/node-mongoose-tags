var Test = require('./model');
var should = require('should');

describe("AddTags Statics: ", function() {

  it("should add tags", function(done) {

    var conditions = {};
    var tags = ['tag1', 'tag2'];

    Test.addTags(conditions, tags, function(err, response) {
      should.not.exist(err);

      Test.find(conditions, function(err, docs){
        console.log(err, docs);
      });


      done();
    });
  });


});
