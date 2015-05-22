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
  $scope.levels = ["lowercase", "UPPERCASE", "numbers"];

  $scope.selectLevel = function(level) {
    console.log("~~~~~~ SELECTING LEVEL: ", level);
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
      console.log("WATCH: ", currentLevel);
      $scope.levelLetters = [];
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $scope.levelLetters = [];
  };

  $scope.generateLetters = function(level) {
    level = level || "lowercase";
    var key = {
      "lowercase" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
      "UPPERCASE" : "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOU",
      "numbers" : "abcdefghijklmnopqrstuvwxyz0123456789012345678901234567890123456789"
    };

    var possible = key[level];

    console.log("GENERATING LETTERS!! ", $scope.levelLetters);

    for ( var i=0; i < 6; i++ ) {
      $scope.levelLetters.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    console.log("GENERATING NUMBERS!! ", $scope.levelLetters);
  };
});
