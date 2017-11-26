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

module.exports.parseSignals = (files, filesList) => {
    let signalsData = files.filter((file) => {
        return filesList.some((fileName) => {
            return fileName === file.name;
        });
    });

    return signalsData.map((signal) => {
        return parseSignal(signal);
    });
}

function parseSignal (signal) {
    const signalData = signal.data;
    let retVal = [];
    return {
        params: getSignalParams(signalData),
        signalData: getSignalData(signalData)
    }
}

function getSignalData(signalData) {
    let _signalData = [];
    for(let i = 52; i <signalData.length - 4; i += 4) {
        _signalData.push(signalData.readFloatLE(i))
    }
    return _signalData;
}

function getSignalParams (signalData) {
    return {
        incomeChannelsNumber: signalData.readUIntLE(4,4),
        sampleSizeN: signalData.readUIntLE(8,4),
        spectrumLinesCount: signalData.readUIntLE(12,4),
        //частота среза,
        //частотное разрешение,
        //Время приёма блока данных,
    }
}