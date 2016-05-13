playlistApp.controller('EditPlaylistCtrl', function ($scope,$routeParams,$interval,$compile,$http,Playlist,$sce) {

	$scope.playlistId = $routeParams.playlistId;
	$scope.playlistUserId = $routeParams.playlistUserId;
  	$scope.playlistName = $routeParams.playlistName;
  	

  	Playlist.getUserPlaylists()
  	.then(function successCallback(response) {
          $scope.playlistArrow=response;
          console.log("nicaiwoshishuidssssssssss");
          console.log("nicaiwoshishuiddddddddd");
          console.log($scope.playlistArrow);

        });
  	
  	console.log($scope.playlistArrow);
  	console.log("nicaiwoshishuidssssssssss");
  	console.log("nicaiwoshishuidssssssssss");

	var isFollowed = "";

	console.log("playlistID"+$scope.playlistId);
	console.log("playlistUSERID"+$scope.playlistUserId);

	/*$scope.getTracks = function(playlistId){
		console.log("getting tracks..");
		Playlist.getPlaylistTracks(playlistId).then(function(data){
			$scope.playlist=data;
		});
	}*/

	$scope.getUserLabels = function(labeltype){
		var userId = Playlist.getUserId();
	    console.log("getaUSERID "+userId);
	    Playlist.getUserLabels(userId,labeltype)
	    .then(function SuccessCallback(result){
	    	if(labeltype=='mood'){
          $scope.moodLabels=result;

	        }else if(labeltype=='genre'){
	          $scope.genreLabels=result;
	        }
	    });
  }


	//CHECKS IF THERE IS ANY META ATTACHED TO THE PLAYLIST IN THE DATABASE
	$scope.getMeta = function(playlistId){
		var id=$scope.playlistId;
		var userid = Playlist.getUserId();
		console.log("PLaylistID: "+id);
		Playlist.getMeta(id,userid)
		.then(function SuccessCallback(result){
			console.log("22345678987654567896543");
			console.log(result);
			$scope.mood=result.mood;
			$scope.genre=result.genre;
			$scope.savedkeywords=result.keywords;
			if(result=='zeroResults'){
				$scope.mood="";
				$scope.genre="";
				$scope.savedkeywords="Add a keywords!";
			}
		}, function errorCallback(response){
      		console.log("An error occured: getMeta");
    	});
		
	}

	$scope.getPlayer = function(playlistId,playlistUserId){
		$scope.playerUrl=$sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:user:"+playlistUserId+":playlist:"+playlistId);
		
		// $("#player-div").html("");
		// playerHtml = '<iframe src="https://embed.spotify.com/?uri=spotify:user:'+playlistUserId+':playlist:'+playlistId+'" width="450" height="500" frameborder="0" allowtransparency="true"></iframe>';
		// $("#player-div").append(playerHtml);
	}

	//FIX HTTP
	$scope.insert = function(id,mood,genre,keywords){
		var id=$scope.playlistId;
		Playlist.insert(id,mood,genre,keywords)
		.then(function SuccessCallback(result){
		
			alert("saved!");
			location.reload();
    	}, function errorCallback(response){
      		console.log("An error occured: getMeta");
    	});
    }

	
	$scope.checkIfFollowed = function(playlistId){
		var id= $scope.playlistId;
		var ownerId=$scope.playlistUserId;
		Playlist.checkIfFollowed(id,ownerId).then(function successCallback(result){
        	
        	$scope.followStatus=result;

        	console.log("!1111");
        	console.log(result);

        });

	}

	$scope.followPlaylist = function(playlistId){
		var id= $scope.playlistId;
		var ownerId=$scope.playlistUserId;
		Playlist.followPlaylist(id,ownerId).then(function successCallback(result){
        	$scope.checkIfFollowed(id); 
        }, function errorCallback(result){
          console.log("ERROR! editplaylistctrl>followplaylist");
      	});
      }

	$scope.unfollowPlaylist = function(playlistId){
		var id= $scope.playlistId;
		var ownerId=$scope.playlistUserId;
		Playlist.unfollowPlaylist(id,ownerId).then(function successCallback(result){
        	
        	$scope.checkIfFollowed(id); 
        }, function errorCallback(result){
          console.log("ERROR! editplaylistctrl>followplaylist");
      	});
      }


	$scope.getUserLabels('mood');
	$scope.getUserLabels('genre');
	$scope.getMeta($scope.playlistId);
	//$scope.getTracks($scope.playlistId);
	$scope.checkIfFollowed();
	$scope.getPlayer($scope.playlistId,$scope.playlistUserId);



});