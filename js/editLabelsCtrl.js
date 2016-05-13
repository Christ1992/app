playlistApp.controller('EditLabelsCtrl', function ($scope,$routeParams,$interval,$compile,$http,Playlist) {

  $scope.getUserLabels = function(userId,labeltype){
    console.log("getaUSERID "+userId);
    $http({
      method: 'POST',
      url: 'getlabels.php',
      data: {UserId:userId, LabelType: labeltype}
    }).then(function SuccessCallback(response){
      var result = response.data;
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
    }, function errorCallback(response){
      console.log("ERROR!");
    });
  }

  $scope.addLabel = function(labelType,newLabel){
  	var userId = Playlist.getUserId();
    $http({
      method: 'POST',
      url: 'addLabel.php',
      data: {UserId:userId, LabelType: labelType, NewLabel: newLabel}
    }).then(function SuccessCallback(response){
      var result = response.data;
      alert('Label added!');
      location.reload();
    }, function errorCallback(response){
      console.log("ERROR!");
    });
  }

  $scope.removeLabel = function(labelType,removeLabel){
    console.log("removelabel" + labelType + " " + removeLabel)
    var userId = Playlist.getUserId();
    Playlist.removeLabel(labelType,removeLabel)
    .then(function SuccessCallback(response){
      alert('Label removed!');
      location.reload();
    }, function errorCallback(response){
      console.log("ERROR!");
    });
  }



  $scope.getUserLabels(Playlist.getUserId(),"mood");
  $scope.getUserLabels(Playlist.getUserId(),"genre");

});