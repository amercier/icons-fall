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
    this.listeners = {
      start: [],
      pause: [],
      play: [],
      ended: [],
      stop: [],
      next: [],
      previous: []
    };

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
          this.next(true);
        }
        else {
          this.ended = true;
          this.stop(true);
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
    this.fireEvent('start', playlist, index);
  }

  playPause() {
    if (this.playing) {
      this.playing = false;
      this.audio.pause();
      this.fireEvent('pause');
    }
    else {
      this.playing = true;
      this.audio.play();
      this.fireEvent('play');
    }
  }

  stop(auto) {
    this.fireEvent(auto ? 'ended' : 'stop', this.playlist, this.currentIndex);
    this.audio.pause();
    this.playing = false;
    this.setTrack(0);
  }

  next(auto) {
    if (this.currentIndex < this.playlist.length - 1) {
      this.setTrack(this.currentIndex + 1);
      this.fireEvent('next', this.playlist, this.currentIndex, auto);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.setTrack(this.currentIndex - 1);
      this.fireEvent('previous', this.playlist, this.currentIndex);
    }
  }

  setProgress(progress) {
    if (this.audio.duration) {
      progress = Math.max(0, progress);
      progress = Math.min(1, progress);
      this.audio.currentTime = this.audio.duration * progress;
    }
  }

  on(event, handler) {
    this.listeners[event].push(handler);
  }

  fireEvent(event, ...data) {
    this.listeners[event].forEach(handler => handler.apply(null, data));
  }
}
