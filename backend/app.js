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

app.get('^/location$', function(req, res) {
 res.render(__dirname + '/views/location'); 
});


app.get('^/:lat/:long$', function(req, res, lat, long) {
  // GET images from YQL for lat/long and return JSON response 
});

app.get('^/context$', function(req, res) {

  new yql.exec("select * from flickr.photos.search where text=\"*\" and api_key=@api_key and lat=@lat and lon=@lon", function(response) {
    // Return just the images for this location
    res.json(response.query.results);
  }, { "api_key": api.flickrApiKey, "lat": req.query.lat, "lon": req.query.long });

});

// Main loop
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
