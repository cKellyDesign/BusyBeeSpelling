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
    "left": 50,
    "top": 10
  };

  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.moveBee = function(e) {
    // Handles screen tap event
    e.stopPropagation();
    var target = e.target;
    var beeLeft = (e.offsetX * 2) - 89;

    // if ( target.hasClass('flowers') ) {
    //   beeLeft = ((e.offsetX * 2) + target.css('left')) - 89;
    // } else if ( target.hasClass('letters') ) {
    //   beeLeft = ((e.offsetX * 2) + target.css('left') + target.parents('.flowers').css('left')) - 89;
    // } else {
    //   beeLeft = (e.offsetX * 2) - 89;
    // }

    $scope.beePosition.left = beeLeft;
    $scope.beePosition.top = e.offsetY;
    console.log("NEW BE POSITION -  offsetX: ", e.offsetX, " e: ", e);
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

    for ( var i=0; i < 10; i++ ) {
      $scope.levelLetters.push({
        "letter": possible.charAt($scope.genRanNum(possible.length)),
        "flowerClass": $scope.flowerLegend[$scope.genRanNum($scope.flowerLegend.length)],
        "flowerLeft": i === 0 ? 200 : $scope.levelLetters[i - 1].flowerLeft + $scope.genRanNum(350, 250),
        "flowerBottom": $scope.genRanNum(200, 50),
        "letterLeft": $scope.genRanNum(66,33),
        "letterBottom": $scope.genRanNum(80, 50),
        "letterBGnumber": $scope.genRanNum(4,1)
      });
    }
  };

  $scope.genRanNum = function(maxLength, minLength) {
    minLength = minLength || 0;
    return Math.floor(Math.random() * (maxLength - minLength) + minLength);
  }
});