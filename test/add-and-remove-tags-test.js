var Document = require('./model').document;
var Tag = require('./model').tag;

describe("AddTags Static: ", function() {

  var doc1;
  var doc2;
  var tag1;
  var tag2;
  var tag3;

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
      },
      {
        label: 'label3'
      }], function(err, tags) {
        tag1 = tags[0];
        tag2 = tags[1];
        tag3 = tags[2];

        done();
      });
    });
  });

  it("should add multiple tags", function(done) {


    var documents = [doc1._id, doc2._id];
    var tags = [tag1._id, tag2._id, tag3._id];

    Document.addTags(documents, tags, function(err, response) {

      // should.not.exist(err);

      Document.find(documents, function(err, docs) {
        // should.not.exist(err);

        docs.should.be.an.Array;
        docs.length.should.be.exactly(2);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(3);
          doc.tags[0].toString().should.be.exactly(tags[0].toString());
          doc.tags[1].toString().should.be.exactly(tags[1].toString());
          doc.tags[2].toString().should.be.exactly(tags[2].toString());
        });

        done();
      });
    });
  });

  it("should remove multiple tags", function(done) {

    var documents = [doc1._id, doc2._id];
    var tags = [tag1._id, tag2._id];

    Document.removeTags(documents, tags, function(err, response) {
      // should.not.exist(err);

      Document.find(documents, function(err, docs) {
        // should.not.exist(err);

        docs.should.be.an.Array;
        docs.length.should.be.exactly(2);

        docs.forEach(function(doc) {
          doc.tags.should.be.an.Array;
          doc.tags.length.should.be.exactly(1);
          // doc.tags[0].should.be.exactly('tag3');
        });

        done();
      });
    });
  });

  after(function(done) {
    Document.remove({}, function(err) {
      Tag.remove({}, done);
    });
  });

});
