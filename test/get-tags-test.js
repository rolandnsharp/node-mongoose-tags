var Document = require('./model').document;
var Tag = require('./model').tag;
var should = require('should');

describe('getTags static method : ', function() {

  var doc1;
  var doc2;
  var tag1;
  var tag2;

  before(function(done) {
    Document.create([{
      name: 'test1'
    }, {
      name: 'test2'
    }], function(err, docs) {
      doc1 = docs[0];
      doc2 = docs[1];

      Tag.create([{
        label: 'label1'
      }, {
        label: 'label2'
      }], function(err, tags) {
        tag1 = tags[0];
        tag2 = tags[1];

        done();
      });
    });
  });

  it('should return tags for document', function(done) {

    var documentId = doc1._id;
    var tags = [tag1._id, tag2._id];

    Document.addTags(documentId, tags, function(err, res) {
      Document.getTags(documentId, function(err, tags) {
        should.not.exist(err);

        tags[0].should.be.exactly(tags[0]);
        tags[1].should.be.exactly(tags[1]);

        done();
      });
    });
  });

  after(function(done) {
    Document.remove({}, function(err){
      Tag.remove({}, done);
    });
  });

});
