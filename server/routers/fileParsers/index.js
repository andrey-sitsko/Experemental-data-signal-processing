module.exports.getFilesList = (uploadedFiles) => {
    const rootFile = uploadedFiles.find((file) => {
            return file.name.match('.txt');
        });

    if(rootFile) {
        const rawData = Buffer.from(rootFile.data).toString(),
            filesArr = rawData.split('\r\n');

        filesArr.splice(-1);
        return filesArr;
    }
}

module.exports.getSignalsData = (files, filesList) => {
    let signalData = files.filter((file) => {
        return filesList.some((fileName) => {
            return fileName === file.name;
        });
    });

    return signalData.map((signal) => {
        return signal.data;
    });
}

module.exports.processSignals = (signals) => {
    const testData = signals[0].readInt32LE(52);
    let result = [];

    for(let i = 52; i <= 100; i++) {
        result.push(signals[0].readInt32BE(i));
    }
    return signals;
}