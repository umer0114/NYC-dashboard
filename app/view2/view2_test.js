

  var $controller,
      $rootScope,
      $location,
      $q,
      NgMap,
      $scope,
      view2Ctrl,
      myAppSharedService;
describe('dashboard.view2 module', function() {
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

    view2Ctrl = $controller('View2Ctrl', {
      $scope: $scope
    });
  }));

  describe('view2 controller - find station', function(){

    it('should test find station - succesful', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6},
        {name: "test2", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.stationName = "test2";
      spyOn(window, 'alert');
      $scope.findStation();

      expect($scope.data).toEqual([{x: 6, y: 5, r: 5}]);
    }));

    it('should test find station - unsuccesful', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.stationName = "test3";
      spyOn(window, 'alert');
      $scope.findStation();

      expect(window.alert).toHaveBeenCalled();
    }));

    it('should test populate graphs', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.resetMarkers();

      expect($scope.data).toEqual([{x: 6, y: 5, r: 5}, {x: 6, y: 5, r: 5}]);
    }));

    it('should test init', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6}],
          options = {
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
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.init();

      expect($scope.data).toEqual([{x: 6, y: 5, r: 5}, {x: 6, y: 5, r: 5}]);
      expect($scope.options).toEqual(options);
    }));

  });
});