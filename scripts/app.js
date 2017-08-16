/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(2);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(3);

	var _index6 = _interopRequireDefault(_index5);

	var _meta = __webpack_require__(4);

	var _meta2 = _interopRequireDefault(_meta);

	var _home = __webpack_require__(5);

	var _home2 = _interopRequireDefault(_home);

	var _about = __webpack_require__(6);

	var _about2 = _interopRequireDefault(_about);

	var _discography = __webpack_require__(7);

	var _discography2 = _interopRequireDefault(_discography);

	var _music = __webpack_require__(8);

	var _music2 = _interopRequireDefault(_music);

	var _calendar = __webpack_require__(9);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _navbar = __webpack_require__(10);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _audio = __webpack_require__(11);

	var _audio2 = _interopRequireDefault(_audio);

	var _player = __webpack_require__(12);

	var _player2 = _interopRequireDefault(_player);

	var _duration = __webpack_require__(13);

	var _duration2 = _interopRequireDefault(_duration);

	var _player3 = __webpack_require__(14);

	var _player4 = _interopRequireDefault(_player3);

	var _player5 = __webpack_require__(15);

	var _player6 = _interopRequireDefault(_player5);

	var _player7 = __webpack_require__(16);

	var _player8 = _interopRequireDefault(_player7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('iconsfall', ['ngAnimate', 'ngResource', 'ngRoute', 'ngMedia', 'mm.foundation', 'rt.encodeuri', 'angular-timeline', 'duScroll']).config(_index2.default).config(_index4.default).factory('meta', function () {
	  return new _meta2.default();
	}).run(_index6.default).controller('HomeController', _home2.default).controller('AboutController', _about2.default).factory('discography', function ($sce) {
	  return new _discography2.default($sce);
	}).controller('MusicController', _music2.default).controller('CalendarController', _calendar2.default).directive('iconsfallNavbar', function () {
	  return new _navbar2.default();
	}).factory('audio', function ($document) {
	  return new _audio2.default($document).element;
	}).factory('player', function ($rootScope, audio) {
	  return new _player2.default($rootScope, audio);
	}).filter('formatDuration', function () {
	  return new _duration2.default().filter;
	}).controller('PlayerController', function ($scope, discography, player) {
	  return new _player4.default($scope, discography, player);
	}).directive('iconsfallPlayer', function () {
	  return new _player6.default();
	}).run(_player8.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function config($logProvider, $locationProvider) {
	  'ngInject';

	  // Enable log

	  $logProvider.debugEnabled(true);

	  // Enable HTML5 pushState
	  $locationProvider.html5Mode(true);
	}

	exports.default = config;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = routerConfig;
	function routerConfig($routeProvider) {
	  'ngInject';

	  $routeProvider.when('/', {
	    id: 'home',
	    templateUrl: 'app/home/home.html',
	    controller: 'HomeController',
	    controllerAs: 'home'
	  }).when('/music', {
	    id: 'music',
	    templateUrl: 'app/music/music.html',
	    controller: 'MusicController',
	    controllerAs: 'music'
	  }).when('/about', {
	    id: 'about',
	    templateUrl: 'app/about/about.html',
	    controller: 'AboutController',
	    controllerAs: 'about'
	  }).when('/calendar', {
	    id: 'calendar',
	    templateUrl: 'app/calendar/calendar.html',
	    controller: 'CalendarController',
	    controllerAs: 'calendar'
	  }).otherwise({
	    redirectTo: '/'
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = runBlock;
	function runBlock($rootScope, $location, $timeout, meta) {
	  'ngInject';

	  // Track view on Google Analytics

	  var changeStartTime;
	  $rootScope.$on('$routeChangeStart', function () {
	    changeStartTime = Date.now();

	    // TODO: do it the angular way
	    var path = $location.path();
	    angular.element(document.documentElement).attr('data-location', path);
	  });

	  $rootScope.$on('$routeChangeSuccess', function () {
	    var path = $location.path();
	    ga('send', 'pageview', { page: path });
	    gat('Views', 'ChangeSuccess', changeStartTime, path);
	  });

	  // Update title after route change
	  $rootScope.$on('$routeChangeSuccess', function () {
	    $timeout(function () {
	      document.title = meta.getTitle();
	    });
	  });

	  $rootScope.onBuy = function (album) {
	    gae('Sales', 'Buy album', album);
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MetaService = function () {
	  function MetaService() {
	    'ngInject';

	    _classCallCheck(this, MetaService);

	    this.pageTitle = null;
	    this.appTitle = document.title;
	    this.separator = ' - ';
	    this.metas = [];
	  }

	  _createClass(MetaService, [{
	    key: 'setPageTitle',
	    value: function setPageTitle(pageTitle) {
	      this.pageTitle = pageTitle;
	    }
	  }, {
	    key: 'getTitle',
	    value: function getTitle() {
	      return this.pageTitle ? [this.pageTitle, this.separator, this.appTitle].join('') : this.appTitle;
	    }
	  }]);

	  return MetaService;
	}();

	exports.default = MetaService;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeController = function HomeController(meta) {
	  'ngInject';

	  _classCallCheck(this, HomeController);

	  meta.setPageTitle();
	};

	exports.default = HomeController;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AboutController = function AboutController(meta) {
	  'ngInject';

	  _classCallCheck(this, AboutController);

	  meta.setPageTitle('Bio');
	};

	exports.default = AboutController;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DiscographyService = function () {
	  function DiscographyService($sce) {
	    'ngInject';

	    _classCallCheck(this, DiscographyService);

	    this.albums = [{
	      title: 'White Line',
	      type: 'EP',
	      cover: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/cover.jpg'),
	      tracks: [{
	        track: '01',
	        title: 'Golden Tree',
	        sources: [{ src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'), type: 'audio/ogg; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm'), type: 'audio/webm; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.m4a'), type: 'audio/mp4' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'), type: 'audio/mp3' }]
	      }, {
	        track: '02',
	        title: 'Season Passed',
	        sources: [{ src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.ogg'), type: 'audio/ogg; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.webm'), type: 'audio/webm; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.m4a'), type: 'audio/mp4' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.mp3'), type: 'audio/mp3' }]
	      }, {
	        track: '03',
	        title: 'Paths',
	        sources: [{ src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.ogg'), type: 'audio/ogg; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.webm'), type: 'audio/webm; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.m4a'), type: 'audio/mp4' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.mp3'), type: 'audio/mp3' }]
	      }, {
	        track: '04',
	        title: 'White Line',
	        sources: [{ src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.ogg'), type: 'audio/ogg; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.webm'), type: 'audio/webm; codecs="vorbis"' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.m4a'), type: 'audio/mp4' }, { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.mp3'), type: 'audio/mp3' }]
	      }]
	    }];
	  }

	  _createClass(DiscographyService, [{
	    key: 'playlist',
	    value: function playlist(album) {
	      return album.tracks.map(function (track) {
	        return {
	          track: track.track,
	          title: track.title,
	          sources: track.sources,
	          album: album,
	          toString: function toString() {
	            return [album.title, track.title].join(' / ');
	          }
	        };
	      });
	    }
	  }]);

	  return DiscographyService;
	}();

	exports.default = DiscographyService;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MusicController = function MusicController(meta, $sce, $scope, discography, player) {
	  'ngInject';

	  _classCallCheck(this, MusicController);

	  meta.setPageTitle('Musique');

	  $scope.play = function (album, index) {
	    player.start(discography.playlist(album), index);
	  };

	  $scope.audios = function () {
	    return angular.element(document.querySelectorAll('audio'));
	  };

	  $scope.albums = discography.albums;
	};

	exports.default = MusicController;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* globals location: false, console: false */
	var CalendarController = function CalendarController(meta, $scope, $q, $http, $document) {
	  'ngInject';

	  _classCallCheck(this, CalendarController);

	  meta.setPageTitle('Agenda');

	  var environment = {
	    'iconsfall.com': 'production',
	    'staging.iconsfall.com': 'staging'
	  }[location.host] || 'development',
	      now = new Date(),
	      today = new Date(),
	      apiKey = {
	    development: 'AIzaSyArUI5x5gVBaJveN2e-LSHrjb3cNqZdxtE',
	    staging: 'AIzaSyDkLZm2YY4DOXgHBXAEYcx9xeb1LDuuQo0',
	    production: 'AIzaSyBKWXYfrcvF6-24FMJqI0OCCDA4LrQB1yY'
	  }[environment],
	      calendars = {
	    development: {
	      'l8b30g066blbal91sc0lnothp8@group.calendar.google.com': 'concert',
	      'qqj7m66f1320ieih44plda7hl0@group.calendar.google.com': 'recording',
	      'naauslsv7q1k5rc57ltr7bkgac@group.calendar.google.com': 'residence'
	    },
	    staging: {
	      'l8b30g066blbal91sc0lnothp8@group.calendar.google.com': 'concert',
	      'qqj7m66f1320ieih44plda7hl0@group.calendar.google.com': 'recording',
	      'naauslsv7q1k5rc57ltr7bkgac@group.calendar.google.com': 'residence'
	    },
	    production: {
	      'uhh2f7e4311su1hkal0vbv4ag0@group.calendar.google.com': 'concert',
	      '0rtnac07pej1tp8hsdh4n4deq0@group.calendar.google.com': 'recording',
	      'psj8q1be7fun4mdfkggg49n5e0@group.calendar.google.com': 'residence'
	    }
	  }[environment];
	  today.setHours(0, 0, 0, 0);

	  $scope.events = [];

	  $scope.scrollToNextEvent = function () {
	    var next = document.querySelector('[data-next]'),
	        body = angular.element(document.body);
	    if (next && !body.hasClass('scrolled')) {
	      $document.scrollToElementAnimated(next, 100, 1000, function (t) {
	        return t * (2 - t);
	      });
	      body.addClass('scrolled');
	    }
	  };

	  $scope.trackEvent = function (action, label) {
	    ga('send', 'event', 'Calendar', action, label);
	  };

	  $scope.trackEventURI = function (event) {
	    this.trackEvent('Click ' + event.type, event.summary);
	  };

	  $scope.trackEventMap = function (event) {
	    this.trackEvent('Map ' + event.type, event.summary);
	  };

	  $scope.trackEventDirections = function (event) {
	    this.trackEvent('Directions ' + event.type, event.summary);
	  };

	  $q.all(Object.keys(calendars).map(function (calendarId) {
	    return $http.get('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events', {
	      params: {
	        key: apiKey
	      }
	    });
	  })).then(function (data) {
	    var nextEvent;
	    $scope.events = [].concat.apply([], data.map(function (calendar) {
	      return calendar.data.items.map(function (item) {
	        item.type = calendars[item.organizer.email];
	        item.locationURI = item.location ? 'http://maps.google.com/?q=' + encodeURI(item.location) : undefined;
	        item.directionURI = item.location ? 'https://www.google.com/maps/dir/current+location/' + encodeURI(item.location) : '#';

	        if (item.description) {
	          var matches = new RegExp('(http://[^ ]+)').exec(item.description.trim());
	          if (matches) {
	            item.eventURI = matches[0];
	          }
	        }

	        if (item.start.dateTime && item.end.dateTime) {
	          var start = new Date(item.start.dateTime);
	          var end = new Date(item.end.dateTime);
	          item.manyDays = end - start > 24 * 3600 * 1000;
	          item.date = start;
	          item.done = end.getTime() < now.getTime();
	        } else if (item.start.date && item.end.date) {
	          var d = item.start.date.split('-');
	          item.manyDays = item.start.date !== item.end.date;
	          item.date = new Date(d[0], d[1], d[2]);
	          item.done = item.date.getTime() < today.getTime();
	        } else {
	          item.date = new Date();
	          item.done = false;
	        }

	        return item;
	      });
	    })).sort(function (a, b) {
	      return a.date.getTime() - b.date.getTime();
	    }).map(function (event) {
	      if (!event.done && !nextEvent) {
	        event.next = true;
	      }
	      return event;
	    });
	  }, function (error) {
	    console.error('ERROR', error);
	  });
	};

	exports.default = CalendarController;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavbarDirective = function NavbarDirective() {
	  'ngInject';

	  _classCallCheck(this, NavbarDirective);

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/components/navbar/navbar.html',
	    scope: {},
	    controller: NavbarController,
	    controllerAs: 'nav',
	    bindToController: true
	  };

	  return directive;
	};

	exports.default = NavbarDirective;

	var NavbarController = function NavbarController($scope, $rootScope, $route) {
	  'ngInject';

	  _classCallCheck(this, NavbarController);

	  $rootScope.$on('$routeChangeSuccess', function () {
	    $scope.current = {};
	    if ($route.current) {
	      $scope.current[$route.current.$$route.id] = true;
	    }
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AudioService = function AudioService($document) {
	  'ngInject';

	  _classCallCheck(this, AudioService);

	  this.element = $document[0].createElement('audio');
	};

	exports.default = AudioService;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlayerService = function () {
	  function PlayerService($rootScope, audio) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, PlayerService);

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

	    this.audio.addEventListener('canplay', function () {
	      $rootScope.$apply(function () {
	        _this.ready = true;
	      });
	    });

	    this.audio.addEventListener('timeupdate', function () {
	      $rootScope.$apply(function () {
	        _this.currentTime = _this.audio.currentTime;
	      });
	    });

	    this.audio.addEventListener('loadedmetadata', function () {
	      $rootScope.$apply(function () {
	        _this.duration = _this.audio.duration;
	      });
	    });

	    this.audio.addEventListener('ended', function () {
	      $rootScope.$apply(function () {
	        if (_this.currentIndex < _this.playlist.length - 1) {
	          _this.next(true);
	        } else {
	          _this.ended = true;
	          _this.stop(true);
	        }
	      });
	    });
	  }

	  _createClass(PlayerService, [{
	    key: 'setTrack',
	    value: function setTrack(index) {
	      var _this2 = this;

	      this.current = this.playlist[index];
	      this.currentIndex = index;

	      // Append <source> elements
	      this.audio.setAttribute('src', null);
	      angular.element(this.audio).find('source').remove();
	      this.playlist[index].sources.forEach(function (source) {
	        var sourceElement = document.createElement('source');
	        sourceElement.src = source.src;
	        sourceElement.type = source.type;
	        _this2.audio.appendChild(sourceElement);
	      });
	      this.audio.removeAttribute('src');

	      if (this.playing) {
	        this.audio.play();
	      }
	      this.ended = false;
	    }
	  }, {
	    key: 'start',
	    value: function start(playlist) {
	      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      if (this.playing) {
	        this.stop();
	      }

	      this.playlist = playlist;
	      this.playing = true;
	      this.setTrack(index);
	      this.fireEvent('start', playlist, index);
	    }
	  }, {
	    key: 'playPause',
	    value: function playPause() {
	      if (this.playing) {
	        this.playing = false;
	        this.audio.pause();
	        this.fireEvent('pause');
	      } else {
	        this.playing = true;
	        this.audio.play();
	        this.fireEvent('play');
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop(auto) {
	      this.fireEvent(auto ? 'ended' : 'stop', this.playlist, this.currentIndex);
	      this.audio.pause();
	      this.playing = false;
	      this.setTrack(0);
	    }
	  }, {
	    key: 'next',
	    value: function next(auto) {
	      if (this.currentIndex < this.playlist.length - 1) {
	        this.setTrack(this.currentIndex + 1);
	        this.fireEvent('next', this.playlist, this.currentIndex, auto);
	      }
	    }
	  }, {
	    key: 'previous',
	    value: function previous() {
	      if (this.currentIndex > 0) {
	        this.setTrack(this.currentIndex - 1);
	        this.fireEvent('previous', this.playlist, this.currentIndex);
	      }
	    }
	  }, {
	    key: 'setProgress',
	    value: function setProgress(progress) {
	      if (this.audio.duration) {
	        progress = Math.max(0, progress);
	        progress = Math.min(1, progress);
	        this.audio.currentTime = this.audio.duration * progress;
	      }
	    }
	  }, {
	    key: 'on',
	    value: function on(event, handler) {
	      this.listeners[event].push(handler);
	    }
	  }, {
	    key: 'fireEvent',
	    value: function fireEvent(event) {
	      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }

	      this.listeners[event].forEach(function (handler) {
	        return handler.apply(null, data);
	      });
	    }
	  }]);

	  return PlayerService;
	}();

	exports.default = PlayerService;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DurationFilter = function () {
	  function DurationFilter() {
	    _classCallCheck(this, DurationFilter);
	  }

	  _createClass(DurationFilter, [{
	    key: 'filter',
	    value: function filter(duration) {
	      duration = Math.round(duration);
	      var seconds = duration % 60,
	          minutes = (duration - seconds) / 60;
	      return [(minutes < 10 ? '0' : '') + minutes, (seconds < 10 ? '0' : '') + seconds].join(':');
	    }
	  }]);

	  return DurationFilter;
	}();

	exports.default = DurationFilter;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlayerController = function PlayerController($scope, discography, player) {
	  'ngInject';

	  _classCallCheck(this, PlayerController);

	  $scope.player = player;
	  $scope.albums = discography.albums;
	};

	exports.default = PlayerController;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlayerDirective = function PlayerDirective() {
	  'ngInject';

	  _classCallCheck(this, PlayerDirective);

	  return {
	    restrict: 'EA',
	    templateUrl: 'app/components/player/player.html',
	    scope: {
	      ngModel: '='
	    },
	    require: ['^ngModel'],
	    link: function link(scope) {
	      return new PlayerDirectiveController(scope);
	    }
	  };
	};

	exports.default = PlayerDirective;

	var PlayerDirectiveController = function PlayerDirectiveController(scope) {
	  'ngInject';

	  _classCallCheck(this, PlayerDirectiveController);

	  scope.$watchCollection('ngModel', function (ngModel) {
	    scope.started = !!ngModel.current;
	    scope.track = ngModel.current;
	    scope.duration = ngModel.duration;
	    scope.currentTime = ngModel.currentTime;
	    scope.currentTimePercent = 100 * ngModel.currentTime / ngModel.duration;
	    scope.playing = ngModel.playing;
	    scope.ended = ngModel.ended;
	    scope.ready = ngModel.ready;
	  });

	  scope.playPause = function () {
	    scope.ngModel.playPause();
	  };

	  scope.replay = function () {
	    scope.ngModel.playing = true;
	    scope.ngModel.setTrack(0);
	  };

	  scope.next = function () {
	    scope.ngModel.next();
	  };

	  scope.previous = function () {
	    scope.ngModel.previous();
	  };

	  scope.hasPrevious = function () {
	    return scope.ngModel.playlist.length > 1 && scope.ngModel.currentIndex > 0;
	  };

	  scope.hasNext = function () {
	    return scope.ngModel.playlist.length > 1 && scope.ngModel.currentIndex < scope.ngModel.playlist.length - 1;
	  };

	  scope.onProgressClick = function ($event) {
	    scope.ngModel.setProgress($event.clientX / $event.currentTarget.clientWidth);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = playerAnalytics;
	function playerAnalytics(player) {
	  'ngInject';

	  player.on('start', function (playlist, index) {
	    gae('Music', 'Start', playlist[index].toString());
	  });

	  player.on('next', function (playlist, index, auto) {
	    if (auto) {
	      gae('Music', 'Track Completed', playlist[index - 1].toString());
	    } else {
	      gae('Music', 'Switch From', playlist[index - 1].toString());
	      gae('Music', 'Switch To', playlist[index].toString());
	    }
	  });

	  player.on('previous', function (playlist, index) {
	    gae('Music', 'Switch From', playlist[index + 1].toString());
	    gae('Music', 'Switch To', playlist[index].toString());
	  });

	  player.on('ended', function (playlist, index) {
	    gae('Music', 'Album Completed', playlist[index].album.title);
	  });
	}

/***/ }
/******/ ]);
angular.module('iconsfall').run(['$templateCache', function($templateCache) {$templateCache.put('app/about/about.html','<section class="if-about"><div class="row"><h1 class="if-title small-12 columns text-center"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#about"></use></svg>Bio</h1><figure class="if-about-members small-12 medium-10 medium-offset-1 large-8 large-offset-2 columns"><img src="/assets/images/iconsfall-members.jpg" alt="Icon\'s Fall members" width="720" height="303"></figure><p class="if-about-biography medium-10 medium-offset-1 large-8 large-offset-2 columns end">Icon\u2019s fall est un groupe de musique actuelle. Ses compositions originales m\xEAlent influences rock (Radiohead, Grizzly Bear, Sigur R\xF3s) aux exp\xE9rimentations electronica (Bjork, Air, Atoms For Peace). Cette union a pour base le d\xE9veloppement d\u2019un son singulier entre d\xE9licatesse, profondeur \xE9lectronique et d\xE9senchantement \xE9lectrique incisif. Soutenu par un groove enivrant, sublim\xE9 par la voix envoutante de sa chanteuse Ezaka, Icon\'s Fall nous invite \xE0 l\xE2cher prise, \xE0 l\u2019\xE9vasion. \xC0 l\u2019image de la musique, les textes serpentent entre les \xE9motions et les couleurs. Tourment\xE9, m\xE9lancolique, mais aussi anim\xE9 de passion et d\u2019espoir, Icon\'s Fall invite ses auditeurs \xE0 se plonger dans une odyss\xE9e sonore.</p></div><div class="row"><p class="if-about-contact text-center" itemprop="contactPoint">Contact: <a class="if-anchor" href="mailto:max@iconsfall.com" itemprop="email">max@iconsfall.com</a> \u2014 <a class="if-anchor" href="tel:+33648125209" itemprop="telephone">06 48 12 52 09</a></p><nav class="small-12 medium-10 medium-offset-1 large-8 large-offset-2 columns end"><ul class="row no-bullet"><li class="medium-12 columns"><a class="if-button" href="http://files.iconsfall.com/Icon\'s%20Fall%20-%20Dossier%20de%20Presse.pdf" title="Dossier de Presse Icon\'s Fall" target="_blank"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#about"></use></svg><span class="if-medium">Dossier de Presse</span></a></li></ul></nav></div></section>');
$templateCache.put('app/calendar/calendar.html','<section class="if-calendar row"><h1 class="if-title small-12 columns text-center"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#calendar"></use></svg>Agenda</h1><div class="small-12 columns"><timeline><timeline-event ng-repeat="event in events" side="{{[\'left\', \'right\'][$index % 2]}}" itemprop="event" itemscope="" itemtype="http://schema.org/Event" ng-attr-data-next="{{event.next || undefined}}" ng-attr-data-done="{{event.done || undefined}}"><timeline-badge class="{{event.type}}"><a class="if-anchor" ng-class="{ inverted: event.next }" ng-href="{{event.eventURI}}" target="_blank" rel="nofollow" title="{{event.summary}}" ng-click="$parent.trackEventURI(event)"><i class="fa fa-microphone" ng-if="event.type == \'recording\'"></i> <i class="fa fa-bolt" ng-if="event.type == \'concert\'"></i> <i class="fa fa-home" ng-if="event.type == \'residence\'"></i></a></timeline-badge><timeline-panel><timeline-heading><a class="if-timeline-title if-button" title="{{event.summary}}" ng-href="{{event.eventURI}}" target="_blank" rel="nofollow" ng-click="trackEventURI(event)">{{event.summary}}</a></timeline-heading><div class="if-calendar-time row"><div ng-class="{ true: \'small-8 columns\', false: \'small-12 columns\' }[!!event.done]"><span ng-if="event.manyDays &amp;&amp; event.start.dateTime" itemprop="startDate" content="{{event.start.dateTime}}">Du {{event.start.dateTime | date:shortDate }} au {{event.end.dateTime | date:shortDate }}</span> <span ng-if="event.manyDays &amp;&amp; event.start.date" itemprop="startDate" content="{{event.start.date}}">Du {{event.start.date | date:shortDate }} au {{event.end.date | date:shortDate }}</span> <span ng-if="!event.manyDays &amp;&amp; event.start.dateTime" itemprop="startDate" content="{{event.start.dateTime}}">{{event.start.dateTime | date:shortDate }} <span ng-if="event.end.dateTime">de {{event.start.dateTime | date:\'H:mm\'}} \xE0 {{event.end.dateTime | date:\'H:mm\'}}</span> <span ng-if="!event.end.dateTime">\xE0 partir de {{event.start.dateTime | date:\'H:mm\'}}</span></span> <span ng-if="!event.manyDays &amp;&amp; event.start.date" itemprop="startDate" content="{{event.start.date}}">{{event.start.date | date:shortDate}}</span></div><div class="small-4 columns" ng-if="event.done"><span class="if-calendar-done right"><i class="fa fa-check"></i> Termin\xE9</span></div></div><div class="if-calendar-location row" itemprop="location" itemscope="" itemtype="http://schema.org/MusicVenue"><meta itemprop="address" content="{{event.location}}"><div class="small-12 medium-6 columns text-center"><a title="Carte de {{event.summary}}" class="if-button" ng-href="{{event.locationURI}}" target="_blank" rel="nofollow" ng-click="trackEventMap(event)"><i class="fa fa-map-marker"></i> Carte</a></div><div class="small-12 medium-6 columns text-center"><a title="Directions vers {{event.summary}}" class="if-button" ng-href="{{event.directionURI}} || undefined" target="_blank" rel="nofollow" ng-click="trackEventDirections(event)"><i class="fa fa-random fa-rotate-270"></i> Directions</a></div><div></div></div></timeline-panel></timeline-event></timeline></div></section>{{scrollToNextEvent()}}');
$templateCache.put('app/home/home.html','<section class="home"><div class="row"><div class="if-logo small-10 small-offset-1 columns text-center"><figure item-prop="logo"><img src="/assets/images/iconsfall-logo.svg" width="300" height="300"></figure></div></div><div class="row"><div class="small-10 small-offset-1 columns"><ul class="no-bullet row text-center"><li class="small-12 medium-4 columns"><a class="if-button" ng-href="/about"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#about"></use></svg><span class="if-small">Bio</span></a></li><li class="small-12 medium-4 columns"><a class="if-button" ng-href="/music"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#music"></use></svg><span class="if-small">Musique</span></a></li><li class="small-12 medium-4 columns"><a class="if-button" ng-href="/calendar"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#calendar"></use></svg><span class="if-small">Agenda</span></a></li></ul></div></div></section>');
$templateCache.put('app/music/music.html','<section class="if-music row"><h1 class="if-title small-12 columns text-center"><svg viewbox="0 0 200 200" class="if-icon"><use xlink:href="#music"></use></svg>Musique</h1><meta content="Electronica" itemprop="genre"><div ng-repeat="album in albums" itemprop="album" itemscope="" itemtype="http://schema.org/MusicAlbum"><meta content="{{album.tracks.length}}" itemprop="numTracks"><meta content="Icon\'s Fall" itemprop="byArtist"><h2 class="small-12 columns" itemprop="name">{{album.title}}</h2><figure class="if-music-album-cover no-bullet small-12 medium-6 columns"><img ng-src="{{album.cover}}" alt="Couverture de l\'album {{album.title}}" width="500" height="500" itemprop="image"></figure><ul class="no-bullet small-12 medium-offset-1 medium-5 columns"><li class="if-music-track clearfix" ng-repeat="track in album.tracks" itemprop="track" itemscope="" itemtype="http://schema.org/MusicRecording"><button class="if-button inverted left" ng-click="play(album, $index)"><i class="fa fa-play"></i></button><h5 class="if-music-track-title"><span itemprop="name">{{track.title}}</span></h5></li></ul></div></section>');
$templateCache.put('app/components/navbar/navbar.html','<div class="navbar contain-to-grid fixed"><top-bar scrolltop="" role="navigation"><ul class="title-area"><li class="name"><h1><a ng-href="/" rel="up"><svg viewbox="0 0 200 200" class="if-icon" role="img" title="Icon\'s Fall logo"><use xlink:href="#iconsfall-logo"></use></svg>Icon\'s Fall</a></h1></li><li toggle-top-bar="" class="menu-icon"><a><span></span></a></li></ul><top-bar-section><ul class="right"><li ng-class="{ active: current.music }"><a title="Musique" ng-href="/music"><svg viewbox="0 0 200 200" class="if-icon" role="decoration"><use xlink:href="#music"></use></svg>Musique</a></li><li ng-class="{ active: current.about }"><a title="Bio" ng-href="/about"><svg viewbox="0 0 200 200" class="if-icon" role="decoration"><use xlink:href="#about"></use></svg>Bio</a></li><li ng-class="{ active: current.calendar }"><a title="Agenda" ng-href="/calendar"><svg viewbox="0 0 200 200" class="if-icon" role="decoration"><use xlink:href="#calendar"></use></svg>Agenda</a></li><li><a title="Page Facebook d\'Icon\'s Fall" href="https://www.facebook.com/iconsfall" target="_blank" rel="nofollow"><svg viewbox="0 0 200 200" class="if-icon" role="decoration"><use xlink:href="#facebook"></use></svg>Facebook</a></li></ul></top-bar-section></top-bar></div><svg version="1.1" class="assets" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="205.654px" height="200.386px" viewbox="0 0 205.654 200.386" enable-background="new 0 0 205.654 200.386" xml:space="preserve"><g id="calendar"><path d="M99.314,200.386C69,167.824,38.718,135.298,8.38,102.712c2.229-2.583,4.447-5.153,6.699-7.759 c32.736,30.194,65.414,60.335,98.129,90.507C108.578,190.437,103.964,195.391,99.314,200.386z"></path><path d="M192.55,84.228c2.511,2.694,4.961,5.331,7.449,8.003c-28.643,30.767-57.281,61.526-85.975,92.349 c-4.438-4.131-8.871-8.265-13.402-12.48C131.267,142.804,161.885,113.539,192.55,84.228z"></path><path d="M114.501,0.386c25.777,27.689,51.453,55.267,77.191,82.912c-4.246,4.077-8.479,8.138-12.752,12.239 c-0.801-1.049-59.871-79.31-62.08-81.894c-1.342-1.571-1.682-3.284-1.775-5.255C114.962,5.764,114.71,3.146,114.501,0.386z"></path><path d="M7.521,101.772C5.007,99.074,2.515,96.397,0,93.695C28.664,62.908,57.306,32.143,86.025,1.294 c0.051,0.883,0.354,6.449,0.43,8.428c0.01,0.273-0.106,0.619-0.283,0.821C82.23,15.152,8.14,101.107,7.521,101.772z"></path><path d="M108.885,115.759c-3.553,0-7.075,0-10.635,0c0-29.817,0-59.612,0-89.488c0.617,0.401,4.498,2.937,5.854,3.857 c0.188,0.127,0.328,0.358,0.34,0.545C104.691,34.956,108.885,115.115,108.885,115.759z"></path><path d="M161.955,100.226c-26.625,0-53.141,0-79.721,0c0.229-4.509,0.465-9.001,0.701-13.538c0.918,0.099,69.043,7.83,71.426,7.941 c1.449,0.067,2.447,0.771,3.443,1.748C159.13,97.678,160.519,98.902,161.955,100.226z"></path></g><g id="music"><path d="M130.882,106.427C109.222,85.41,87.189,63.828,65.509,42.793c2.932-2.636,5.306-4.482,7.904-6.928 c24.238,18.611,48.261,37.06,72.481,55.659C140.891,96.492,135.906,101.441,130.882,106.427z"></path><path d="M201.272,37.775c-18.424,17.867-36.544,35.707-54.939,53.547c-4.757-3.982-8.658-6.948-13.595-11.007 c0.727-0.527,56.401-41.042,58.151-42.541c1.063-0.911,2.397-0.94,3.981-0.72C196.983,37.349,199.065,37.531,201.272,37.775z"></path><path d="M73.115,35.402c-3.305-3.29-6.584-6.556-9.895-9.849C42.65,45.319,22.097,65.071,1.482,84.875 c0.852,0.306,6.211,2.22,8.104,2.863c0.263,0.089,0.553,0.067,0.69-0.047C13.466,85.083,72.67,35.829,73.115,35.402z"></path><path d="M71.487,77.972c22.789,22.185,45.779,45.277,68.585,67.482c-2.901,2.463-4.784,3.922-7.408,6.256 c-25.263-19.896-50.3-39.612-75.543-59.495C61.909,87.469,66.68,82.738,71.487,77.972z"></path><path d="M1.482,146.357c18.481-17.805,36.646-35.6,55.104-53.376c5.247,4.752,10.555,8.465,15.482,12.787 c-0.738,0.513-57.771,39.789-59.538,41.271c-1.076,0.898-2.496,0.844-4.197,0.504C6.073,147.089,3.847,146.759,1.482,146.357z"></path><path d="M133.381,152.007c3.835,3.438,7.079,5.851,11.128,9.354c20.635-19.703,40.475-38.418,61.146-58.158 c-0.879-0.336-6.412-2.431-8.369-3.138c-0.268-0.099-0.563-0.084-0.705,0.031C193.375,102.685,133.829,151.582,133.381,152.007z"></path></g><g id="about"><path d="M28.086,152.156c0-46.439,0-92.829,0-139.307c3.869-0.134,7.723-0.267,11.624-0.402 c3.863,46.604,7.721,93.132,11.578,139.708C43.554,152.156,35.851,152.156,28.086,152.156z"></path><path d="M173.154,188.585c0,3.842,0,7.603,0,11.414c-47.832,0-95.654,0-143.569,0c-0.492-6.342-0.981-12.688-1.484-19.168 C76.454,183.417,124.767,186,173.154,188.585z"></path><path d="M173.16,69.013c0,39.492,0,78.824,0,118.254c-6.714-0.348-13.402-0.689-20.16-1.04 c0.146-1.36,11.661-102.417,11.825-105.952c0.101-2.148,1.147-3.63,2.604-5.108C169.366,73.202,171.188,71.142,173.16,69.013z"></path><path d="M28.098,11.521c0-3.849,0-7.667,0-11.521c47.861,0,95.689,0,143.648,0c-0.645,0.669-4.715,4.873-6.189,6.34 c-0.204,0.202-0.573,0.356-0.875,0.368C157.808,6.977,29.133,11.521,28.098,11.521z"></path><path d="M67.121,103.406c0-4.595,0-9.154,0-13.752c25.146,0,50.271,0,75.462,0c-0.339,0.798-2.477,5.816-3.254,7.567 c-0.104,0.242-0.301,0.425-0.459,0.44C135.259,97.981,67.665,103.406,67.121,103.406z"></path><path d="M142.102,63.259c-24.768,0-49.501,0-74.286,0c-0.071-2.683-0.146-5.353-0.214-8.061c24.853-2.679,49.664-5.354,74.5-8.029 C142.102,52.533,142.102,57.875,142.102,63.259z"></path><path d="M142.102,130.183c0,2.961,0,5.859,0,8.798c-24.566,0-49.128,0-73.737,0c-0.252-4.89-0.505-9.782-0.764-14.774 C92.437,126.199,117.25,128.189,142.102,130.183z"></path></g><g id="facebook"><path d="M68.349,15.651c0-4.812,0-9.52,0-14.296c33.377,0,66.75,0,100.185,0c0.344,7.944,0.687,15.893,1.038,24.006 C135.828,22.123,102.114,18.892,68.349,15.651z"></path><path d="M13.653,110.47c0-7.998,0-15.936,0-23.943c47.188,0,94.342,0,141.625,0c-0.637,1.389-4.648,10.126-6.104,13.175 c-0.203,0.42-0.568,0.741-0.866,0.765C141.532,101.025,14.673,110.47,13.653,110.47z"></path><path display="none" d="M46.077,102.906c0-5.085,0-10.131,0-15.222c30.001,0,59.979,0,90.04,0 c-0.404,0.884-2.955,6.438-3.881,8.376c-0.129,0.267-0.36,0.471-0.55,0.486C127.379,96.902,46.725,102.906,46.077,102.906z"></path><path d="M68.362,199.031c0-29.747-0.013-56.403-0.013-86.103l22.372-1.705c-0.243,1.025-8.229,76.66-8.503,79.323 c-0.168,1.619-1.908,2.734-4.328,3.847C74.671,195.875,71.641,197.427,68.362,199.031z"></path><path d="M68.349,23.614l32.206,2.426c-0.243,1.964-6.575,53.579-6.575,53.579l-25.618,0.21 C68.362,79.829,68.362,46.965,68.349,23.614z"></path></g><g id="iconsfall-logo"><path d="M1.458,199.987c0-61.034,0-122.002,0-183.088c4.665-0.176,9.309-0.351,14.016-0.528 c4.657,61.254,9.306,122.404,13.96,183.616C20.108,199.987,10.82,199.987,1.458,199.987z"></path><path d="M204.187,184.981c0,5.05,0,9.99,0,15.002c-57.672,0-115.333,0-173.104,0c-0.594-8.336-1.187-16.678-1.793-25.192 C87.594,178.189,145.847,181.582,204.187,184.981z"></path><path d="M204.196,27.828c0,51.904,0,103.599,0,155.417c-8.097-0.451-16.162-0.906-24.307-1.363 c0.175-1.791,14.059-134.606,14.257-139.251c0.122-2.824,1.383-4.771,3.139-6.712C199.621,33.333,201.817,30.625,204.196,27.828z"></path><path d="M1.472,15.153c0-5.058,0-10.077,0-15.141c57.711,0,115.38,0,173.205,0c-0.775,0.879-5.684,6.404-7.466,8.333 c-0.246,0.265-0.691,0.468-1.056,0.483C157.868,9.181,2.719,15.153,1.472,15.153z"></path><path d="M82.416,100.59c0.286,0.676,0.563,1.328,0.84,1.986c-0.872,0.489-1.757,0.901-2.548,1.448 c-2.939,2.037-4.565,4.946-5.215,8.384c-0.833,4.426-0.129,8.594,2.697,12.2c4.264,5.44,11.151,5.377,15.424-0.069 c4.366-5.568,3.816-14.674-1.256-19.41c-1.082-1.01-2.425-1.739-3.752-2.672c0.159-0.469,0.385-1.138,0.641-1.895 c1.637,0.393,3.129,1.051,4.392,2.113c2.879,2.43,4.356,5.598,4.92,9.299c0.56,3.674,0.21,7.223-1.04,10.695 c-1.67,4.635-5.77,7.547-10.659,7.822c-3.755,0.215-7.083-0.693-9.816-3.318c-2.051-1.969-3.194-4.467-3.729-7.238 c-0.729-3.784-0.686-7.555,0.575-11.219c1.376-4.002,3.973-6.854,8.158-8.05C82.151,100.637,82.257,100.623,82.416,100.59z"></path><path d="M55.974,169.141c4.396-10.315,8.767-20.571,13.214-31.004c4.488,10.413,8.909,20.659,13.366,30.995 c-1.004,0-1.836,0-2.722,0c-3.514-8.104-7.041-16.235-10.644-24.545c-0.821,1.886-1.573,3.604-2.316,5.324 c-2.34,5.426-4.677,10.851-7.015,16.277c-0.121,0.277-0.247,0.561-0.366,0.838C58.552,169.244,58.552,169.244,55.974,169.141z"></path><path d="M149.343,128.136c2.597,0.154,5.059,0.388,7.523,0.432c3.208,0.059,5.7-2.926,5.479-6.133 c-0.158-2.283-1.354-3.764-3.131-4.904c-2.307-1.482-4.715-2.807-6.972-4.357c-2.6-1.791-3.798-4.366-3.202-7.508 c0.448-2.354,2.068-3.895,4.277-4.719c0.862-0.322,1.824-0.457,2.751-0.505c1.608-0.081,3.228-0.006,4.841-0.042 c0.627-0.014,0.765,0.266,0.719,0.814c-0.037,0.438-0.008,0.884-0.008,1.257c-1.782-0.073-3.468-0.236-5.144-0.187 c-2.015,0.061-3.836,0.688-5.019,2.49c-0.974,1.482-0.706,3.696,0.449,5.031c1.682,1.945,4.001,2.961,6.07,4.342 c1.52,1.012,3.036,2.027,4.502,3.111c1.367,1.014,2.086,2.418,2.181,4.127c0.099,1.809,0.203,3.631-0.907,5.222 c-1.635,2.343-3.799,3.815-6.744,3.813c-2.34-0.002-4.681-0.107-7.021-0.149c-0.442-0.006-0.684-0.112-0.655-0.61 C149.365,129.136,149.343,128.611,149.343,128.136z"></path><path d="M33.523,139.367c4.457,0,8.859,0,13.306,0c0,0.863,0,1.69,0,2.608c-3.53,0-7.06,0-10.677,0c0,9.041,0,17.987,0,26.983 c-0.913,0-1.74,0-2.628,0C33.523,159.119,33.523,149.277,33.523,139.367z"></path><path d="M109.662,99.642c2.922,4.083,5.743,8.023,8.604,12.021c-0.466,0.438-0.942,0.885-1.515,1.422 c-1.475-1.871-2.913-3.688-4.433-5.613c0,7.681,0,15.255,0,22.895c-0.921,0-1.769,0-2.658,0 C109.662,120.189,109.662,110,109.662,99.642z"></path><path d="M126.704,122.625c0-7.791,0-15.355,0-22.981c0.889,0,1.734,0,2.629,0c0,10.188,0,20.366,0,30.769 c-2.898-4.062-5.678-7.953-8.479-11.881c0.495-0.459,0.979-0.904,1.553-1.438C123.817,118.914,125.19,120.677,126.704,122.625z"></path><path d="M117.534,139.369c0.945,0,1.828,0,2.749,0c0,9.86,0,19.682,0,29.568c-0.888,0-1.791,0-2.749,0 C117.534,159.108,117.534,149.27,117.534,139.369z"></path><path d="M33.518,100.798c0.944,0,1.827,0,2.749,0c0,9.804,0,19.566,0,29.396c-0.887,0-1.789,0-2.749,0 C33.518,120.425,33.518,110.643,33.518,100.798z"></path><path d="M93.39,139.363c0.875,0,1.7,0,2.57,0c0,9.875,0,19.715,0,29.598c-0.857,0-1.684,0-2.57,0 C93.39,159.119,93.39,149.283,93.39,139.363z"></path><path d="M62.592,127.769c0,0.812,0,1.584,0,2.359c-8.772,1.293-16.47-4.42-17.054-12.769c0.66,0,1.32-0.048,1.965,0.03 c0.194,0.023,0.415,0.377,0.507,0.623c0.397,1.058,0.629,2.195,1.144,3.188c1.967,3.782,5.1,6.014,9.341,6.541 C59.825,127.906,61.196,127.769,62.592,127.769z"></path><path d="M62.602,100.468c0,0.829,0,1.599,0,2.448c-8.082-0.412-13.186,3.156-14.98,11.211c-0.634,0-1.322,0-2.009,0 C45.567,106.935,52.764,100.065,62.602,100.468z"></path><path d="M139.498,99.936c0.771,0,1.465,0,2.226,0c0,2.753,0,5.493,0,8.299c-0.705,0-1.438,0-2.226,0 C139.498,105.494,139.498,102.753,139.498,99.936z"></path><path d="M99.74,168.96c0-0.813,0-1.584,0-2.41c2.473,0,4.935,0,7.45,0c0,0.791,0,1.578,0,2.41 C104.721,168.96,102.281,168.96,99.74,168.96z"></path><path d="M131.353,166.55c0,0.828,0,1.597,0,2.408c-2.479,0-4.92,0-7.434,0c0-0.772,0-1.562,0-2.408 C126.361,166.55,128.822,166.55,131.353,166.55z"></path><path d="M70.332,157.271c0,0.877,0,1.626,0,2.441c-1.601,0-3.188,0-4.855,0c0.317-0.748,0.604-1.465,0.932-2.16 c0.063-0.135,0.29-0.268,0.443-0.27C67.985,157.259,69.121,157.271,70.332,157.271z"></path><path d="M43.142,152.453c0,0.805,0,1.572,0,2.401c-1.288,0-2.578,0-3.924,0c0-0.776,0-1.567,0-2.401 C40.523,152.453,41.812,152.453,43.142,152.453z"></path></g></svg>');
$templateCache.put('app/components/player/player.html','<div class="if-player" ng-model="player" ng-attr-data-visible="{{ started || unedefined }}"><div class="progress" ng-click="onProgressClick($event)"><span class="meter" style="width: {{currentTimePercent}}%" ng-show="ready"></span></div><button ng-click="previous()" ng-disabled="!hasPrevious()"><i class="fa fa-fast-backward"></i></button> <button ng-click="playPause()" ng-hide="ended"><i class="fa fa-play" ng-hide="playing"></i> <i class="fa fa-pause" ng-show="playing"></i></button> <button ng-click="replay()" ng-show="ended"><i class="fa fa-repeat"></i></button> <button ng-click="next()" ng-disabled="!hasNext()"><i class="fa fa-fast-forward"></i></button> <img class="if-album-cover" width="40" height="40" src="{{ track.album.cover }}"> <span class="if-track-label"><span class="if-track-album">{{ track.album.title }} -</span> <span class="if-track-title">{{ track.track }}. {{ track.title }}</span> <span class="if-track-time right"><i class="fa fa-spinner fa-pulse" ng-hide="ready"></i> <span ng-show="ready"><span class="if-track-currenttime">{{ currentTime | formatDuration }}</span> <span class="if-track-duration">/ {{ duration | formatDuration }}</span></span></span></span></div>');}]);