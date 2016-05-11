playlistApp.controller('SearchCtrl', function ($scope,$compile,Playlist) {


  $('.span-moods').on('click', function(){
    $('.span-moods').removeClass('currentLink');
    $(this).addClass('currentLink');
    console.log("addingclass");
});

  //search function that searches by genre OR mood (query)
  //gets all the playlists from the backend with the corresponding mood/genre
  $scope.searchGenreMood = function(query){
    var userId = Playlist.getUserId();
    $.ajax({
      type: 'POST',
      url: 'getplaylistfromgenre.php',
      dataType: 'json',
      data: {Query:query, UserId:userId},
      success: function(result){
        var array = []
        console.log("RESULT! "+result);
        for(key in result){
          array.push(result[key].id);
        }
        Playlist.getPlaylist(array,query);
        Playlist.searchPlaylists(query);
      },
      error: function(){
        $("#results").html("<span class='errormsg'>You don't have any playlists tagged as '"+query+"'. Check out the ones below!</span>");
        Playlist.searchPlaylists(query);
      }
    });
  }

$scope.searchKeywords = function(query){
      var userId = Playlist.getUserId();

      console.log(query);
      $.ajax({
      type: 'POST',
      url: 'getplaylistfromkeywords.php',
      dataType: 'json',
      data: {Keyword:query, UserId:userId},
      success: function(result){
                var array = []
        console.log("RESULT! "+result);
        for(key in result){
          array.push(result[key].id);
        }
        Playlist.getPlaylist(array,query);
        Playlist.searchPlaylists(query);
      },
      error: function(){
        $("#results").html("<span class='errormsg'>You don't have any playlists with the keyword '"+query+"'. Check out the ones below!</span>");
        Playlist.searchPlaylists(query);
      }
    });
  }


  //gets all playlists that the user HAS ADDED META to
  //and put them in an array, then compares the array to
  //an array containing ALL THE USERS PLAYLISTS in order to
  //know where to put the "edited" marker. Then we're generating
  //the output html where we also add ng-directives for slide-animations.
  $scope.getAllPlaylists = function(userId){
    console.log("getaUSERID "+userId);
    $.ajax({
      type: 'POST',
      url: 'getplaylist.php',
      dataType: 'json',
      data: {UserId:userId},
      success: function(result){
        console.log("result get ALL from database");
        console.log(result);
        var array = []
        for(key in result){
          array.push(result[key].id);
        }
        Playlist.getUserPlaylists(Playlist.getAccessToken()).then(function(data){
        console.log(data);
        $("#results").html("<span class='header-style1'>Your playlists:</span><br />");

        playlists = data.items;
        Playlist.setPlaylists(playlists);
        console.log(playlists.id);
        for (key in playlists){
        var playlist = playlists[key];
        var editedhtml="";
          if(jQuery.inArray(playlist.id, array) !== -1){
            editedhtml="<div class='div-edited' style='background-color: yellow; margin-top: 162px; margin-left: 83px; position: absolute; width:5px; height:5px; border-width: 1px; border-color: #000; border-radius: 5px;'></div>";
          }
            var $el = $("#results").append("<a href='#/playlist/"+playlist.id+"/"+playlist.owner.id+"/"+playlist.name+"'><div class='playlist-div' style='background-image: url("+playlist.images[0].url+");'><div class='box-container' ng-mouseover='slideUp($event)' ng-mouseout='slideDown($event)'></div>"+editedhtml+"<div class='playlist-div-details'>"+playlist.name+" <br/><span='tracks' style='font-size:26px; font-weight:bold'>"+playlist.tracks.total+" Tracks!</span></div></div></a>");
          }
          //since we are generating ng-directives dynamically we have to use $compile
          $compile($el)($scope);

          });
      },
      error: function(){
        console.log("ERROR!");
      }
    });
  }


  //gets the user-specific labels from the backend
  $scope.getUserLabels = function(userId,labeltype){
    console.log("getaUSERID "+userId);
    $.ajax({
      type: 'POST',
      url: 'getlabels.php',
      dataType: 'json',
      data: {UserId:userId, LabelType: labeltype},
      success: function(result){
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
      },
      error: function(){
        console.log("ERROR!");
      }
    });
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
  Playlist.getUserData();
  $scope.getUserLabels(Playlist.getUserId(),"mood");
  $scope.getUserLabels(Playlist.getUserId(),"genre");
  $scope.getAllPlaylists(Playlist.getUserId());


  $scope.labels=["Energetic","Romantic","Chill","Sleepy","Party","Peaceful","Spiritual","Angry","Happy"];

  $scope.mood = [{text: "Energetic", weight: 13, handlers: {click: function() {$scope.searchGenreMood("Energetic");}}},
  {text: "Romantic", weight: 10.5, handlers: {click: function() {$scope.searchGenreMood("Romantic");}}},
  {text: "Chill", weight: 9.4, handlers: {click: function() {$scope.searchGenreMood("Chill");}}},
  {text: "Sleepy", weight: 8, handlers: {click: function() {$scope.searchGenreMood("Sleepy");}}},
  {text: "Party", weight: 6.2, handlers: {click: function() {$scope.searchGenreMood("Party");}}},
  {text: "Peaceful", weight: 5, handlers: {click: function() {$scope.searchGenreMood("Peaceful");}}},
  {text: "Spiritual", weight: 4, handlers: {click: function() {$scope.searchGenreMood("Spiritual");}}},
  {text: "Angry", weight: 3, handlers: {click: function() {$scope.searchGenreMood("Angry");}}},
  {text: "Happy", weight: 2, handlers: {click: function() {$scope.searchGenreMood("Happy");}}}
  ];

  $scope.genre = [{text: "Rock", weight: 13, handlers: {click: function() {$scope.searchGenreMood("Rock");}}},
  {text: "Pop", weight: 10.5, handlers: {click: function() {$scope.searchGenreMood("Pop");}}},
  {text: "Electro", weight: 9.4, handlers: {click: function() {$scope.searchGenreMood("Electro");}}},
  {text: "Acoustic", weight: 8, handlers: {click: function() {$scope.searchGenreMood("Acoustic");}}},
  {text: "Punk", weight: 6.2, handlers: {click: function() {$scope.searchGenreMood("Punk");}}},
  {text: "House", weight: 5, handlers: {click: function() {$scope.searchGenreMood("House");}}},
  {text: "Metal", weight: 4, handlers: {click: function() {$scope.searchGenreMood("Metal");}}},
  {text: "Dubstep", weight: 3, handlers: {click: function() {$scope.searchGenreMood("Dubstep");}}},
  {text: "Other", weight: 2, handlers: {click: function() {$scope.searchGenreMood("Other");}}}
  ];

  $scope.colors = ["#00e600","#00cc00", "#00b300", "#009900", "#008000",  "#006600","#004d00" ];
  // $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];
  


  // var dataset=[];
  // for(key in $scope.labels){
    
  //   dataset[key]={text: $scope.labels[key], weight: 0.4,handlers: {click: function(){$scope.searchGenreMood($scope.labels[key]);}} };
    
  // }  
  // $scope.words = dataset;

});