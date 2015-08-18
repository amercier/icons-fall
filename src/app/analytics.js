var INIT_ANALYTICS = Date.now();

function gat(category, variable, startTime, label) {
  'use strict';

  setTimeout(function() {
    ga('send', 'timing', category, variable, Date.now() - startTime, label);
  }, 0);
}

function gaa(name, startTime) {
  'use strict';

  gat('Assets', name, startTime);
}

if (window.location.host === 'iconsfall.com') {
  // jshint ignore: start
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  // jshint ignore: end

  ga('create', 'UA-60246103-1', { siteSpeedSampleRate: 100 });
  ga('require', 'displayfeatures');
}
else {
  window.ga = function(a,b,c,d,e,f) {
    'use strict';
    console.info('Google Analytics', a,b,c,d,e,f);
  };
}

gaa('analytics.js', INIT_ANALYTICS);
