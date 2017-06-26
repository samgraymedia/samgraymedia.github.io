'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html',
        controller: 'PostsListController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/core/views/about.client.view.html'
      })
      .state('weights', {
        url: '/weights',
        templateUrl: 'modules/posts/views/weights-post.client.view.html',
        controller: 'PostsController',
        controllerAs: 'vm'
      })
      .state('posts.stamina', {
        url: '/stamina',
        templateUrl: 'modules/posts/views/stamina-post.client.view.html',
        controller: 'PostsController',
        controllerAs: 'vm'
      })
      .state('posts.sport', {
        url: '/sport',
        templateUrl: 'modules/posts/views/sport-post.client.view.html',
        controller: 'PostsController',
        controllerAs: 'vm'
      });
  }
]);
