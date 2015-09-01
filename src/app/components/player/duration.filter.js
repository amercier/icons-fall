export default class DurationFilter {
  filter(duration) {
    duration = Math.round(duration);
    const seconds = duration % 60,
      minutes = (duration - seconds) / 60;
    return [
      (minutes < 10 ? '0' : '') + minutes,
      (seconds < 10 ? '0' : '') + seconds
    ].join(':');
  }
}
