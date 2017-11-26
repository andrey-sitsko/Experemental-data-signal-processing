const fileParsers = require('./fileParsers');

module.exports = (app) => {
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.post('/getFilesData', (req, res) => {
    const uploadedFiles = req.files;
    let files = [];
    for(let key of Object.keys(uploadedFiles)) {
      files.push(uploadedFiles[key]);
    }
    const filesList = fileParsers.getFilesList(files),
      signalsData = fileParsers.parseSignals(files, filesList);

    res.send(signalsData);
  });
}
