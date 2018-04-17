describe('dashboard.view1 module', function() {
  'use strict';

  var $controller,
      $rootScope,
      $location,
      $q,
      NgMap,
      $scope,
      view1Ctrl,
      myAppSharedService,
      $httpBackend;

  beforeEach(module('dashboard'));
  beforeEach(inject(function($injector){
    $controller = $injector.get("$controller");
    $rootScope = $injector.get("$rootScope");
    myAppSharedService = $injector.get("myAppSharedService");
    $httpBackend = $injector.get("$httpBackend");
    $scope = $rootScope.$new();
    $location = $injector.get("$location");
    $q = $injector.get("$q");
    NgMap = $injector.get("NgMap");

    view1Ctrl = $controller('View1Ctrl', {
      $scope: $scope
    });
  }));

  describe('view1 controller - test ZoomMap', function(){

    it('should test marker not found', inject(function($controller) {
      $scope.data = [{name: "test1"}, {name: "test2"}];
      spyOn(window, 'alert');
      $scope.stationName = "test3";
      spyOn(NgMap, 'getMap').and.returnValue($q.resolve());
      $scope.zoomMap();

      expect(NgMap.getMap).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Station not found');
    }));

    it('should test marker found', inject(function($controller) {
      $scope.data = [{name: "test1", lat: 1, lon: 2}, {name: "test2", lat: 2, lon: 3}];

      $scope.stationName = "test2";
      spyOn(NgMap, 'getMap').and.returnValue($q.resolve());
      $scope.zoomMap();

      expect(NgMap.getMap).toHaveBeenCalled();
    }));

  });


  describe('view1 controller - test init', function(){

    it('should check if data already loaded', inject(function($controller) {
      var data = [{name: "test1", lat: 1, lon: 2, num_bikes_available: 5, capacity: 6, last_reported: new Date()},
        {name: "test", lat: 2, lon: 3,  num_bikes_available: 5, capacity: 6, last_reported: new Date()}];
      $scope.data =[];
      myAppSharedService.setProperty('data', data);
      $scope.init();

      expect($scope.isLoading).toEqual(false);
      expect($scope.data).toEqual(data);
    }));

  });
});