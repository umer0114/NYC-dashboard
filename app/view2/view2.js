angular.module('dashboard')
    .controller('View2Ctrl', function ($scope, myAppSharedService, $location) {
        'use strict';
        function populateGraph() {
            $scope.data = [];

            _.forEach(myAppSharedService.getProperty('data'), function (item) {
                var obj = {};
                obj.x = item.capacity;
                obj.y = item.num_bikes_available;
                obj.r = item.num_bikes_available;
                $scope.data.push(obj);
            });
        }

        function getMarker() {
            var markerIndex =_.findIndex(myAppSharedService.getProperty('data'), { 'name': $scope.stationName });
            if (markerIndex > -1) {
                return myAppSharedService.getProperty('data')[markerIndex];
            }
            return -1;
        }

      $scope.findStation = function() {
            var marker = getMarker();
            if (marker !== -1) {
                $scope.data = [];
                $scope.data.push({x: marker.capacity, y: marker.num_bikes_available, r: marker.num_bikes_available});
            } else {
                alert('Station not found');
            }
        };

        $scope.resetMarkers = function () {
            populateGraph();
        };
        $scope.init = function() {
            if (myAppSharedService.getProperty('data')) {
                $scope.options = {
                    scales: {
                        yAxes: [{
                            scaleLabel:  {
                                display: true,
                                labelString: 'Total capacity'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Total bike availability'
                            }
                        }]
                    }
                };
                populateGraph();
            } else {
                $location.path('/view1');
            }
        }
        $scope.init();
    });