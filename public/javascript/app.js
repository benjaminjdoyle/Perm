(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
      controller: 'HomeController as vm'
		}).state('Login', {
			url:'/Login',
			templateUrl: '/templates/login.html'
		}).state('Register', {
			url: '/profile',
			templateUrl: '/templates/profile.html',
		});
		$urlRouterProvider.otherwise('/');
		
	}
})();
