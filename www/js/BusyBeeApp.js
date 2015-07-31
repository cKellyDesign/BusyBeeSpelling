var BusyBeeSpelling = angular.module('BusyBeeSpelling', ['ngCordova']);

BusyBeeSpelling.run(function($rootScope, $timeout){ 
  $rootScope.state = {
    "levelSelectControl" : true,
    "levelControl" : false
  };

  $rootScope.currentLevel = "";
  $rootScope.levelWidth = "100%";
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

  // Vars and Funcs to Manipulate Busy Bee
  $scope.busyBee = {
    "left": 50,
    "top": 10,
    "faceLeft": false,

    move: function(beeTop, beeLeft) {
      this.top = beeTop;
      this.left = beeLeft - 89;
    },

    takeAnswerToHive: function() {
      // todo: Somehow get window to animated scroll with busyBee, or get every thing else to scroll around busyBee
      var currLeft = this.left;
      var currTop = this.top;
      var currX = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
      this.faceLeft = true;
      this.top = 70;
      this.left = 90;
      // console.log("current Scroll X position: ", currX);
      $timeout(function(){
        $scope.busyBee.top = currTop;
        $scope.busyBee.left = currLeft;
        $scope.busyBee.faceLeft = false;
      }, 3000);
    },

    refresh: function() {
      this.top = 10;
      this.left = 50;
      this.faceLeft = false;
    }
  };

  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );

  $scope.hiveClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.srcElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.srcElement.offsetTop + e.offsetY;
    var index = angular.element(e.srcElement).parent();
    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.backgroundClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.offsetX * 2;
    var clickTop = e.offsetY;
    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.flowerClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.srcElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.srcElement.offsetTop + e.offsetY;
    var index = angular.element(e.srcElement).parent();
    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.letterClick = function(e, i) {
    e.stopPropagation();
    var clickLeft = e.srcElement.offsetLeft + e.srcElement.parentElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.srcElement.offsetTop + e.srcElement.parentElement.offsetTop + (e.offsetY * 2) - 100;

    $scope.busyBee.move(clickTop, clickLeft);
    $timeout(function(){
      $scope.checkAnswer(i);
    }, 1000);
  };

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
    $scope.refreshLevel(true);
  };

  $scope.refreshLevel = function(isDifferentLevel) {
    $scope.levelLetters = [];
    $scope.collectedLetters = [];
    $scope.levelScore.points = 0;
    $scope.busyBee.refresh();
    $rootScope.levelWidth = "100%";
    $scope.showCollectAnswerPanel = false;
    $scope.collectedAnswer = "";

    if (!isDifferentLevel) {
      $scope.generateLetters($rootScope.currentLevel);
      window.scroll(0,0);
    }
  };

  $scope.generateLetters = function(level) {
    if (!level) return;

    $scope.currentLevel = level;
    var possible = $scope.letterLegend[level.name];
    var flowerHeightCap = window.innerHeight - 250;
    var notToRepeat = [];
    var thisAnswer;

    for ( var i=0; i < 8; i++ ) {
      thisAnswer = (level.name !== "digraph") ? 
          possible.charAt($rootScope.genRanNum(possible.length)) : 
          $scope.determineDigraph(possible);

      if ( notToRepeat.indexOf(thisAnswer) !== -1 ) {
        i--;
        continue;
      } else {
        notToRepeat.push(thisAnswer);
      }

      $scope.levelLetters.push({
        "letter": thisAnswer,
        "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
        "flowerLeft": i === 0 ? 200 : $scope.levelLetters[i - 1].flowerLeft + $rootScope.genRanNum(350, 250),
        "flowerBottom": $rootScope.genRanNum(flowerHeightCap, 50),
        "letterLeft": $rootScope.genRanNum(66,33),
        "letterBottom": $rootScope.genRanNum(80, 50),
        "letterBGnumber": $rootScope.genRanNum(4,1),
        "show": true
      });
    }

    var lastFlower = $scope.levelLetters[$scope.levelLetters.length - 1];
    $rootScope.levelWidth = (($scope.levelLetters[$scope.levelLetters.length - 1].flowerLeft + 400) / 2) + "px";
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
