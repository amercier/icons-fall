icons-fall
==========

Icon's Fall website


Continuous deployment
---------------------

Continuous integration is managed by [Codeship](https://www.codeship.io/).
Code analysis is performed by [Code Climate](https://codeclimate.com/).
Dependency tracking is managed by [Gemnasium](https://gemnasium.com/).

[![Build Status](http://img.shields.io/codeship/35da2210-4540-0132-ec31-26eabbfbacd1.svg?style=flat-square)](https://codeship.io/projects/44957)
[![Code Climate](http://img.shields.io/codeclimate/github/amercier/iconsfall.svg?style=flat-square)](https://codeclimate.com/github/amercier/iconsfall/trends)
[![Test Coverage](http://img.shields.io/codeclimate/coverage/github/amercier/iconsfall.svg?style=flat-square)](https://codeclimate.com/github/amercier/iconsfall/code)

[![Dependency Status](http://img.shields.io/gemnasium/amercier/iconsfall.svg?style=flat-square)](https://gemnasium.com/amercier/iconsfall)
[![Dependency Status](http://img.shields.io/david/dev/amercier/iconsfall.svg?style=flat-square)](https://gemnasium.com/amercier/iconsfall#development-dependencies)

[![Open Issues](http://img.shields.io/github/issues/amercier/iconsfall.svg?style=flat-square)](https://github.com/amercier/iconsfall/issues)

Pushes on master branch are automatically deployed on
[http://iconsfall-staging.herokuapp.com](http://iconsfall-staging.herokuapp.com).

Tags are automatically deployed on
[http://iconsfall.herokuapp.com](http://iconsfall.herokuapp.com).

Step 1: deploy to dev branch

    git push

Step 2: test at [http://iconsfall-staging.herokuapp.com](http://iconsfall-staging.herokuapp.com)

Step 3: create a PR on GitHub

Step 4: merge the PR into master branch 


Setup
-----

Clone the repo on dev branch

    git clone -b dev git@github.com:amercier/iconsfall.git
    npm install
    bower install


Development
-----------

    gulp dev


Build
-----

    gulp build
