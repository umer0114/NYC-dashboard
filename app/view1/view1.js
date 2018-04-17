angular.module('dashboard')
    .controller('View1Ctrl', function ($http, $scope, $q, NgMap, myAppSharedService) {
        'use strict';
        function getStationInformation() {
            var defer = $q.defer();
            $http.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(function (response) {
                defer.resolve(_.get(response, 'data.data.stations'));
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getStationStatus() {
            var defer = $q.defer();
            $http.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then(function (response) {
                defer.resolve(_.get(response, 'data.data.stations'));
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function customizer(objValue, sourceValue) {
            if (sourceValue.num_bikes_available === 0) {
                sourceValue.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
            } else if ((sourceValue.num_bikes_available / objValue.capacity) < 0.5) {
                sourceValue.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFA500';
            } else if ((sourceValue.num_bikes_available / objValue.capacity) > 0.75) {
                sourceValue.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|008000';
            }
            sourceValue.last_reported = new Date(sourceValue.last_reported * 1000);
            return _.extend(objValue, sourceValue);
        }
        $scope.init = function() {
            if (!myAppSharedService.getProperty('data')) {
                $scope.isLoading = true;
                $q.all([getStationInformation(), getStationStatus()]).then(function (response) {
                    $scope.data = _.mergeWith(response[0], response[1], customizer);
                    myAppSharedService.setProperty('data', $scope.data);
                    $scope.isLoading = false;
                }).catch(function (response) {
                    $scope.error = response;
                    $scope.isLoading = false;
                });
            } else {
                $scope.isLoading = false;
                $scope.data = myAppSharedService.getProperty('data');
            }
        };

        function getMarker() {
            var markerIndex =_.findIndex($scope.data, { 'name': $scope.stationName });
            if (markerIndex > -1) {
                return $scope.data[markerIndex];
            }
            return -1;

        }

        $scope.zoomMap = function () {
            var marker = getMarker(), centerPoint, currentMarker;
            if (marker !== -1) {
                centerPoint = {"lat": marker.lat, "lon": marker.lon};
                NgMap.getMap().then(function (map) {
                    map.setCenter(new google.maps.LatLng(centerPoint.lat, centerPoint.lon));
                    if ($scope.circle) {
                        $scope.circle.setMap(null);
                    }
                    $scope.circle = new google.maps.Circle({
                        map: map,
                        radius: 0
                    });
                    $scope.circle.setRadius($scope.radius * 1000);

                    currentMarker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(centerPoint.lat, centerPoint.lon)
                    });
                    $scope.circle.bindTo('center', currentMarker, 'position');
                    map.fitBounds($scope.circle.getBounds());
                    map.setZoom(Math.round(14 - Math.log($scope.radius * 0.62) / Math.LN2));
                });
            } else {
                alert('Station not found');
            }


        };
        $scope.init();
    });