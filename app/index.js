require('angular');
require('angular-upload');
require('angular-chart.js');
require('chart.js');

angular.module('myApp', ['chart.js', 'lr.upload'])
.controller('mainCtrl', ['$scope', ($scope) => {
    $scope.uploadFiles = (response) => {
        const COUNT_DIVIDER = 16;

        let signals = response.data;
        signals.forEach((signal) => {
            signal.data = signal.data
            .slice(0, signal.params.sampleSizeN)
            .filter((val, index) => index % COUNT_DIVIDER === 0)
            .map((val) => val.toFixed(3));

            signal.labels = [];
            for(let i = 0; i <= signal.params.sampleSizeN; i+= COUNT_DIVIDER) {
                signal.labels.push(i);
            }
        });
        $scope.signals = signals;
    }
}]);