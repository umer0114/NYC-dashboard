describe('dashboard.view1 module', function() {
  'use strict';


  beforeEach(module('dashboard'));

  describe('view1 controller', function(){

    it('should test zoomMap', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});