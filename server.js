var express = require('express');
var bodyParser = require('body-parser');
var Twit = require('twit');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var T = new Twit({
  consumer_key:         'xQ1TjpZRe0L4AzZ9rVyPcd1JU',
  consumer_secret:      'IGEVKZ5cbsHXFWPLWtxecF8HYDI6xC9VhIQcYA55GRnC6A791Q',
  access_token:         '2224795867-8yXetYLbH8UO35Lbsp3refKcUA0IWeOJnhXzQb8',
  access_token_secret:  'skWqBPlGZCpyI10CvNgYl3KJWEzJcvsF4txnr6ShN86qS',
  //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var stream = T.stream('statuses/filter', { track: '#toyota', language: 'en' });

stream.on('connected', function (response) {
  console.log('connected');
});


stream.on('tweet', function (tweet) {
  console.log(tweet);

 fs.appendFile('E:/Private/Tweet collector/test.txt', JSON.stringify(tweet), function (err) {
   if (err) throw err;
   console.log('~~~~~~~~~~~~~ Saved to file');
 }); 

/*
  fs.writeFile("E:/Private/Tweet collector/test.txt", JSON.stringify(tweet), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });  */
});

app.listen(3000);
console.log("Tweet collector running on port 3000");