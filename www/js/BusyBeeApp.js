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

  // For Generating letters for the level
  $scope.letterLegend = {
    "lowercase" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "UPPERCASE" : "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOU",
    "vowels" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
  };
  $scope.levelLetters = []; // For binding letters

  // CSS class names for different flowers
  $scope.flowerLegend = ['flower-reddaisy', 'flower-purpletulip', 'flower-yellowdahlia'];

  // Number values for Left / Top CSS properties
  $scope.beePosition = {
    "Left": 10,
    "Top": 10
  };

  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.moveBee = function(e) {
    // Handles screen tap event
    e.stopPropagation();

  };

  $scope.collectLetter = function(e) {
    // Handles letter tap event
    e.stopPropagation();

  };

  $scope.checkAnswer = function() {
    // Checks answer of collected letter
  }

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $rootScope.currentLevel = "";
  };

  $scope.generateLetters = function(level) {
    if (!level) return;

    var possible = $scope.letterLegend[level];

    for ( var i=0; i < 6; i++ ) {
      $scope.levelLetters.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
  };
});