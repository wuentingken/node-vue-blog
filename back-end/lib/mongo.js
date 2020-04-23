const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const insertDocuments = function(db, documents, query, callback) {
  // Get the documents collection
  const collection = db.collection(documents);
  // Insert some documents
  collection.insertMany([query], function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

const findDocuments = function(db, documents, query, callback) {
  // Get the documents collection
  const collection = db.collection(documents);
  // Find some documents
  if(query._id) query._id = ObjectID(query._id)
  collection.find(query).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

const updateDocument = function(db, documents, query, setQuery,  callback) {
  // Get the documents collection
  const collection = db.collection(documents);
  // Update document where a is 2, set b equal to 1
  collection.updateOne(query, setQuery, function(err, result) {
      assert.equal(err, null);
      callback(result);
    });
}

const removeDocument = function(db, documents, query, callback) {
  // Get the documents collection
  const collection = db.collection(documents);
  // Delete document where a is 3
  if(query._id) query._id = ObjectID(query._id)
  collection.deleteOne(query, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

const indexCollection = function(db, documents, query, callback) {
  db.collection(documents).createIndex(
    query,
    null,
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};

module.exports = {
  insertDocuments,
  findDocuments,
  updateDocument,
  removeDocument,
  indexCollection
}

