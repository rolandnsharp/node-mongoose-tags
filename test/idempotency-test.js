var Test = require('./model');
var should = require('should');

describe('addTags idempotency : ', function() {

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

  it('should not add duplicate tags', function(done) {

    var documents = [doc1, doc2];
    var tags = ['tag1', 'tag2'];

    Test.addTags(documents, tags, function(err, response) {
      Test.find(documents, function(err, docs) {
        should.not.exist(err);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(2);
          doc.tags[0].should.be.exactly(tags[0]);
          doc.tags[1].should.be.exactly(tags[1]);
        });

        Test.addTags(documents, tags, function(err, _response) {
          Test.find(documents, function(err, _docs) {

            should.not.exist(err);

            _docs.forEach(function(_doc) {
              _doc.tags.should.be.an.Array;
              _doc.tags.length.should.be.exactly(2);
              _doc.tags[0].should.be.exactly(tags[0]);
              _doc.tags[1].should.be.exactly(tags[1]);
            });

            done();
          });
        });
      });
    });
  });

  after(function(done) {
    Test.remove({}, done);
  });

});
