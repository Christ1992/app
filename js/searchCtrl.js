playlistApp.controller('SearchCtrl', function ($scope,$compile,Playlist,$http) {

  //gets all playlists that the user HAS ADDED META to
  //and put them in an array, then compares the array to
  //an array containing ALL THE USERS PLAYLISTS in order to
  //know where to put the "edited" marker. Then we're generating
  //the output html where we also add ng-directives for slide-animations.
  
  $scope.getAllPlaylists = function(){
    $scope.returnResult="Your playlists:";
    Playlist.getUserPlaylists().then(function successCallback(response) {
      console.log(response);
      Playlist.setPlaylists(response);
      $scope.showPlaylists=response;
      
      Playlist.getAllEdits().then(function successCallback(response) {
        $scope.arrayId=response;
        
      });
    });
  }
  $scope.checkStatus=function(id){
        
        if(jQuery.inArray(id, $scope.arrayId) !== -1){
              //edited
              return true
              //editedhtml="<div class='div-edited' style='background-color: yellow; margin-top: 162px; margin-left: 83px; position: absolute; width:5px; height:5px; border-width: 1px; border-color: #000; border-radius: 5px;'></div>";
        }else{
            return false
        }
  }


 $scope.sgResult=""; 
//indicator for highlight the labels  
$scope.selCont = -1;
$scope.selCont2 = -1;
//search function that searches by genre OR mood (query)
  //gets all the playlists from the backend with the corresponding mood/genre
  $scope.searchGenreMood = function(query,index,labeltype){

    
    if(labeltype=='mood'){
      $scope.selCont = index;
      $scope.selCont2 = -1;
    }else if(labeltype=='genre'){
      $scope.selCont = -1;
      $scope.selCont2 = index;
    }

    $scope.returnResult="";
    $scope.queryResult=Playlist.searchGenreMood(query)
      .then(function SuccessCallback(response){
         $scope.drawList(response,query);
      });
    $scope.searchPlaylists(query);
  }
    
  
  //SEARCHES FOR USERS PLAYLIST WITH A KEYWORD AS PARAMETER
  $scope.searchKeywords = function(query){
      $scope.returnResult="";
      $scope.queryResult=Playlist.searchKeywords(query)
      .then(function SuccessCallback(response){
          $scope.drawList(response,query);
      });
    $scope.searchPlaylists(query);
  }

  $scope.drawList=function(response,query){
    if(response == 'zeroResults'){
            $scope.returnResult="You don't have any playlists tagged as '"+query+"'. Check out the ones below!";
            $scope.showPlaylists=[];
        }else{

            $scope.returnResult="Your playlist tagged as "+query+":";
            $scope.showPlaylists=Playlist.getPlaylist(response);
        }
  }
  $scope.searchPlaylists=function(query){
    $scope.sgResult="You might also like:";
      Playlist.searchPlaylists(query)
      .then(function SuccessCallback(response){
          console.log("22222223333333222222");
          console.log(response);
          $scope.sgPlaylists=response;
      });
     
  }
  //gets the user-specific labels from the backend
  $scope.getUserLabels = function(userId,labeltype){
    $scope.userLabel="";
    Playlist.getUserLabels(userId,labeltype)
    .then(function SuccessCallback(result){
        console.log("resulttttttttt");
        console.log(result);
        if(labeltype=='mood'){
          $scope.moodLabels=result;

        }else if(labeltype=='genre'){
          $scope.genreLabels=result;
        }
    });
  }

    // $http({
    //   method: 'POST',
    //   url: 'getlabels.php',
    //   data: {UserId:userId, LabelType: labeltype}
    // }).then(function SuccessCallback(response){
    //   var result = response.data;
      // if(labeltype=='mood'){
      //     $("#search-moods").html('<span class="span-label">Select mood:</span>');
      //     for(key in result){
      //       var $el = $("#search-moods").append('<span class="span-moods" ng-click="searchGenreMood('+"'"+result[key].mood+"'"+')">'+result[key].mood+'</span>');
      //     }
      //     $compile($el)($scope);
      //   }else if(labeltype=='genre'){
      //     $("#search-genres").html('<span class="span-label">Select genre:</span>');
      //     for(key in result){
      //       var $el = $("#search-genres").append('<span class="span-moods" ng-click="searchGenreMood('+"'"+result[key].genre+"'"+')">'+result[key].genre+'</span>');
      //     }
      //     $compile($el)($scope);
      //   }
    // }, function errorCallback(response){
    //   console.log("ERROR!");
    // })
  

  //some nice animations using jQuery.animate()
  //triggered when hovering above the playlists in the search view
  $scope.slideUp = function($event){
    //console.log("slide");
    var a = jQuery($event.target)
    //console.log(a.parent());
    //a.parent().find('.playlist-div-details').css('margin-top', '0px');
    a.parent().find('.playlist-div-details').animate({'margin-top': '0px'}, 150);
  }
    $scope.slideDown = function($event){
    var a = jQuery($event.target);
    a.parent().find('.playlist-div-details').animate({'margin-top': '130px'}, 150);
  }

  //we get the user-details and all the user's playlists everytime we load this view
  //Playlist.getUserData();
  $scope.getUserLabels(Playlist.getUserId(),"mood");
  $scope.getUserLabels(Playlist.getUserId(),"genre");
  $scope.getAllPlaylists();


});