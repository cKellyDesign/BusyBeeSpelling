var BusyBeeSpelling = angular.module('BusyBeeSpelling', ['ngCordova']);

BusyBeeSpelling.run(function($rootScope, $timeout){ 
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


BusyBeeSpelling.controller('levelSelectControl', function($scope, $rootScope, $timeout){
  $scope.message = "Busy Bee Spelling";

  $scope.levels = [{
    "name": "lowercase",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }, {
    "name": "digraph",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }, {
    "name": "vowel",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }];
  

  $scope.selectLevel = function(level) {
    $rootScope.currentLevel = level || "vowel";
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
  };
});

BusyBeeSpelling.controller('levelControl', function($scope, $rootScope, $timeout){

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
    "vowel" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "consonant": "bcaeioudfghjklaeioumnpqraeioustvwxyzaeiou",
    "numbers": "1!2@3#4$5%6^7&8*9(0)11-12+13=14/15ab16cd17ef18uo19ij20kl",
    "digraph": ["th", "ch", "sh", "ph"]
  };
  // For checking clicked letters
  $scope.answerLegend = {
    "vowel" : "aeiou",
    "consonant": "bcdfghjklmnpqrstvwxyz",
    "numbers": "1234567890",
    "lowercase": "abcdefghijklmnopqrstuvwxy",
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXY",
    "digraph": ["th", "ch", "sh", "ph", "wh", "tch", "kn", "gh"]
  };
  // For binding letters
  $scope.levelLetters = []; 
  $scope.collectedLetters = [];

  // Letter Collection Response Panel Vars
  $scope.showCollectAnswerPanel = false;
  $scope.collectedAnswer = "";
  $scope.levelAnswerIndex = 0;

  // Number values for Left / Top CSS properties
  // Todo: Embed functions to animate different actions
  $scope.beePosition = {
    "left": 50,
    "top": 10
  };

  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.moveBee = function(beeTop, beeLeft) {
    beeLeft = beeLeft - 89; // Centers Bee on click point

    $scope.beePosition.left = beeLeft;
    $scope.beePosition.top = beeTop;
  };

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
    $timeout(function(){
      $scope.checkAnswer(i);
    }, 1000);
  }

  $scope.checkAnswer = function(i) {
    $scope.levelAnswerIndex = i;
    var answerVal = $scope.levelLetters[i].letter; 
    var isCorrect = $scope.answerLegend[$scope.currentLevel.name].indexOf(answerVal) !== -1;

    if (isCorrect) {
      // Show Answer Panel with true
      $scope.showCollectAnswerPanel = true;
      $scope.collectedAnswer = answerVal;
      $scope.collectedAnswerBG = $scope.levelLetters[i].letterBGnumber;
      $scope.levelScore.possiblePoints--;
    } else {
      $scope.levelLetters[i].show = false;
    }
  };

  $scope.acceptAnswer = function() {
    var i = $scope.levelAnswerIndex;
    $scope.showCollectAnswerPanel = false;

    // Animate Letter to Hive opening
    $timeout(function(){
      $scope.levelLetters[i].letterLeft = ($scope.levelLetters[i].flowerLeft - 89) * -1;
      // TODO:
      //   Use Classes to position / animate answer over to hive
      //   Bee should make BeeLine to hive so we don't have to worry about syncing ups and downs of Bee + Answer 
    }, 500);
    
    // Trigger hive ungulation here
    $timeout(function(){
      $scope.collectedLetters.push($scope.levelLetters[i]);
    }, 2000);
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

    for ( var i=0; i < 8; i++ ) {
      $scope.levelLetters.push({
        "letter": (level.name !== "digraph") ? possible.charAt($rootScope.genRanNum(possible.length)) : $scope.determineDigraph(possible),
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

  $scope.determineDigraph = function(possible) {
    var isdigraph = $scope.genRanNum(100) < 50;
    if (isdigraph) {
      return possible[$rootScope.genRanNum(possible.length)];
    } else {
      possible = $scope.answerLegend.lowercase;
      return possible.charAt($rootScope.genRanNum(possible.length)) + possible.charAt($rootScope.genRanNum(possible.length));
    }
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
    return possiblePoints;
  };
});
