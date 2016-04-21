angular.module('app.core')
	.directive('nextOn', function(StoreFactory, ShowService){
		return {
			templateUrl: 'components/next-on/next-on.tpl.html',
			restrict: 'E',
			scope: {
            	limit: '@'
			},
			controller: function($scope){
				var today = new Date();
				today.setHours(0,0,0,0);

				$scope.nextEpisodes = [];
				// loop through each show in my shows
				angular.forEach(StoreFactory.getShows(), function(show){
					// getting the shows info from the shows array
					ShowService.get(show.id).then(function(showResponse){
						// if this show is still in production
						if(showResponse.in_production === true){
							// get the lastes season information
							var seasonNumber = (showResponse.seasons.length > 1) ? (showResponse.seasons.length - 1) : 1;
							ShowService.getSeason(show.id, seasonNumber).then(function(response){
								// loop through each episode in the latest season
								angular.forEach(response.episodes, function(episode){
									if(episode.name != ""){
										var date = new Date(episode.air_date);
										// if the air date is greater than today save the episode
										if(date >= today) {
											episode.showName = show.name;
											episode.showImage = show.backdrop_path;
											episode.homepage = showResponse.homepage;
											$scope.nextEpisodes.push(episode);
										}
									}
								});
							});
						}
					});
				});
			}
		};
	});
