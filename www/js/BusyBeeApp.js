var BusyBeeSpelling = angular.module('BusyBeeSpelling', ['ngCordova']);

BusyBeeSpelling.run(function($rootScope){ 
  $rootScope.state = {
    "levelSelectControl" : true,
    "levelControl" : false
  };

  $rootScope.currentLevel = "";

  // CSS class names for different flowers
  $rootScope.flowerLegend = ['flower-reddaisy', 'flower-purpletulip', 'flower-yellowdahlia'];

  $rootScope.genRanNum = function(maxLength, minLength) {
    minLength = minLength || 0;
    return Math.floor(Math.random() * (maxLength - minLength) + minLength);
  }
});


BusyBeeSpelling.controller('levelSelectControl', function($scope, $rootScope){
  $scope.message = "Busy Bee Spelling";

  $scope.levels = [{
    "name": "lowercase",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }, {
    "name": "diagraphs",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }, {
    "name": "vowels",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }];
  

  $scope.selectLevel = function(level) {
    $rootScope.currentLevel = level || "vowels";
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
  };
});

BusyBeeSpelling.controller('levelControl', function($scope, $rootScope){

  $scope.message = "Welcome to level 1!";
  $scope.currentLevel = "";
  $scope.levelScore = {
    "points": 0,
    "strikes": 0,
    "possiblePoints": 0,
    "scoreToWin": 3
  };
  // For Generating letters for the level
  $scope.letterLegend = {
    "lowercase" : "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "uppercase" : "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "vowels" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "consonants": "bcaeioudfghjklaeioumnpqraeioustvwxyzaeiou",
    "numbers": "1!2@3#4$5%6^7&8*9(0)11-12+13=14/15ab16cd17ef18uo19ij20kl"
  };
  // For checking clicked letters
  $scope.answerLegend = {
    "vowels" : "aeiou",
    "consonants": "bcdfghjklmnpqrstvwxyz",
    "numbers": "1234567890",
    "lowercase": "abcdefghijklmnopqrstuvwxy",
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXY"
  };
  // For binding letters
  $scope.levelLetters = []; 
  $scope.collectedLetters = [];

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
    setTimeout(function(){
      $scope.checkAnswer(i);
    }, 1000);
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
    $scope.levelLetters[i].show = false;
    var isCorrect = $scope.answerLegend[$scope.currentLevel.name].indexOf(letterVal) !== -1;
    if (isCorrect) {
      $scope.collectedLetters.push($scope.levelLetters[i]);
      $scope.correctAnswerResponse(letterVal);
      console.log("THIS LETTER IS CORRECT! ", $scope.collectedLetters);
    } else {
      $scope.wrongAnswerResponse(letterVal)
    }
  };

  $scope.wrongAnswerResponse = function() {
    $scope.levelScore.strikes++;
    // Trigger "This {{letter.letter}} is not a {{currentLevel}}!"
    if ($scope.levelScore.strikes === 3) {
      // Level Fail Feedback
      $scope.backToMenu();
    }
  };

  $scope.correctAnswerResponse = function() {
    $scope.levelScore.points++;
    // Trigger Letter Collection Animations?
    if ($scope.levelScore.points === $scope.levelScore.scoreToWin) {
      // Level Complete Feedback
      $scope.backToMenu();
    }
  };

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $rootScope.currentLevel = "";
    $scope.levelLetters = [];
    $scope.collectedLetters = [];
    $scope.levelScore.points = 0;
    $scope.levelScore.strikes = 0;
  };

  $scope.generateLetters = function(level) {
    if (!level) return;
    $scope.currentLevel = level;
    var possible = $scope.letterLegend[level.name];

    for ( var i=0; i < 10; i++ ) {
      $scope.levelLetters.push({
        "letter": possible.charAt($rootScope.genRanNum(possible.length)),
        "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
        "flowerLeft": i === 0 ? 200 : $scope.levelLetters[i - 1].flowerLeft + $rootScope.genRanNum(350, 250),
        "flowerBottom": $rootScope.genRanNum(200, 50),
        "letterLeft": $rootScope.genRanNum(66,33),
        "letterBottom": $rootScope.genRanNum(80, 50),
        "letterBGnumber": $rootScope.genRanNum(4,1),
        "show": true
      });
    }

    $scope.levelScore.possiblePoints = $scope.getPossiblePoints();
    $scope.levelScore.scoreToWin = ($scope.levelScore.possiblePoints < 3) ? $scope.levelScore.possiblePoints : $scope.levelScore.scoreToWin;
  };

  $scope.getPossiblePoints = function() {
    var possiblePoints = 0;
    var thisLetter;
    var thisLetterIsCorrect;
    for (i = 0; i < $scope.levelLetters.length; i++) {
      thisLetter = $scope.levelLetters[i].letter;
      thisLetterIsCorrect = $scope.answerLegend[$scope.currentLevel.name].indexOf(thisLetter) !== -1;
      if (thisLetterIsCorrect) {
        possiblePoints++;
      }
    }
    console.log("POSSIBLE POINTS THIS LEVEL!! ", possiblePoints);
    return possiblePoints;
  };
});