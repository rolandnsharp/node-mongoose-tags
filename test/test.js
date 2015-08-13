var Test = require('./model');
var should = require('should');

describe("AddTags Static: ", function() {

  var doc1;
  var doc2;

  before(function(done) {
    Test.create([{
      name: 'test1'
    }, {
      name: 'test2'
    }], function(err, docs) {
      doc1 = docs[0]._id;
      doc2 = docs[1]._id;

      done();
    });
  });

  it("should add multiple tags", function(done) {


    var tags = ['tag1', 'tag2', 'tag3'];
    var documents = [doc1, doc2];

    Test.addTags(documents, tags, function(err, response) {
      should.not.exist(err);

      Test.find(documents, function(err, docs) {
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

    var documents = [doc1, doc2];
    var tags = ['tag1', 'tag2'];

    Test.removeTags(documents, tags, function(err, response) {
      should.not.exist(err);

      Test.find(documents, function(err, docs) {
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
