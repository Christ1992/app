playlistApp.controller('EditPlaylistCtrl', function ($scope,$routeParams,$interval,$compile,$http,Playlist) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  $scope.playlistId = $routeParams.playlistId;
  $scope.playlistUserId = $routeParams.playlistUserId;
  $scope.playlistName = $routeParams.playlistName;

  $scope.playlistArrow=Playlist.getAllPlaylists();

  var isFollowed = "";



    console.log("playlistID"+$scope.playlistId);
  console.log("playlistUSERID"+$scope.playlistUserId);


  //$scope.playlist = Playlist.getPlaylistTracks($scope.playlistId);
  //$apply();
	$scope.getTracks = function(playlistId){
		console.log("getting tracks..");
		Playlist.getPlaylistTracks(playlistId).then(function(data){
				$scope.playlist=data;
			});
	}

	$scope.checkIfFollowed = function(){
		console.log("checkiffollowplaylist...");
		$http({
      	url: 'https://api.spotify.com/v1/users/'+$scope.playlistUserId+'/playlists/'+$scope.playlistId+'/followers/contains?ids='+Playlist.getUserId(),
      	method: 'GET',
      	headers: {'Authorization': 'Bearer ' + Playlist.getAccessToken()}
      }).then(function successCallback(response){
     		console.log(response.data);
     		if (response.data=="true"){
     		var $el = $("#follow-button-span").html('<button class="btn editplaylist-follow" style="background-color:#006633; color:#fff" ng-click="unfollowPlaylist()">Followed</button>');
   			$compile($el)($scope);
        	} else if (response.data=="false") {
        	var $el = $("#follow-button-span").html('<button class="btn editplaylist-follow" style="background-color:#000" ng-click="followPlaylist()">Follow</button>');
   			$compile($el)($scope);
        	}
        }, function errorCallback(response) {
          console.log("gick åt hvete");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

	}

	$scope.getUserLabels = function(labeltype){
	var userId = Playlist.getUserId();
    console.log("getaUSERID "+userId);
    $.ajax({
      type: 'POST',
      url: 'getlabels.php',
      dataType: 'json',
      data: {UserId:userId, LabelType: labeltype},
      success: function(result){
      	console.log("getUSERLABELSLELJAFLASLFJLA");
        if(labeltype=='mood'){
          $("#mood-select").html('<option value="" disabled>{{mood}}</option>');
          for(key in result){
            var $el = $("#mood-select").append('<option value="'+result[key].mood+'">'+result[key].mood+'</option>');
          }
          $compile($el)($scope);
        }else if(labeltype=='genre'){
          $("#genre-select").html('<option value="" disabled>{{genre}}</option>');
          for(key in result){
          	var $el = $("#genre-select").append('<option value="'+result[key].genre+'">'+result[key].genre+'</option>');
          }
          $compile($el)($scope);
        }
      },
      error: function(){
        console.log("GETUSERLABELSERROR!");
      }
    });
  }

	//follow playlist button
	$scope.followPlaylist = function(){
		console.log("followplaylist...");
		$.ajax({
      	url: 'https://api.spotify.com/v1/users/'+$scope.playlistUserId+'/playlists/'+$scope.playlistId+'/followers',
      	method: 'PUT',
      	headers: {
       'Authorization': 'Bearer ' + Playlist.getAccessToken()
     	},
     	success: function(result){
			$scope.checkIfFollowed();
	        }
      });	
	}

	$scope.unfollowPlaylist = function(){
		console.log("unfollowplaylist...");
		$.ajax({
      	url: 'https://api.spotify.com/v1/users/'+$scope.playlistUserId+'/playlists/'+$scope.playlistId+'/followers',
      	method: 'DELETE',
      	headers: {
       'Authorization': 'Bearer ' + Playlist.getAccessToken()
     	},
     	success: function(result){
			$scope.checkIfFollowed();        }
      });
	}

	$scope.getMeta = function(playlistId){
		var id=$scope.playlistId;
		var userid = Playlist.getUserId();
		console.log("PLaylistID: "+id);
		$.ajax({
			type: 'POST',
			url: 'getplaylist.php',
			dataType: 'json',
			data: {Id:id, UserId:userid},
			success: function(result){
				var data=result;
				$scope.mood=result.mood;
				$scope.genre=result.genre;
				$scope.savedkeywords=result.keywords;
				console.log("META: "+result);
				console.log(result);


			},
			error: function(){
				console.log("SOME KIND OF ERROR");
				$scope.mood="Add a mood!";
				$scope.genre="Add a genre!";
				$scope.savedkeywords="Add some keywords!";

			}
		});
	}

	$scope.getPlayer = function(playlistId,playlistUserId){
		$("#player-div").html("");
		playerHtml = '<iframe src="https://embed.spotify.com/?uri=spotify:user:'+playlistUserId+':playlist:'+playlistId+'" width="450" height="500" frameborder="0" allowtransparency="true"></iframe>';
		$("#player-div").append(playerHtml);
	}

	$scope.insert = function(id,mood,genre,keywords){
		var id=$scope.playlistId;
		var userId=Playlist.getUserId();
		console.log("insert "+userId);
		$.ajax({
			type: 'POST',
			url: 'insert.php',
			data: {Id:id, Mood:mood, Genre:genre, Keywords:keywords, UserId:userId},
			success: function(result){
				alert("saved!");
				location.reload();
			},
			error: function(){
				alert('error saving order');
			}

		});

	}

	$scope.getUserLabels('mood');
	$scope.getUserLabels('genre');
	$scope.getMeta($scope.playlistId);
	$scope.getTracks($scope.playlistId);
	$scope.checkIfFollowed();
	$scope.getPlayer($scope.playlistId,$scope.playlistUserId);



});