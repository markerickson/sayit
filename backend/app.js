var fs = require('fs');
var path = require('path');
var http = require('http');
var yql = require('yql');
var express = require('express');

config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
api = JSON.parse(fs.readFileSync('./api.json', 'utf-8'));

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || config.PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  // Serve static files (without cookies, compression etc). 
  app.use('/public/css', express.static(__dirname + '/public/css'));
  app.use('/public/font', express.static(__dirname + '/public/font'));
  app.use('/public/img', express.static(__dirname + '/public/img'));
  app.use('/public/js', express.static(__dirname + '/public/js'));

  // Compress everything else
  app.use(express.compress());

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.COOKIE_SECRET));
  app.use(express.cookieSession({
    secret: config.SESSION_COOKIE
  }));
  app.use(express.csrf());

  // Everytime a Jade template is rendered
  // the CSRF token will be accessible as `csrftoken`
  // within that template
  app.use(function(req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('jsonp callback', true);

  // Disable client socket pooling
  http.agent = false;
});



// Routes
app.get('^/$', function(req, res) {
  console.log('Hello');
  res.send(200, "Hello");
});

app.get('^/location', function(req, res) {
  var fakeResults = [ "http://farm7.staticflickr.com/6164/6245876581_7db0d9a30e.jpg", "http://farm7.staticflickr.com/6095/6245904145_463da11ef8.jpg", "http://farm7.staticflickr.com/6163/6245954433_3228e748d4.jpg", "http://farm7.staticflickr.com/6100/6246479090_09f3577081.jpg", "http://farm7.staticflickr.com/6165/6245958185_658d18a3cb.jpg", "http://farm7.staticflickr.com/6105/6245938297_faab1fe857.jpg", "http://farm7.staticflickr.com/6227/6245939029_d564f0d908.jpg", "http://farm7.staticflickr.com/6052/6245906261_5ab43fcbf6.jpg", "http://farm7.staticflickr.com/6164/6246383386_235c50b96c.jpg", "http://farm7.staticflickr.com/6225/6249245508_25daf00a48.jpg" ];

  res.json(fakeResults);
});

app.get('^/story$', function(req, res) {

  if (req.query.lat && req.query.long) {
    new yql.exec("select * from flickr.photos.search where text=\"*\" and api_key=@api_key and lat=@lat and lon=@lon and radius=\"30\"", function(response) {
      var story = {};
      var images = [];
      var results = response.query.results;

      if (response.error) {
        res.json(500, { "error": "There was an error" });
      } else {
        if (response.query.results !== null) {
          // If there are actual results
          response.query.results.photo.forEach(function (item) {
            var url = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'; 
            images.push(url);
          });
          
        }
      }

      res.json(story);

    }, { "api_key": api.flickrApiKey, "lat": req.query.lat, "lon": req.query.long });
  } else {
    // Query strings do not have lat/long
    res.json(500, { "error": "There was an error" });
  }

});

// Main loop
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
