'use strict';

// Declare app level module which depends on views, and components
angular.module('ngUdemyApp', [
  'ngRoute',
  'ngUdemyApp.view1',
  'ngUdemyApp.view2',
  'ngUdemyApp.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
