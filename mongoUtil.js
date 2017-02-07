var mongo = require('mongodb').MongoClient
var url = 'mongodb://freecodecamp:freecodecamp@ds145669.mlab.com:45669/shorturl-freecodecamp'


function mongoInsert(doc,callback)
{

        /*
        var doc = {
          id: id, url:url
        }
        */
        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('shorturls')
          collection.insert(doc, function(err, data) {
            if (err) throw err
            
            db.close()
            callback(doc)
          })
        })

}


function mongoFindById(id,callback)
{

        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('shorturls')
          collection.find({
            id: {
              $eq: +id
            }
          }).toArray(function(err, docs) {
            if (err) throw err
            db.close()
            callback(docs)
          })
        })

}

function mongoFindByUrl(argUrl,callback)
{
        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('shorturls')
          collection.find({
            url:argUrl
          }).toArray(function(err, docs) {
            if (err) throw err
            db.close()
            callback(docs)
          })
        })

}


function mongoGetLastinsertedRecored(callback)
{

        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('shorturls')
          collection.find({}).sort({_id:-1}).limit(1).toArray(function(err, docs) {
            if (err) throw err
            db.close()
            callback(docs)
          })
        })

}




module.exports = { 
   mongoInsert : mongoInsert,
   mongoGetLastinsertedRecored : mongoGetLastinsertedRecored,
   mongoFindById :mongoFindById,
   mongoFindByUrl: mongoFindByUrl
};
