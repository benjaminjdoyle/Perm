(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController)
	//.controller('HomeDialogController', HomeDialogController)


	function HomeController(UserFactory, HomeFactory, $state, $stateParams, $scope, $mdToast, $mdDialog) {
		var vm = this;
		vm.user = {};
		vm.status = UserFactory.status
		vm.title = 'Welcome to our App!';

		

		//vm.login = function()..................
	}


})();
