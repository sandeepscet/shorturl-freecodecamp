var express = require('express')
var app = express()
var mongoUtil = require('./mongoUtil.js');


app.get('/:id', function(req, res) {
  var id = parseInt(req.params.id,10);

  if(Number.isNaN(id)) {
    res.status(404).send("Invalid Short URL");
  } else {
    mongoUtil.mongoFindById(id, function ( docs) {
    
      if (docs && docs.length) {
        res.redirect(docs[0].url);
      } else {
        res.status(404).send("Invalid Short URL");
      }
    });

  }
});

app.get('/new/*?', function(req,res) {
  var theUrl = req.params[0];

  // Validate the URL
  if(theUrl) {
    // Search for URL first
    mongoUtil.mongoFindByUrl(theUrl, function (docs) {
      if(docs && docs.length) {


        res.status(200).send({
          "original_url": theUrl,
          "short_url": "https://freecodecamp-sandeepscet.c9users.io/" + docs[0].id
        });
      }
    });

    var id = 0;
   mongoUtil.mongoGetLastinsertedRecored(function(docs){
      if(docs.length)
        id = docs[0].id +1;
      var doc = {id:id, url : theUrl};
      // If it's not found, create a new one
      mongoUtil.mongoInsert(doc, function (doc) {
      
        return res.status(200).send({
          "original_url": theUrl,
          "short_url": "https://freecodecamp-sandeepscet.c9users.io/" + id
        });
      });
    })
   

   
  }
  else
  {
      return res.status(404).send("no Url found");
  }
});

app.get('/', function(req, res) {
  res.status(200).send("Example : localhost:8080/new/https://www.google.com <br> Usage: localhost:8080/2871");
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
