playlistApp.controller('CallbackCtrl', function ($scope,Playlist,$location,$http) {

  var userId = "";

  //CONSTRUCTS A QUERY-STRING TO PASS TO THE SPOTIFY AUTORIZATION SERVCE
  //IN ORDER TO RETRIEVE THE AUTHORIZATION TOKEN
  $scope.getQuerystring = function () {
    console.log("getQueryString");
    var grant_type = "authorization_code";
    var code = Playlist.getQueryString('code');
    var uri = 'http://www.mikaeljuntti.se/app/index.html#/callback';
    var redirect_uri = encodeURIComponent(uri);
    console.log("CODE: "+code);
    Playlist.returnToken({Grant_type:grant_type,Code:code,Redirect_uri:redirect_uri})
      .then(function(response){
          console.log(response);
          var result = response.data;
          console.log("Access token: "+result.access_token);
          Playlist.setAccessToken(result.access_token);
          Playlist.getUserData(result.access_token).then(function(data){
              var array = data;
              console.log(array);
              console.log(array[0]);
              $scope.userinfo=array[0];
              $scope.createDatabase($scope.userinfo);
              $location.path("/search");
          });
      });    
  }

  //PASSES THE USER ID TO THE BACKEND AND SETS UP TABLES FOR THE USER
  $scope.createDatabase = function(userId) {
    console.log("create database as: "+userId);
    $http({
      url: 'createdatabase.php',
      method: 'POST',
      data: {UserId:userId}
    }).then(function SuccessCallback(response){
      console.log("Database created!" + response.data)
    }, function errorCallback(response){
      console.log("Error setting up Database!");
    });
  }

});