// requires
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var mongoose = require ('mongoose');

// globals
var port = 4000 || process.env.PORT;

//Connect to DB
mongoose.connect('localhost:/27017/recordsDB');

var recordSchema = mongoose.Schema({
  artist: String,
  imageUrl: String,
  name: String,
  releaseYear: Number
});

var record = mongoose.model('record', recordSchema);

//Base URL
app.get ('/', function (req, res){
  console.log('base URL hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

//uses
app.use (express.static('public'));
app.use (bodyParser.urlencoded({extended:true}));

app.listen (port, function (){
  console.log('server up on:', port);
});

app.post('/addRecord', function (req, res) {
  var newRecord = record(req.body);
  console.log('album', req.body);
  newRecord.save();
  res.send(200);
});

app.get('/grabRecord', function(req, res){
  console.log('in grab records ');
  record.find().then(function(data){
    res.send(data);
  });
});

app.delete('/wackRecord', function(req,res){
  record.remove(req.body, function(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    else{
      res.send(200);
    }
  });
});

app.put('/updateRecord', function(req,res){
  console.log('in updateRecord',req.body);
  record.findById(req.body._id, function(err, rec){
    if(err){
      res.send(500);
    }
    else{
      rec.artist = req.body.artist;
      rec.imageUrl = req.body.imageUrl;
      rec.name = req.body.name;
      rec.releaseYear = req.body.releaseYear;
      rec.save(function(err){
        if(err){
          res.send(500);
        }
        else{
          res.send(200);
        }
      });
    }
  });
});
