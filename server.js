var express = require('express')
var app = express()
var mongoUtil = require('./mongoUtil.js');


var doc = {
  id: 1, url:'https://google.com'
}

mongoUtil.mongoInsert(doc,function(data){
        console.log(data);
        console.log('inserted');
});

mongoUtil.mongoFindById(1,function(data){
        console.log(data);
        console.log('findById');
});

mongoUtil.mongoFindByUrl('https://google.com',function(data){
        console.log(data);
        console.log('findByUrl');
});

mongoUtil.mongoGetLastinsertedRecored(function(data){
        console.log(data);
        console.log('lastInseted');
});


app.get('/:id', function(req,res) {
var myDate = '';
  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }


});


app.get('/new/*', function(req,res) {

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }


});




app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
