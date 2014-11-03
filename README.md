icons-fall
==========

Icon's Fall website


Continuous deployment
---------------------

Continuous integration is managed by [Codeship](https://www.codeship.io/).
Code analysis is performed by [Code Climate](https://codeclimate.com/).
Dependency tracking is managed by [Gemnasium](https://gemnasium.com/).

[![Build Status](http://img.shields.io/codeship/35da2210-4540-0132-ec31-26eabbfbacd1.svg?style=flat-square)](https://codeship.io/projects/44957)
[![Code Climate](http://img.shields.io/codeclimate/github/amercier/iconsfall.svg?style=flat-square)](https://codeclimate.com/github/amercier/iconsfall)
[![Test Coverage](http://img.shields.io/codeclimate/coverage/github/amercier/iconsfall.svg?style=flat-square)](https://codeclimate.com/github/amercier/iconsfall)
[![Dependency Status](http://img.shields.io/gemnasium/amercier/iconsfall.svg?style=flat-square)](https://gemnasium.com/amercier/iconsfall)

Pushes on master branch are automatically deployed on
[http://iconsfall-staging.herokuapp.com](http://iconsfall-staging.herokuapp.com).

Tags are automatically deployed on
[http://iconsfall.herokuapp.com](http://iconsfall.herokuapp.com).

Step 1: deploy to master

    git push

Step 2: test at [http://iconsfall-staging.herokuapp.com](http://iconsfall-staging.herokuapp.com)

Step 3: deploy to production

    git tag vX.Y.Z
    git push --tags
