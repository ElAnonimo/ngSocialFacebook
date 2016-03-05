'use strict';

angular.module('ngudemyapp.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config(function($facebookProvider) {
	$facebookProvider.setAppId('1004657029606546');
	$facebookProvider.setPermissions('email, public_profile, user_posts, publish_actions, user_photos');
})

.run(function($rootScope) {
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
	$scope.isLoggedIn = false;
	
	$scope.login = function() {
		$facebook.login().then(function() {
			$scope.isLoggedIn = true;
			refresh();
		});
	}
	
	$scope.logout = function() {
		$facebook.logout().then(function() {
			$scope.isLoggedIn = false;
			refresh();
		});
	}
	
	function refresh() {
		$facebook.api('/me', { fields: 'last_name, first_name, email, gender, locale, link' }).then(function(response) {
			$scope.welcomeMsg = 'Welcome ' + response.name;
			$scope.isLoggedIn = true;
			$scope.userInfo = response;
			$facebook.api('/me/picture').then(function(response) {
				$scope.picture = response.data.url;			// user picture url
				$facebook.api('/api/permissions').then(function(response) {
					$scope.permissions = response.data;
					$facebook.api('/me/posts').then(function(response) {
						$scope.posts = response.data;
					});
				});
			});
		},
		function(err) {			// error handler
			$scope.welcomeMsg = 'Please log in';
		});
	}
	
	$scope.postStatus = function() {
		var body = this.body;
		$facebook.api('/me/feed', 'post', { message: body }).then(function(response) {
			$scope.msg = 'Thanks for posting';
			refresh();
		});
	}
	
	refresh();
}]);