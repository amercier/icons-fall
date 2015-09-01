export default class PlayerService {
  constructor($rootScope, audio) {
    'ngInject';

    this.audio = audio;
    this.current = null;
    this.currentTime = 0;
    this.playing = false;
    this.ready = false;
    this.ended = false;
    this.playlist = [];

    this.audio.addEventListener('canplay', () => {
      $rootScope.$apply(() => {
        this.ready = true;
      });
    });

    this.audio.addEventListener('timeupdate', () => {
      $rootScope.$apply(() => {
        this.currentTime = this.audio.currentTime;
      });
    });

    this.audio.addEventListener('loadedmetadata', () => {
      $rootScope.$apply(() => {
        this.duration = this.audio.duration;
      });
    });

    this.audio.addEventListener('ended', () => {
      $rootScope.$apply(() => {
        if (this.currentIndex < this.playlist.length - 1) {
          this.next();
        }
        else {
          this.ended = true;
          this.stop();
        }
      });
    });
  }

  setTrack(index) {
    this.current = this.playlist[index];
    this.currentIndex = index;
    this.audio.src = this.playlist[index].sources[0].src;
    if (this.playing) {
      this.audio.play();
    }
    this.ended = false;
  }

  start(playlist, index = 0) {
    if (this.playing) {
      this.stop();
    }

    this.playlist = playlist;
    this.playing = true;
    this.setTrack(index);
  }

  playPause() {
    if (this.playing) {
      this.playing = false;
      this.audio.pause();
    }
    else {
      this.playing = true;
      this.audio.play();
    }
  }

  stop() {
    if (!this.ended) {
      this.audio.pause();
      this.playing = false;
      this.setTrack(0);
    }
  }

  next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.setTrack(this.currentIndex + 1);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.setTrack(this.currentIndex - 1);
    }
  }

  setProgress(progress) {
    if (this.audio.duration) {
      progress = Math.max(0, progress);
      progress = Math.min(1, progress);
      this.audio.currentTime = this.audio.duration * progress;
    }
  }

}
