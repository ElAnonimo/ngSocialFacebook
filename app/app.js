'use strict';

// Declare app level module which depends on views, and components
angular.module('ngudemyapp', [
  'ngRoute',
  'ngudemyapp.view1',
  'ngudemyapp.view2',
  'ngudemyapp.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
