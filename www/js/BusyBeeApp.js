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

  $rootScope.levels = [{
    "name": "lowercase",
    "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
    "letterLeft": $rootScope.genRanNum(66,33),
    "letterBottom": $rootScope.genRanNum(80, 50),
    "letterBGnumber": $rootScope.genRanNum(4,1)
  }, {
    "name": "diagraph",
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

  $rootScope.newLevels = [
    {
      "name": "level1",
      "challenges": [
        {
          "goal": "Find the uppercase Vowels",
          "slug": "upVow",
          "introMsg": "Uppercase Vowels"
        },
        {
          "goal": "Find the lowercase Vowels",
          "slug": "lowVow",
          "introMsg": "Lowercase Vowels"
        },
        {
          "goal": "Find the uppercase Consonants",
          "slug": "upCons",
          "introMsg": "Uppercase Consonants"
        },
        {
          "goal": "Find the lowercase Consonants",
          "slug": "lowCons",
          "introMsg": "Lowercase Consonants"
        }
      ]
    }, 
    {
      "name": "level2",
      "challenges": [
        {
          "goal": "Find the Vowels",
          "slug": "mixVow",
          "introMsg": "Vowels"
        },
        {
          "goal": "Find the Consonants",
          "slug": "mixCons",
          "introMsg": "Consonants"
        }
      ]
    },
    {
      "name": "level3",
      "challenges": [
        {
          "goal": "Find the Digraphs",
          "slug": "dig",
          "introMsg": "Digraphs"
        },
        {
          "goal": "Find the Blends",
          "slug": "blend",
          "introMsg": "Blends"
        }
      ]
    }
  ]

});


BusyBeeSpelling.controller('levelSelectControl', function($scope, $rootScope, $timeout){
  $scope.message = "Busy Bee Spelling";

  $scope.levels = $rootScope.levels;
  

  $scope.selectLevel = function(level) {
    // $rootScope.currentLevel = level || $scope.levels[0];
    $rootScope.currentLevel = level || $rootScope.newLevels[0];
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
  };
});
//
//BusyBeeSpelling.controller('soundLoad', function($scope, $rootScope, $timeout){
//  $scope.currentLevel = "";
//  playStream: function() {
//  var myaudio = new Audio('../sound/consonants.mp3');
//    myaudio.id = 'playerMyAudio';
//    myaudio.play();
//  };
//  catch (e) {
//    alert('no audio support!');
//  };
//});

BusyBeeSpelling.controller('levelControl', function($scope, $rootScope, $timeout){
  $scope.showSuccessPanel = false;
  $rootScope.$watch('currentLevel',
    function(currentLevel){
      $scope.generateLetters(currentLevel);
    }
  );


  // ***** Level Contants / States *****
  // For Generating letters for the level
  $scope.letterLegend = {
    "lowercase" : "aAbBdDeEfFgGhHiIjJlLnNqQrRtTyY",
    "uppercase" : "aAbBdDeEfFgGhHiIjJlLnNqQrRtTyY",
    "vowel" : "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "consonant": "bcaeioudfghjklaeioumnpqraeioustvwxyzaeiou",
    "numbers": "1!2@3#4$5%6^7&8*9(0)11-12+13=14/15ab16cd17ef18uo19ij20kl",
    "diagraph": ["th", "ch", "sh", "ph"],

    "upVow": "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOU",
    "lowVow": "abcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "lowCons": "bcaeioudfghjklaeioumnpqraeioustvwxyzaeiou",
    "upCons": "BCAEIOUDFGHJKLAEIOUMNPQRAEIOUSTVWXYZAEIOU",
    "mixVow": "ABCDEFGHIJKLMNOPQRSTUVWXYZAEIOUAEIOUAEIOUAEIOUabcdefghijklmnopqrstuvwxyzaeiouaeiouaeiouaeiou",
    "mixCons": "bcaeioudfghjklaeioumnpqraeioustvwxyzaeiouBCAEIOUDFGHJKLAEIOUMNPQRAEIOUSTVWXYZAEIOU",
    "dig": ["st", "sh", "ch", "th", "wh", "ph", "ee", "ea", "ow", "ng", "ck"],
    "blend": ["fl", "bl", "cl", "sl", "pl", "bl", "gr", "tr", "br", "cr", "dr", "fr", "wh", "str", "sw", "sp", "sc", "sn", "sm", "sk"]
  };

  // For checking clicked letters
  $scope.answerLegend = {
    "vowel" : "aeiou",
    "consonant": "bcdfghjklmnpqrstvwxyz",
    "numbers": "1234567890",
    "lowercase": "abdefghijlnqrty",
    "uppercase": "ABDEFGHIJLNQRTY",
    "diagraph": ["th", "ch", "sh", "ph", "wh", "tch", "kn", "gh"],

    "lowVow": "aeiou",
    "upVow": "AEIOU",
    "upCons": "BCDFGHJKLMNPQRSTVWXYZ",
    "lowCons": "bcdfghjklmnpqrstvwxyz",
    "mixVow": "aeiouAEIOU",
    "mixCons": "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
    "dig": ["st", "sh", "ch", "th", "wh", "ph", "ee", "ea", "ow", "ng", "ck"],
    "blend": ["fl", "bl", "cl", "sl", "pl", "bl", "gr", "tr", "br", "cr", "dr", "fr", "wh", "str", "sw", "sp", "sc", "sn", "sm", "sk"]
  };

  // Level Score Keeping
  $scope.levelScore = {
    "points": 0,
    "strikes": 0,
    "possiblePoints": 0,
    "scoreToWin": 3
  };

  // For binding letters
  $scope.levelLetters = []; 
  $scope.collectedLetters = [];

  // Letter Collection Response Panel Vars
  $scope.showCollectAnswerPanel = false;
  $scope.collectedAnswer = "";
  $scope.levelAnswerIndex = 0;

  // Level Menu State
  $scope.menuIsOpen = false;
  // ***** Level Contants / States *****



  // ***** Level Difficulty Controll ***** 
  $scope.currentLevel = "";
  $scope.levelDifficultyControl = {
    "currentLevelIndex": 0,
    "currentChallengeIndex": 0,
    "currentCorrectStreak": 0,
    "challengesCap": 0,
    setChallengesCap: function() {
      this.challengesCap = $rootScope.newLevels[this.currentLevelIndex].challenges.length - 1;
    },
    increaseDifficulty: function() {
      // debugger;
      if ( this.currentChallengeIndex === 0 || this.currentChallengeIndex < this.challengesCap ) {
        this.currentChallengeIndex++;

      } else if ( this.currentChallengeIndex === this.challengesCap && this.currentLevelIndex < ($rootScope.newLevels.length - 1) ) {
        this.currentChallengeIndex = 0;
        this.currentLevelIndex++;
        this.setChallengesCap();

      } else {
        alert("You've completed all of the challenges! Let's go again!");
        this.currentLevelIndex = 0;
        this.currentChallengeIndex = 0;
        this.setChallengesCap();
      }
    },
    decreaseDifficulty: function() {

      if ( this.currentChallengeIndex > 0 ) {
        this.currentChallengeIndex--;

      } else if ( this.currentChallengeIndex === 0 && this.currentLevelIndex > 0 ) {
        this.currentLevelIndex--;
        this.setChallengesCap();
        this.currentChallengeIndex = this.challengesCap;

      } else {
        alert("We're as low as we go, try again!");
      }
    },
    setCurrentLevel: function(){
      $scope.currentLevel = $rootScope.newLevels[$scope.levelDifficultyControl.currentLevelIndex].challenges[$scope.levelDifficultyControl.currentChallengeIndex];
    }
  };
  // ***** Level Difficulty Controll *****



  // ***** Busy Bee Control *****
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
      $('html, body').animate({ scrollLeft: 0 }, 500);
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
        $('html, body').animate({ scrollLeft: currX }, 500);
      }, 3000);
    },
    refresh: function() {
      this.top = 10;
      this.left = 50;
      this.faceLeft = false;
    }
  };
  // ***** Busy Bee Control *****
  


  // ***** Handlers *****
  $scope.handleIncrease = function() {
    $scope.levelDifficultyControl.increaseDifficulty();
    $scope.refreshLevel();
  };

  $scope.handleDecrease = function() {
    $scope.levelDifficultyControl.decreaseDifficulty();
    $scope.refreshLevel();
  };

  $scope.hiveClick = function(e) {
    e.stopPropagation();
    var clickLeft = e.currentTarget.offsetLeft + (e.offsetX * 2);
    var clickTop = e.currentTarget.offsetTop + e.offsetY;
    var index = angular.element(e.currentTarget).parent();
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
    var clickLeft = e.currentTarget.offsetLeft + (e.offsetX * 2);
    var clickTop = e.currentTarget.offsetTop + e.offsetY;
    var index = angular.element(e.srcElement).parent();
    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.letterClick = function(e, i) {
    e.stopPropagation();
    var clickLeft = e.currentTarget.offsetLeft + e.currentTarget.parentElement.offsetLeft + (e.offsetX * 2);
    var clickTop = e.currentTarget.offsetTop + e.offsetY - 100;
    $scope.busyBee.move(clickTop, clickLeft);
    $timeout(function(){
      $scope.checkAnswer(i);
    }, 1000);
  };

  $scope.selectLevel = function(level) {
    $rootScope.currentLevel = level || $rootScope.levels[0];
    $rootScope.state.levelSelectControl = false;
    $rootScope.state.levelControl = true;
    $scope.refreshLevel(false);
  };

  $scope.backToMenu = function() {
    $rootScope.state.levelControl = false;
    $rootScope.state.levelSelectControl = true;
    $rootScope.currentLevel = "";
    $scope.refreshLevel(true);
  };

  $scope.closeAnswerPanel = function() {
    $scope.showCollectAnswerPanel = false;
  }
  // ***** Handlers *****



  // ***** Letter Collection *****
  $scope.checkAnswer = function(i) {
    var answerVal = $scope.levelLetters[i].letter; 

    if ( $scope.answerIsCorrect(answerVal) ) {
      $scope.collectedAnswer = answerVal;
      $scope.collectedAnswerBG = $scope.levelLetters[i].letterBGnumber;
      $scope.levelScore.possiblePoints--;
      $scope.acceptAnswer(i);
    } else {
      // Show Answer Panel with true
      $scope.levelScore.strikes++;
      $scope.showCollectAnswerPanel = true;      
      $scope.levelLetters[i].show = false;
      $scope.collectedAnswer = answerVal;
    }
  };

  $scope.acceptAnswer = function(i) {
    // Animate Letter to Hive opening
    $scope.levelLetters[i].letterLeft = ($scope.levelLetters[i].flowerLeft - 89) * -1;

    $timeout(function(){
      // TODO:
      //   Use Classes (.hivetubeMove = is animation for honey tube) to position / animate answer over to hive
      //   Bee should make BeeLine to hive so we don't have to worry about syncing ups and downs of Bee + Answer
      $( ".hivetubeMove" ).show();
      $( ".hivetube" ).hide();
    }, 500);
    
    // Trigger hive ungulation here
    $timeout(function(){
      $scope.collectedLetters.push($scope.levelLetters[i]);
      $( ".hivetubeMove" ).hide();
      $( ".hivetube" ).show();
      if ( !$scope.levelScore.possiblePoints ) {
        $scope.concludeLevel();
      }
    }, 2000);
  };
  // ***** Letter Collection *****



  // ***** Level Flow *****
  $scope.refreshLevel = function(isDifferentLevel) {
    $scope.levelLetters = [];
    $scope.collectedLetters = [];
    $scope.levelScore.points = 0;
    $scope.levelScore.strikes = 0;
    $scope.busyBee.refresh();
    $rootScope.levelWidth = "100%";
    $scope.showCollectAnswerPanel = false;
    $scope.collectedAnswer = "";
    $scope.menuIsOpen = false;
    $scope.levelDifficultyControl.setChallengesCap();
    $scope.generateLetters();
    // $scope.introLevel();

    if (!isDifferentLevel) {
      window.scroll(0,0);
    }
  };
  $scope.introLevel = function() {
    // show level start panel w/ message
    $scope.showIntroPanel = true;
    $scope.busyBee.move(50, 50);

    // Move this to NEW FUNCTION
    // $('#introSound').attr('src', 'sound/consonants.mp3');
    // document.getElementById('introSound').play();


    $timeout(function(){
      $scope.showIntroPanel = false;
    }, 3000);
    // play level audio, callback => display play button
    // timer after audio launches into level screen
  };
  $scope.concludeLevel = function(){
    //alert("CONGRATULATIONS!!"); // todo: we can initialize some level complete screen?
    $scope.showSuccessPanel = true;
    $scope.busyBee.move(50, 50);
    $timeout(function(){
      $scope.showSuccessPanel = false;

      $scope.refreshLevel(); // todo: change this to $rootScope.selectLevel(nextLevel)

    }, 3000);
    if ( $scope.levelScore.strikes ) {
      $scope.levelDifficultyControl.currentCorrectStreak = 0;

    } else {
      $scope.levelDifficultyControl.currentCorrectStreak++;

      if ( $scope.levelDifficultyControl.currentCorrectStreak === 3 ) {
        $scope.levelDifficultyControl.increaseDifficulty();
        $scope.levelDifficultyControl.currentCorrectStreak = 0;
      }
    }
  };
  // ***** Level Flow *****



  // ***** Letter Control *****
  $scope.generateLetters = function() {
    var level = $rootScope.newLevels[$scope.levelDifficultyControl.currentLevelIndex];
    $scope.levelLetters = [];
    $scope.currentLevel = level.challenges[$scope.levelDifficultyControl.currentChallengeIndex];
    // if ( !level || !$scope.currentLevel) debugger;
    var possible = $scope.letterLegend[$scope.currentLevel.slug];
    
    var flowerHeightCap = window.innerHeight - 250;
    var notToRepeat = [];
    var thisAnswer;

    for ( var i=0; i < 8; i++ ) {
      if ( ($scope.currentLevel.slug === "dig") || ($scope.currentLevel.slug === "blend") ) {
        thisAnswer = $scope.determineDiagraph(possible);        
      } else { 
        thisAnswer = possible.charAt($rootScope.genRanNum(possible.length));
      }
      if ( notToRepeat.indexOf(thisAnswer) !== -1 ) {
        i--;
        continue;
      } else if ( $scope.getPossiblePoints() > 4 && $scope.answerIsCorrect(thisAnswer) ) {
        notToRepeat.push(thisAnswer);
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
    $scope.levelScore.scoreToWin = $scope.levelScore.possiblePoints;

    if ($scope.levelScore.possiblePoints < 3 || $scope.levelScore.possiblePoints > 5) {
      $scope.generateLetters();
      return;
    }
    // Can you use this as a level fail buffer if desired
    // $scope.levelScore.scoreToWin = ($scope.levelScore.possiblePoints < 3) ? $scope.levelScore.possiblePoints : $scope.levelScore.scoreToWin;
    $scope.introLevel();
  };

  $scope.answerIsCorrect = function(toCheck) {
    return $scope.answerLegend[$scope.currentLevel.slug].indexOf(toCheck) !== -1;
  };

  $scope.determineDiagraph = function(possible) {
    var isdiagraph = $scope.genRanNum(100) < 50;
    if (isdiagraph) {
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
    var possibleAnswers = $scope.answerLegend[$scope.currentLevel.slug];
    // if (!possibleAnswers) debugger;
    for (i = 0; i < $scope.levelLetters.length; i++) {
      thisLetter = $scope.levelLetters[i].letter;
      thisLetterIsCorrect = possibleAnswers.indexOf(thisLetter) !== -1;
      if (thisLetterIsCorrect) {
        possiblePoints++;
      }
    }
    return possiblePoints;
  };
  // ***** Letter Control *****
});
