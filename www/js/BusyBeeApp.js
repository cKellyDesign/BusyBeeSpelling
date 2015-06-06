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
    $rootScope.currentLevel = level || "vowels";
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
  };
});


BusyBeeSpelling.controller('levelControl', function($scope, $rootScope){
  $scope.message = "Welcome to level 1!";
  $scope.currentLevel = "";
  // For Generating letters for the level
  $scope.letterLegend = {
    "lowercase" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "UPPERCASE" : "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOU",
    "vowels" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
  };
  // For checking clicked letters
  $scope.answerLegend = {
    "vowels" : "aeiou",
    "numbers": "1234567890"
  };
  $scope.levelLetters = []; // For binding letters
  $scope.collectedLetters = [];

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

  $scope.backgroundClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.offsetX * 2;
    var clickTop = e.offsetY;
    $scope.moveBee(clickTop, clickLeft);
  }

  $scope.flowerClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.srcElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.srcElement.offsetTop + e.offsetY;
    var index = angular.element(e.srcElement).parent();
    $scope.moveBee(clickTop, clickLeft);
    // console.log("INDEX: ", index, "\n", e, "\n");
  }

  $scope.letterClick = function(e, i) {
    e.stopPropagation();
    var clickLeft = e.srcElement.offsetLeft + e.srcElement.parentElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.srcElement.offsetTop + e.offsetY;
    $scope.moveBee(clickTop, clickLeft);
    $scope.checkAnswer(i);
    // console.log("\n", e, "\n");
  }

  $scope.moveBee = function(beeTop, beeLeft) {
    beeLeft = beeLeft - 89; // Centers Bee on click point

    $scope.beePosition.left = beeLeft;
    $scope.beePosition.top = beeTop;
  };

  $scope.checkAnswer = function(i) {
    // Checks answer of collected letter
    var letterVal = $scope.levelLetters[i].letter;
    var isCorrect = $scope.answerLegend[$scope.currentLevel].indexOf(letterVal) !== -1;
    if (isCorrect) {
      $scope.collectedLetters.push($scope.levelLetters[i]);
      // console.log("THIS LETTER IS CORRECT! ", $scope.collectedLetters);
    }
    $scope.levelLetters[i].show = !isCorrect;
  };

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $rootScope.currentLevel = "";
  };

  $scope.generateLetters = function(level) {
    if (!level) return;
    $scope.currentLevel = level;
    var possible = $scope.letterLegend[level];

    for ( var i=0; i < 10; i++ ) {
      $scope.levelLetters.push({
        "letter": possible.charAt($scope.genRanNum(possible.length)),
        "flowerClass": $scope.flowerLegend[$scope.genRanNum($scope.flowerLegend.length)],
        "flowerLeft": i === 0 ? 200 : $scope.levelLetters[i - 1].flowerLeft + $scope.genRanNum(350, 250),
        "flowerBottom": $scope.genRanNum(200, 50),
        "letterLeft": $scope.genRanNum(66,33),
        "letterBottom": $scope.genRanNum(80, 50),
        "letterBGnumber": $scope.genRanNum(4,1),
        "show": true
      });
    }
  };

  $scope.genRanNum = function(maxLength, minLength) {
    minLength = minLength || 0;
    return Math.floor(Math.random() * (maxLength - minLength) + minLength);
  }
});