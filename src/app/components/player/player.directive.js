export default class PlayerDirective {
  constructor() {
    'ngInject';

    return {
      restrict: 'EA',
      require: ['^ngModel'],
      replace: true,
      scope: {
        ngModel: '=',
        player: '='
      },
      templateUrl: 'app/components/player/player.html',
      link: function() {
      }
    };
  }
}
