var BusyBeeSpelling = angular.module('BusyBeeSpelling', ['ngCordova']);

BusyBeeSpelling.run(function($rootScope){ 
  $rootScope.state = {
    "levelSelectControl" : true,
    "levelControl" : false
  };

  $rootScope.currentLevel = "";
});


BusyBeeSpelling.controller('levelSelectControl', function($scope, $rootScope){
  $scope.message = "HELLO WORLD!";
  $scope.levels = ["lowercase", "UPPERCASE", "vowels"];

  $scope.selectLevel = function(level) {
    $rootScope.currentLevel = level || "lowercase";
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
  };
});


BusyBeeSpelling.controller('levelControl', function($scope, $rootScope){
  $scope.message = "Welcome to level 1!";
  $scope.levelLetters = [];

  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $rootScope.currentLevel = "";
  };

  $scope.generateLetters = function(level) {
    if (!level) return;
    var key = {
      "lowercase" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
      "UPPERCASE" : "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOU",
      "vowels" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou"
    };

    var possible = key[level];
    $scope.levelLetters = [];

    for ( var i=0; i < 6; i++ ) {
      $scope.levelLetters.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
  };
});