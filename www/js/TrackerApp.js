var TrackerApp = angular.module('trackerApp', ['ngCordova']);

TrackerApp.run(function($rootScope){ });

TrackerApp.controller('controlTest', function($scope){
  $scope.message = "HELLO WORLD!";
});