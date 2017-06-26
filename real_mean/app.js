var app = angular.module('fitnessBlog', ['ui.router']);


app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: '/create.html',
        controller: 'MainCtrl'
      })

      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.factory('posts', [function() {
  var o = {
    posts: []
  };
  return o;
}])

app.controller('MainCtrl', [
  '$scope',
  'posts',

  function($scope, posts) {
    $scope.posts = posts.posts;
    //add a post function
    $scope.addPost = function() {

      if ($scope.title === "") {
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        body: $scope.body,
        upvotes: 0,
        comments: [{
            author: 'Joe',
            body: 'Cool post!',
            upvotes: 0
          },
          {
            author: 'Bob',
            body: 'Great idea but everything is wrong!',
            upvotes: 0
          }
        ]
      });
      //clears the input
      $scope.title = "";
      $scope.link = "";
      $scope.body = "";

    }
    //voting function
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
    $scope.incrementDownvotes = function(post) {
      post.upvotes -= 1;
    };
  }
]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function() {
      if ($scope.body === '') {
        return;
      }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
  }

]);
