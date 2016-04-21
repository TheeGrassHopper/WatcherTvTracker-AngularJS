angular
  .module('app.services')
  .constant('API_KEY', '87de9079e74c828116acce677f6f255b')
  .constant('BASE_URL', 'http://api.themoviedb.org/3')
  .factory('ShowService', dataService);

  // this function is resposible only to extenfing the params for other function to use eg. $http or other paramsters passed as arguments
function dataService($http, API_KEY, BASE_URL, $log) {
  var data = {
      'get': get,
      'search': search,
      'getSeason':getSeason
  };

  // function reposible only to make the json api call
  function makeRequest(url, params) {
      var requestUrl = BASE_URL + '/' + url + '?api_key=' + API_KEY;
      angular.forEach(params, function(value, key){
          requestUrl = requestUrl + '&' + key + '=' + value;
      });
      return $http({
          'url': requestUrl,
          'method': 'GET',
          'headers': {
              'Content-Type': 'application/json'
          },
          'cache': true
      }).then(function(response){
          return response.data;
      }).catch(dataServiceError);
  }

  function get(id) {
      return makeRequest('tv/' + id, {});
  }

  // function responsole only to get the search input
  // passs it into the function that is hitting the api
  function search(query, page) {
  	return makeRequest('search/tv', {query: query, page: page}).then(function(data) {
  		return data; 		
  	});
  }

  function getSeason(showId, seasonNumber){
    return makeRequest('tv/' + showId + '/season/' + seasonNumber, {});
  }

  return data;

  // function responsible for returning error responces 
  function dataServiceError(errorResponse) {
      $log.error('XHR Failed for ShowService');
      $log.error(errorResponse);
      return errorResponse;
  }
}