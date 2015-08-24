export default class AudioService {
  constructor($document) {
    'ngInject';

    this.element = $document[0].createElement('audio');
  }
}
