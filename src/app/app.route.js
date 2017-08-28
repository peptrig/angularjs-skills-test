(function () {
  'use strict';

  angular
    .module('ngskilltest')
    .config(config);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'AppController',
        controllerAs: 'vm'
      })

      .state('app.welcome', {
        url: '/',
        templateUrl: 'app/welcome/welcome.html'
      })

      .state('app.tabs', {
        url: '',
        abstract: true,
        templateUrl: 'app/tabs/tabs.html'
      })

      .state('app.tabs.events', {
        url: '/events',
        views: {
          'events': {
            templateUrl: 'app/tabs/events/events.html'
          }
        }
      })

      .state('app.tabs.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'app/tabs/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.tabs.video-call', {
        url: '/video-call',
        views: {
          'video-call': {
            templateUrl: 'app/tabs/video-call/video-call.html',
            controller: 'VideoCallController',
            controllerAs: 'vm'
          }
        }
      })
    ;
  }

})();
