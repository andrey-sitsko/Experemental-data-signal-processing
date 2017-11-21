const express = require('express'),
  path = require('path'),
  fileUpload = require('express-fileupload'),
  app = express(),
  routers = require('./server/routers/');

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'app')));
routers(app);

app.listen(8000);