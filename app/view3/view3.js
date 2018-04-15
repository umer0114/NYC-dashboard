
angular.module('dashboard')
    .controller('View3Ctrl', function ($scope, myAppSharedService, $location) {
        'use strict';
        function getMarker() {
            var markerIndex =_.findIndex(myAppSharedService.getProperty('data'), { 'name': $scope.stationName });
            if (markerIndex > -1) {
                return myAppSharedService.getProperty('data')[markerIndex];
            }
            return -1;
        }

        function populateGraph() {
            $scope.data = [];
            _.forEach(myAppSharedService.getProperty('data'), function (item) {
                var obj = {};
                obj.x = item.last_reported.getMinutes();
                obj.y = item.num_bikes_available;
                obj.r = item.num_bikes_available;
                $scope.data.push(obj);
                $scope.labels.push(item.last_reported.getMinutes());
            });
            $scope.labels = _.uniq($scope.labels);
        }

        $scope.resetMarkers = function () {
            populateGraph();
        };

        $scope.findStation = function() {
            var marker = getMarker();
            if (marker !== -1) {
                $scope.data = [];
                $scope.data.push({x: marker.last_reported.getMinutes(), y: marker.num_bikes_available, r: marker.num_bikes_available});
            } else {
                alert('Station not found');
            }
        };

        function init() {
            if (myAppSharedService.getProperty('data')) {
                $scope.labels = [];
                populateGraph();
            } else {
                $location.path('/view1');
            }
        }
        init();
    });