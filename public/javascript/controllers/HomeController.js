(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController)
	//.controller('HomeDialogController', HomeDialogController)


	function HomeController(UserFactory, HomeFactory, $state, $stateParams, $scope, $mdToast, $mdDialog) {
		var vm = this;
		vm.prospect = {};
		vm.status = UserFactory.status
		vm.title = 'Get a Perm!';

		HomeFactory.getAllProspects().then(function(res) {
			vm.prospects = res;
		});
		
		vm.createProspect = function() {
			if(!vm.prospect.name){
				$mdToast.show(
					$mdToast.simple()
					.content('You must include the name of your prospect!')
					.position('bottom right')
					.hideDelay(3000)
				);
			}
				HomeFactory.createProspect(vm.prospect).then(function(res) {
					$state.go('Home');
					//res.createdBy = {};
	    			//res.createdBy._id = UserFactory.status._id;
	    			//res.createdBy.username = UserFactory.status.username;
	    			//vm.prospects.unshift(res);
	    			vm.prospect = {};
	    			$mdToast.show(
	    				$mdToast.simple()
	    				.content('Prospect Created')
	    				.position('bottom right')
	    				.hideDelay(2200)
	    			);
				});
				
			};

		//vm.login = function()..................
	}



})();
