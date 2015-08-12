var Test = require('./model');
var should = require('should');

describe("AddTags Static: ", function() {

  before(function(done) {

    Test.create([{
      name: 'test1'
    }, {
      name: 'test2'
    }], function(err) {
      done();
    });
  });

  it("should add multiple tags", function(done) {

    var conditions = {};
    var tags = ['tag1', 'tag2', 'tag3'];

    Test.addTags(conditions, tags, function(err, response) {
      should.not.exist(err);

      Test.find(conditions, function(err, docs) {
        should.not.exist(err);

        docs.should.be.an.Array;
        docs.length.should.be.exactly(2);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(3);
          doc.tags[0].should.be.exactly(tags[0]);
          doc.tags[1].should.be.exactly(tags[1]);
          doc.tags[2].should.be.exactly(tags[2]);
        });

        done();
      });
    });
  });

  it("should remove multiple tags", function(done) {

    var conditions = {};
    var tags = ['tag1', 'tag2'];

    Test.removeTags(conditions, tags, function(err, response) {
      should.not.exist(err);

      Test.find(conditions, function(err, docs) {
        should.not.exist(err);

        docs.should.be.an.Array;
        docs.length.should.be.exactly(2);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(1);
          doc.tags[0].should.be.exactly('tag3');
        });

        done();
      });
    });
  });


  after(function(done) {
    Test.remove({}, done);
  });

});
