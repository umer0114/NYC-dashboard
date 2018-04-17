

var $controller,
    $rootScope,
    $location,
    $q,
    NgMap,
    $scope,
    view3Ctrl,
    myAppSharedService;
describe('dashboard.view3 module', function() {
  'use strict';

  beforeEach(module('dashboard'));
  beforeEach(inject(function($injector){
    $controller = $injector.get("$controller");
    $rootScope = $injector.get("$rootScope");
    $scope = $rootScope.$new();
    $location = $injector.get("$location");
    $q = $injector.get("$q");
    NgMap = $injector.get("NgMap");
    myAppSharedService = $injector.get("myAppSharedService");

    view3Ctrl = $controller('View3Ctrl', {
      $scope: $scope
    });
  }));

  describe('view3 controller - find station', function(){

    it('should test find station - succesful', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6, last_reported: new Date()},
        {name: "test2", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6, last_reported: new Date()}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.stationName = "test2";
      spyOn(window, 'alert');
      $scope.findStation();

      expect($scope.data).toEqual([{x: new Date().getMinutes(), y: 5, r: 5}]);
    }));

    it('should test find station - unsuccesful', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6, last_reported: new Date()},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6, last_reported: new Date()}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.stationName = "test3";
      spyOn(window, 'alert');
      $scope.findStation();

      expect(window.alert).toHaveBeenCalled();
    }));

    it('should test populate graphs', inject(function($controller) {
      $scope.labels = [];
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6, last_reported: new Date()},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6, last_reported: new Date()}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.resetMarkers();

      expect($scope.data).toEqual([{x: new Date().getMinutes(), y: 5, r: 5}, {x: new Date().getMinutes(), y: 5, r: 5}]);
    }));

    it('should test init', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6, last_reported: new Date()},
            {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6, last_reported: new Date()}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.init();

      expect($scope.data).toEqual([{x: new Date().getMinutes(), y: 5, r: 5}, {x: new Date().getMinutes(), y: 5, r: 5}]);
    }));

  });
});