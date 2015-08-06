(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('iconsfall'));

    it('should define more than 5 awesome things', inject(function($controller) {
      var vm = $controller('HomeController');

      expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
    }));
  });
})();
