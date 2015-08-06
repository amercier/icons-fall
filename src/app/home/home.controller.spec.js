(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('iconsfall'));

    it('should define more than 5 awesome things', inject(function($controller) {
      var controller = $controller('HomeController');
      expect(controller).toBeTruthy();
    }));
  });
})();
