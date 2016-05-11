playlistApp.controller('EditLabelsCtrl', function ($scope,$routeParams,$interval,$compile,$http,Playlist) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

$scope.getUserLabels = function(userId,labeltype){
    console.log("getaUSERID "+userId);
    $.ajax({
      type: 'POST',
      url: 'getlabels.php',
      dataType: 'json',
      data: {UserId:userId, LabelType: labeltype},
      success: function(result){
        if(labeltype=='mood'){
          $("#addLabel-moods").html('');
          for(key in result){
            var $el = $("#addLabel-moods").append('<span class="span-moods-remove" ng-click="removeLabel('+"'mood','"+result[key].mood+"'"+')">'+result[key].mood+'</span>');
          }
          $compile($el)($scope);
        }else if(labeltype=='genre'){
          $("#addLabel-genres").html('');
          for(key in result){
            var $el = $("#addLabel-genres").append('<span class="span-moods-remove" ng-click="removeLabel('+"'genre','"+result[key].genre+"'"+')">'+result[key].genre+'</span>');
          }
          $compile($el)($scope);
        }
      },
      error: function(){
        console.log("ERROR!");
      }
    });
  }

  $scope.addLabel = function(labelType,newLabel){
  	var userId = Playlist.getUserId();
  	$.ajax({
      type: 'POST',
      url: 'addLabel.php',
      data: {UserId:userId, LabelType: labelType, NewLabel: newLabel},
      success: function(result){
      	alert('Label added!');
        location.reload();
      },
      error: function(){
        console.log("ERROR!");
      }
    });
  }

  $scope.removeLabel = function(labelType,removeLabel){
    console.log("removelabel" + labelType + " " + removeLabel)
    var userId = Playlist.getUserId();
    $.ajax({
      type: 'POST',
      url: 'removeLabel.php',
      data: {UserId:userId, LabelType: labelType, RemoveLabel: removeLabel},
      success: function(result){
        alert('Label removed!');
        location.reload();
      },
      error: function(){
        console.log("ERROR!");
      }
    });
  }

  $scope.getUserLabels(Playlist.getUserId(),"mood");
  $scope.getUserLabels(Playlist.getUserId(),"genre");
});