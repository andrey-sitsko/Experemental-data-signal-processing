const fileParsers = require('./fileParsers');

module.exports = (app) => {
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.post('/getFilesData', (req, res) => {
    const files = req.files.files,
      filesList = fileParsers.getFilesList(files),
      signalsData = fileParsers.parseSignals(files, filesList);

    res.send(signalsData);
  });
}
