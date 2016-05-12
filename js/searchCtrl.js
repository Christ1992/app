playlistApp.controller('SearchCtrl', function ($scope,$compile,Playlist,$http) {


  $('.span-moods').on('click', function(){
    $('.span-moods').removeClass('currentLink');
    $(this).addClass('currentLink');
    console.log("addingclass");
});


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



      $scope.getStatus=function(id){
        if(jQuery.inArray(id, response) !== -1){
              //edited
              return true
              //editedhtml="<div class='div-edited' style='background-color: yellow; margin-top: 162px; margin-left: 83px; position: absolute; width:5px; height:5px; border-width: 1px; border-color: #000; border-radius: 5px;'></div>";
        }else{
            return false
        }
      }
    });
  }
    // $http({
    //   method: 'POST',
    //   url: 'getplaylist.php',
    //   data: {UserId:userId}
    // }).then(function SuccessCallback(response){
    //   var result = response.data;
    //   console.log("result get ALL from database");
    //   console.log(result);
    //   var array = [];
    //   for(key in result){
    //     array.push(result[key].id);
    //   }
      // var dataset=Playlist.getUserPlaylists();
      // console.log(dataset);
      // $scope.returnResult="Your playlists:";
      //$("#results").html("<span class='header-style1'>Your playlists:</span><br />");
  //     playlists = dataset.items;
  //     Playlist.setPlaylists(playlists);
  //     console.log(playlists);
  //     for (key in playlists){
  //     var playlist = playlists[key];
  //     var editedhtml="";
  //       if(jQuery.inArray(playlist.id, array) !== -1){
  //         editedhtml="<div class='div-edited' style='background-color: yellow; margin-top: 162px; margin-left: 83px; position: absolute; width:5px; height:5px; border-width: 1px; border-color: #000; border-radius: 5px;'></div>";
  //       }
  //       var $el = $("#results").append("<a href='#/playlist/"+playlist.id+"/"+playlist.owner.id+"/"+playlist.name+"'><div class='playlist-div' style='background-image: url("+playlist.images[0].url+");'><div class='box-container' ng-mouseover='slideUp($event)' ng-mouseout='slideDown($event)'></div>"+editedhtml+"<div class='playlist-div-details'>"+playlist.name+" <br/><span='tracks' style='font-size:26px; font-weight:bold'>"+playlist.tracks.total+" Tracks!</span></div></div></a>");
  //     }
  //       //since we are generating ng-directives dynamically we have to use $compile
  //     $compile($el)($scope);
  //   }) ;
    
  // }

//search function that searches by genre OR mood (query)
  //gets all the playlists from the backend with the corresponding mood/genre
  $scope.searchGenreMood = function(query){
    $scope.returnResult="";
    $scope.queryResult=Playlist.searchGenreMood(query)
      .then(function SuccessCallback(response){
        console.log("hihiihihihihihihihi");
        console.log(response);
        if(response == 'zeroResults'){
            $scope.returnResult="You don't have any playlists tagged as '"+query+"'. Check out the ones below!";
            $scope.showPlaylists=[];
        }else{

            $scope.returnResult="Your playlist tagged as "+query+":";
            $scope.showPlaylists=Playlist.getPlaylist(response);
            console.log("$scope.showPlaylists");
            console.log($scope.showPlaylists);
        }
      });
    Playlist.searchPlaylists(query);
  }
    // console.log("SearchGenreMood");
    // var userId = Playlist.getUserId();
    // $http({
    //   method: 'POST',
    //   url: 'getplaylistfromgenre.php',
    //   data: {Query:query, UserId:userId}
    // }).then(function SuccessCallback(response){
    //   var result = response.data;
    //   var array = [];
    //   console.log("RESULT! "+result);
    //   for(key in result){
    //     array.push(result[key].id);
    //   }
    //   Playlist.getPlaylist(array,query);
    //   Playlist.searchPlaylists(query);
    //   if(result == 'zeroResults'){
    //     $("#results").html("<span class='errormsg'>You don't have any playlists tagged as '"+query+"'. Check out the ones below!</span>");
    //     Playlist.searchPlaylists(query);
    //   }
    // }, function errorCallback(response){
    //   console.log("An error occured");
    // });
    
  
  //SEARCHES FOR USERS PLAYLIST WITH A KEYWORD AS PARAMETER
  $scope.searchKeywords = function(query){
      var userId = Playlist.getUserId();
      console.log(query);
      $http({
        method: 'POST',
        url: 'getplaylistfromkeywords.php',
        data: {Keyword:query, UserId:userId}
      }).then(function SuccessCallback(response){
        var result = response.data;
        var array = [];
        console.log("RESULT! "+result);
        for(key in result){
          array.push(result[key].id);
        }
        Playlist.getPlaylist(array,query);
        Playlist.searchPlaylists(query);
        if(result == 'zeroResults'){
          $("#results").html("<span class='errormsg'>You don't have any playlists with the keyword '"+query+"'. Check out the ones below!</span>");
          Playlist.searchPlaylists(query);
        }
      }, function errorCallback(response){
        console.log("An error occurred");
      })
    }

  

  //gets the user-specific labels from the backend
  $scope.getUserLabels = function(userId,labeltype){
    console.log("getUserLabels: "+userId);
    $http({
      method: 'POST',
      url: 'getlabels.php',
      data: {UserId:userId, LabelType: labeltype}
    }).then(function SuccessCallback(response){
      var result = response.data;
      if(labeltype=='mood'){
          $("#search-moods").html('<span class="span-label">Select mood:</span>');
          for(key in result){
            var $el = $("#search-moods").append('<span class="span-moods" ng-click="searchGenreMood('+"'"+result[key].mood+"'"+')">'+result[key].mood+'</span>');
          }
          $compile($el)($scope);
        }else if(labeltype=='genre'){
          $("#search-genres").html('<span class="span-label">Select genre:</span>');
          for(key in result){
            var $el = $("#search-genres").append('<span class="span-moods" ng-click="searchGenreMood('+"'"+result[key].genre+"'"+')">'+result[key].genre+'</span>');
          }
          $compile($el)($scope);
        }
    }, function errorCallback(response){
      console.log("ERROR!");
    })
  }

  //some nice animations using jQuery.animate()
  //triggered when hovering above the playlists in the search view
  $scope.slideUp = function($event){
    console.log("slide");
    var a = jQuery($event.target)
    console.log(a.parent());
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