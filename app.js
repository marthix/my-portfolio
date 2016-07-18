// Setup
var port = 8000

var fileSystem = require('fs')
var momentDate = require('moment')
var passportAuth = require('passport')
var knexConfig = require('./knexfile.js')
var knexDatabase = require('knex')(knexConfig)
var bookshelfModel = require('bookshelf')(knexDatabase)
var express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()

// Routes
app.get('/api/v1/portfolio', function(req, res){
  knexDatabase
    .select()
    .from('portfolio')
    .then(function(data){
      res.json(data)
    })
})

app.post('/save', upload.single('image'), function (req, res) {
  knexDatabase
    .insert(req.body)
    .into('portfolio')
    .then(function(){
      res.send('Saved')
    })
})

// Save files
fs.readFile(req.files.displayImage.path, function (err, data) {
  var newPath = __dirname + "/uploads/uploadedFileName";
  fs.writeFile(newPath, data, function (err) {
    res.redirect("back");
  });
});

// Start
app.use(express.static('public'))
app.listen(port, function () {
  console.log('Web server on http://localhost:' + port)
  console.log('Press Ctrl+C to stop.')
})
