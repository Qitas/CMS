/**
 * Copyright 2014-present Ivan Kravets <me@ikravets.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('MainController', MainController);

  function MainController($rootScope, $location, $window, siteUtils) {
    var vm = this;

    vm.viewAutoScroll = true;
    vm.isNavBarCollapsed = true;
    vm.isRouteActive = isRouteActive;
    vm.isPhJSCrawler = $window.navigator.userAgent.indexOf('PhantomJS') !== -1;
    vm.siteUtils = siteUtils;

    $rootScope.$on('$routeChangeStart', function(angularEvent, next, current) {
      vm.viewAutoScroll = true;
      if (!current) {
        return;
      }
      var noscrollCtrls = [
        'InstallController', 'PlatformsController',
        'FrameworksController', 'LibShowController'
      ];
      angular.forEach(noscrollCtrls, function(ctrlName) {
        if (next.controller === ctrlName &&
          current.controller === ctrlName) {
          vm.viewAutoScroll = false;
        }
      });
    });

    ////////////

    function isRouteActive(pattern) {
      return new RegExp(pattern).test($location.path());
    }

  }

})();
