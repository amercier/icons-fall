export default class PlayerService {
  constructor(audio, $rootScope) {
    'ngInject';

    this.audio = audio.element;
    this.playing = false;
    this.current = null;
    this.ready = false;

    this.audio.addEventListener('canplay', function() {
      $rootScope.$apply(function() {
        this.ready = true;
      }.bind(this));
    }.bind(this));

    this.audio.addEventListener('timeupdate', function() {
      $rootScope.$apply(function() {
        this.progress = this.currentTime();
      }.bind(this));
    }.bind(this));

    this.audio.addEventListener('ended', function() {
      $rootScope.$apply(this.stop());
    }.bind(this));
  }

  play(track) {
    console.log('play', track);

    // If we are playing, stop the current playback
    if (this.playing) {
      this.stop();
    }
    var url = track.sources[0].$text; // from the npr API
    this.current = track; // Store the current track
    this.audio.src = url;
    this.audio.play(); // Start playback of the url
    this.playing = true;
  }

  stop() {
    if (this.playing) {
      this.audio.pause(); // stop playback
      // Clear the state of the player
      this.ready = this.playing = false;
      this.current = null;
    }
  }

  currentTime() {
    return this.audio.currentTime;
  }

  currentDuration() {
    return this.audio.duration;
  }
}
