export default class MetaService {
  constructor() {
    'ngInject';

    this.pageTitle = null;
    this.appTitle = document.title;
    this.separator = ' - ';
    this.metas = [];
  }

  setPageTitle(pageTitle) {
    this.pageTitle = pageTitle;
  }

  getTitle() {
    return this.pageTitle ?
      [this.pageTitle, this.separator, this.appTitle].join('') :
      this.appTitle;
  }
}
