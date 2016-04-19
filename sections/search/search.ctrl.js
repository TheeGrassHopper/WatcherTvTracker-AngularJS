angular.module('app.core').controller('SearchController', function (ShowService, $timeout, StoreFactory){
	var vm = this;
	vm.results = false;
	vm.searching = false;


	vm.query = function(query) {
		vm.searching = true;
		ShowService.search(query).then(function(responce){
			vm.results = responce;
			$timeout(function(){
				vm.searching =false;
			}, 500);
		});
	};

	vm.trackShow = function(show) {
        StoreFactory.addShow(show);
    };

    vm.unTrackShow = function(id) {
        StoreFactory.removeShow(id);
    };

    vm.hasShow = function(id) {
        return (StoreFactory.getShow(id) !== false);
    };
});