function gat(category, variable, startTime, label) {
  setTimeout(function() {
    ga('send', 'timing', category, variable, Date.now() - startTime, label);
  }, 0);
}

function gaa(name, startTime) {
  gat('Assets', name, startTime);
}

if (window.location.host === 'iconsfall.com') {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-60246103-1', { siteSpeedSampleRate: 100 });
}
else {
  window.ga = function(a,b,c,d,e,f) {
    console.info('Google Analytics', a,b,c,d,e,f);
  }
}
