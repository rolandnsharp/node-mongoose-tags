var Document = require('./model').document;
var Tag = require('./model').tag;
var should = require('should');

describe('addTags idempotency : ', function() {

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

  it('should not add duplicate tags', function(done) {

    var documents = [doc1._id, doc2._id];
    var tags = [tag1._id, tag2._id];

    Document.addTags(documents, tags, function(err, response) {
      Document.find(documents, function(err, docs) {
        should.not.exist(err);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(2);
          doc.tags[0].toString().should.be.exactly(tags[0].toString());
          doc.tags[1].toString().should.be.exactly(tags[1].toString());
        });

        Document.addTags(documents, tags, function(err, _response) {
          Document.find(documents, function(err, _docs) {

            should.not.exist(err);

            _docs.forEach(function(_doc) {
              _doc.tags.should.be.an.Array;
              _doc.tags.length.should.be.exactly(2);
              _doc.tags[0].toString().should.be.exactly(tags[0].toString());
              _doc.tags[1].toString().should.be.exactly(tags[1].toString());
            });

            done();
          });
        });
      });
    });
  });

  after(function(done) {
    Document.remove({}, function(err) {
      Tag.remove({}, done);
    });
  });

});
