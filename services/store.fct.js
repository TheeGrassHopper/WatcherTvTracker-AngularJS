angular
	.module('app.services')
	.factory('StoreFactory', dataService);

function dataService(localStorageService){
	var _show = [];

	var ls = localStorageService.get('store');
	if(ls !== null){
		_shows = ls;
	}

	var service = {
		'addShow': addShow,
		'getShow': getShow,
		'getShows': getShows,
		'removeShow': removeShow
	};

	function addShow(data){
		_show.push(data);
		save();
	}

	function getShow(id){
			angular.forEach(_show, function(show){
				if( show.id === id){
					return show;
				}
		});
		return result;
	}

	function getShows(){
		return _shows;
	}

	function removeShow(id){
		var idx = -1;
		var found = false;
		angular.forEach(_show, function(show){
			if(found === false) {
				if (show.id === id) {
					found = true;
				}
				idx++;
			}
		});
		if(found === true) {
			_show.splice(idx, 1);
			save();
		}
	}
	function save(){
		localStorageService.set('store',_shows);
	}
	return service;
}