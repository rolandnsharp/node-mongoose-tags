# node-mongoose-tags

Mongoose Tags
==================================

A tagging plugin for Mongoosejs.

This is a basic plugin which adds a `tags` field to a collection schema, and provides statics methods and instance methods for adding and removing these tags.

Tags are simply an array of document identifiers which reference your tags collection.

### Install

TODO: publish to npm.

Add to package.json
```
"dependencies": {
    "node-mongoose-tags": "rolandnsharp/node-mongoose-tags"
}
```
Install `npm install`.

### Add the plugin to the schema.

```
var mongoose = require('mongoose');
schema = mongoose.Schema;
schema.plugin(require('node-mongoose-tags'));
```
## Static Methods

### addTags(documentIds, tagIds, callback)

Adds the `tagIds` to the `tags` field of all documents of `documentIds`.

### removeTags(documentIds, tagIds, callback)

Removes the `tagIds` from the `tags` field of all documents with id's of `documentIds`.

### getTags(documentId, callback)

Gets all tags of `documentId`.

### Test

Run `npm test`
