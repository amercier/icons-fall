class MainController {
  constructor ($timeout) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1438759053195;

    this.activate($timeout);
  }

  activate($timeout) {
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }
}

export default MainController;
