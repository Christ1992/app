playlistApp.controller('HeaderCtrl', function ($scope,Playlist) {
  console.log("headerCTRL");
  //$scope.username = Playlist.getUserName();
$(document).ready(function(){
    $("a.tooltipLink").tooltip(); 
});

  $scope.getUserinfo = function(){
		//console.log("getting user details..");
		Playlist.getUserData().then(function(data){
				//console.log("userdetails: "+data)
				$scope.displayname = data[1];
				$scope.imgurl = data[2];

			});
	}

/*
	$('.glyphicon-question-sign').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'My common piece of text here'
    }
	});
*/
  $scope.getUserinfo();

});