(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController, ['ngMdIcons'])
	.controller('UpdateProspectDialogController', UpdateProspectDialogController)


	function HomeController(UserFactory, HomeFactory, $state, $stateParams, $scope, $mdToast, $mdDialog) {
		var vm = this;
		vm.prospect = {};
		vm.status = UserFactory.status
		vm.title = 'Get a Perm!';

		// HomeFactory.getAllProspects().then(function(res) {
		// 	vm.prospects = res;
		// });
		
		UserFactory.getProfileProspects().then(function(res) {
			vm.profileProspects = res;
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
				// res.createdBy = {};
	    		// res.createdBy._id = UserFactory.status._id;
	    		// res.createdBy.username = UserFactory.status.username;
	   			vm.profileProspects.unshift(res);
	    		vm.prospect = {};
	    		$mdToast.show(
	    			$mdToast.simple()
	    			.content('Prospect Created')
	    			.position('bottom right')
	    			.hideDelay(2200)
	    		);
			});
				
		};
		
		vm.deleteProspect = function(prospect) {
			vm.profileProspects.splice(vm.profileProspects.indexOf(prospect), 1);
			HomeFactory.deleteProspect(prospect._id).then(function(res) {
				$mdToast.show(
					$mdToast.simple()
					.content('Prospect deleted!')
					.position('bottom right')
					.hideDelay(2200)
				);
			});
		};	

		vm.openEditModal = function(ev, prospect) {
			$mdDialog.show({
				controller: UpdateProspectDialogController,
				templateUrl: '/templates/partials/editModal.templ.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					prospect: prospect
				}
			})
			.then(function(newProspect) {
				HomeFactory.updateProspect(newProspect, prospect).then(function(res) {
					vm.prospects[vm.prospects.indexOf(prospect)] = newProspect;
				});
			});
		};

		vm.startEdit = function(prospect) {
			vm.isEditing = true;
			vm.selectedProspect = prospect;
			vm.editProspect = angular.copy(prospect);
		};


	}; 
	
	function UpdateProspectDialogController($scope, $mdDialog, prospect) {
		$scope.prospect = angular.copy(prospect);
		$scope.updateProspect = function() {
			$mdDialog.hide($scope.prospect);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		// $scope.prospect
	}



})();
