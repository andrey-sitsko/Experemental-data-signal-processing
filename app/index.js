require('angular');
require('angular-upload');

const nanqmean = require( 'compute-nanqmean' );
const ft = require('fourier-transform');

angular.module('myApp', ['lr.upload'])
.controller('mainCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
    $scope.uploadFiles = (response) => {
        const COUNT_DIVIDER = 16;

        const signals = response.data;
        $scope.signals = signals;
        $timeout(() => {
            function drawChart(chartName, signalData, fileName) {
                const _signalData = signalData.map((point, index) => ({
                    x: index,
                    y: point
                }));

                let canvas = new CanvasJS.Chart(chartName, {
                    title: {
                        text: fileName               
                    },
                    zoomEnabled: true,
                    data: [{
                        type: 'line',
                        dataPoints: _signalData
                    }]
                });
                canvas.render();
            }

            signals.forEach((signal, index) => {
                let signalData = signal.data.slice(0, signal.params.sampleSizeN);
                drawChart(`chartContainer${index}`, signalData, signal.params.fileName);

                let transfomedSignalData = ft(signalData);
                //Dirtiest hack in the whole lab
                transfomedSignalData[0] = transfomedSignalData[1];
                //
                drawChart(`chartContainerSpectrum${index}`, transfomedSignalData, `Амплитудный спектр ${signal.params.fileName}`);

                signal.params.maxValue = Math.max(...signalData).toFixed(8);
                signal.params.minValue = Math.min(...signalData).toFixed(8);
                signal.params.nanqmean = nanqmean(signalData).toFixed(8);
            });
        });
    }
}]);