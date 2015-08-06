class MainController {
  constructor ($timeout) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1440210598828;

    this.activate($timeout);
  }

  activate($timeout) {
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }
}

export default MainController;
