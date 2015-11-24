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

  //$rootScope.levels = [{
  //  "name": "lowercase",
  //  "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
  //  "letterLeft": $rootScope.genRanNum(66,33),
  //  "letterBottom": $rootScope.genRanNum(80, 50),
  //  "letterBGnumber": $rootScope.genRanNum(4,1)
  //}, {
  //  "name": "diagraph",
  //  "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
  //  "letterLeft": $rootScope.genRanNum(66,33),
  //  "letterBottom": $rootScope.genRanNum(80, 50),
  //  "letterBGnumber": $rootScope.genRanNum(4,1)
  //}, {
  //  "name": "vowel",
  //  "flowerClass": $rootScope.flowerLegend[$rootScope.genRanNum($rootScope.flowerLegend.length)],
  //  "letterLeft": $rootScope.genRanNum(66,33),
  //  "letterBottom": $rootScope.genRanNum(80, 50),
  //  "letterBGnumber": $rootScope.genRanNum(4,1)
  //}];

  $rootScope.newLevels = [
    {
      "name": "level1",
      "challenges": [
        {
          "goal": "Find the uppercase Vowels",
          "slug": "upVow",
          "introMsg": "Uppercase Vowels",
          "sound": "sound/uppercase-vowels.wav",
          "hint": "AEIOU",
          "icon": "imgs/navIcons/uppercase-vowels.png",
          "passes": 0
        },
        {
          "goal": "Find the lowercase Vowels",
          "slug": "lowVow",
          "introMsg": "Lowercase Vowels",
          "sound": "sound/lowercase-vowels.wav",
          "hint": "aeiou",
          "icon": "imgs/navIcons/lowercase-vowels.png",
          "passes": 0
        },
        {
          "goal": "Find the uppercase Consonants",
          "slug": "upCons",
          "introMsg": "Uppercase Consonants",
          "sound": "sound/uppercase-consonants.wav",
          "icon": "imgs/navIcons/uppercase-consonants.png",
          "hint": "BCDFG",
          "passes": 0
        },
        {
          "goal": "Find the lowercase Consonants",
          "slug": "lowCons",
          "introMsg": "Lowercase Consonants",
          "sound": "sound/lowercase-consonants.wav",
          "hint": "bcdfg",
          "icon": "imgs/navIcons/uppercase-consonants.png",
          "passes": 0
        }
      ]
    }, 
    {
      "name": "level2",
      "challenges": [
        {
          "goal": "Find the Vowels",
          "slug": "mixVow",
          "introMsg": "Vowels",
          "sound": "sound/vowels.wav",
          "hint": "AaEeIiOoUu",
          "icon": "imgs/navIcons/mixed-vowels.png",
          "passes": 0
        },
        {
          "goal": "Find the Consonants",
          "slug": "mixCons",
          "introMsg": "Consonants",
          "sound": "sound/consonants.wav",
          "hint": "BbCcDdFfGg",
          "icon": "imgs/navIcons/mixed-consonants.png",
          "passes": 0
        }
      ]
    },
    {
      "name": "level3",
      "challenges": [
        {
          "goal": "Find the Digraphs",
          "slug": "dig",
          "introMsg": "Digraphs",
          "sound": "sound/diagraphs.wav",
          "hint": "sh ch st th wh",
          "icon": "imgs/navIcons/diagraphs.png",
          "passes": 0
        },
        {
          "goal": "Find the Blends",
          "slug": "blend",
          "introMsg": "Blends",
          "sound": "sound/blends.wav",
          "hint": "bl fl str sw sk",
          "icon": "imgs/navIcons/blends.png",
          "passes": 0
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
    "vowel" : "abcdefghijklmnopqrstuvwxzaeiouaeiouaeiouaeiou",
    "consonant": "bcaeioudfghjklaeioumnpqraeioustvwxzaeiou",
    "numbers": "1!2@3#4$5%6^7&8*9(0)11-12+13=14/15ab16cd17ef18uo19ij20kl",
    "diagraph": ["th", "ch", "sh", "ph"],

    "upVow": "ABCDEFGHIJKLMNOPQRSTUVWXZAEIOUAEIOUAEIOUAEIOU",
    "lowVow": "abcdefghijklmnopqrstuvwxzaeiouaeiouaeiouaeiou",
    "lowCons": "bcaeioudfghjklaeioumnpqraeioustvwxzaeiou",
    "upCons": "BCAEIOUDFGHJKLAEIOUMNPQRAEIOUSTVWXZAEIOU",
    "mixVow": "ABCDEFGHIJKLMNOPQRSTUVWXZAEIOUAEIOUAEIOUAEIOUabcdefghijklmnopqrstuvwxzaeiouaeiouaeiouaeiou",
    "mixCons": "bcaeioudfghjklaeioumnpqraeioustvwxzaeiouBCAEIOUDFGHJKLAEIOUMNPQRAEIOUSTVWXZAEIOU",
    "dig": ["st", "sh", "ch", "th", "wh", "ph", "ee", "ea", "ow", "ng", "ck"],
    "blend": ["fl", "bl", "cl", "sl", "pl", "bl", "gr", "tr", "br", "cr", "dr", "fr", "wh", "str", "sw", "sp", "sc", "sn", "sm", "sk"]
  };

  // For checking clicked letters
  $scope.answerLegend = {
    "vowel" : "aeiou",
    "consonant": "bcdfghjklmnpqrstvwxz",
    "numbers": "1234567890",
    "lowercase": "abdefghijlnqrt",
    "uppercase": "ABDEFGHIJLNQRT",
    "diagraph": ["th", "ch", "sh", "ph", "wh", "tch", "kn", "gh"],

    "lowVow": "aeiou",
    "upVow": "AEIOU",
    "upCons": "BCDFGHJKLMNPQRSTVWXZ",
    "lowCons": "bcdfghjklmnpqrstvwxz",
    "mixVow": "aeiouAEIOU",
    "mixCons": "BCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxz",
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
  // ***** Level Contants / States *****



  // ***** Level Difficulty Controll ***** 
  // $scope.currentLevel = $rootScope.newLevels[0].challenges[$rootScope.genRanNum(($rootScope.newLevels[0].challenges.length - 1), 0)];
  $scope.currentLevel = $rootScope.newLevels[0].challenges[0]; 
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
      $scope.currentLevel = $rootScope.newLevels[this.currentLevelIndex].challenges[this.currentChallengeIndex];
    },
    determineLevel: function(){
      if ($scope.levelScore.strikes) {
        $rootScope.newLevels[this.currentLevelIndex].challenges[this.currentChallengeIndex].passes = 0;
      } else {
        $rootScope.newLevels[this.currentLevelIndex].challenges[this.currentChallengeIndex].passes++;
      }

      $scope.possibleChallenges = this.getPossibleChallenges();

      if (!$scope.possibleChallenges.length) {
        this.currentLevelIndex++;
        $scope.possibleChallenges = this.getPossibleChallenges();
      }

      var num = $rootScope.genRanNum(($scope.possibleChallenges.length - 1), 0);

      var newChallenge = $scope.possibleChallenges[num];
      this.setNewChallenge(newChallenge);
    },
    getPossibleChallenges: function() {
      var possibleChallenges = [];
      $.each($rootScope.newLevels[$scope.levelDifficultyControl.currentLevelIndex].challenges, function(i, thisLevel){
        if (thisLevel.passes < 1) { // todo: change 1 to 3 to make users pass the challenge 3x before next level
          possibleChallenges.push(thisLevel);
        }
      });
      return possibleChallenges;
    },
    setNewChallenge: function(newChallenge) {
      for (var i = 0; i < $rootScope.newLevels[$scope.levelDifficultyControl.currentLevelIndex].challenges.length; i++) {
        if ( $rootScope.newLevels[$scope.levelDifficultyControl.currentLevelIndex].challenges[i].slug === newChallenge.slug ) {
          $scope.levelDifficultyControl.currentChallengeIndex = i;
        }
      }
      this.setCurrentLevel();
    }
  };
  $scope.possibleChallenges = $scope.levelDifficultyControl.getPossibleChallenges();
  // ***** Level Difficulty Controll *****



  // ***** Busy Bee Control *****
  $scope.busyBee = {
    "left": 50,
    "top": 10,
    "faceLeft": false,
    "zoom": $('#character').css('zoom'),
    move: function(beeTop, beeLeft) {
      this.top = beeTop - 110;
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
       console.log("current Scroll X position: ", currX);
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

  $scope.backgroundClick = function(e) {
    e.stopPropagation();

    var clickLeft = e.offsetX / $scope.busyBee.zoom;
    var clickTop = e.offsetY / $scope.busyBee.zoom;

    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.flowerClick = function(e) {
    e.stopPropagation();

    var flowerZoom = $(e.currentTarget).css('zoom');

    // var clickLeft = ((determin displayed equivielent of flowerLeft) + click offset from left edge of flower) / adjust for scale of bee;
    var clickLeft = ((e.currentTarget.offsetLeft * flowerZoom) + e.offsetX) / $scope.busyBee.zoom;
    var clickTop = ((e.currentTarget.offsetTop * flowerZoom) + e.offsetY) / $scope.busyBee.zoom;

    $scope.busyBee.move(clickTop, clickLeft);
  };

  $scope.letterClick = function(e, i) {
    e.stopPropagation();
    if (!$scope.canCollectLetter) {
      return;
    }
    $scope.canCollectLetter = false;

    var flower = e.currentTarget.parentElement;
    var letter = e.currentTarget;
    var flowerZoom = $(flower).css('zoom');
    var letterZoom = $(letter).css('zoom');

    var clickLeft = ((letter.offsetLeft * letterZoom) + (flower.offsetLeft * flowerZoom) + e.offsetX) / $scope.busyBee.zoom;
    var clickTop = ((letter.offsetTop * letterZoom) + (flower.offsetTop * flowerZoom) + e.offsetY) / $scope.busyBee.zoom;

    $scope.busyBee.move(clickTop, clickLeft);
    $timeout(function(){
      $scope.checkAnswer(i);
    }, 1000);
  };

  $scope.selectLevel = function(challenge) {
    $scope.levelDifficultyControl.setNewChallenge(challenge);
    $scope.refreshLevel();
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

  $scope.onMenuOpen = function() {
    $('.in-level-menu').addClass('open');
    $('.menu-panel').addClass('open');
  };

  $scope.onMenuClose = function() {
    $('.in-level-menu').removeClass('open');
    $('.open').removeClass('open');
  };
  // ***** Handlers *****



  // ***** Letter Collection *****
  $scope.canCollectLetter = true;
  $scope.checkAnswer = function(i) {
    var answerVal = $scope.levelLetters[i].letter;
    $scope.collectedAnswerBG = $scope.levelLetters[i].letterBGnumber;
    $scope.collectedAnswer = answerVal;

    if ( $scope.answerIsCorrect(answerVal) ) {
      $scope.levelScore.possiblePoints--;
      //$scope.takeAnswerToHive(i);
      $scope.acceptAnswer(i);
    } else {
      // Show Answer Panel with true
      $scope.levelScore.strikes++;
      $scope.showCollectAnswerPanel = true;      
      $scope.levelLetters[i].show = false;
      $scope.canCollectLetter = true;
      $('#wrongAnswerSound').attr('src', 'sound/nope-try-again.wav');
      document.getElementById('wrongAnswerSound').play();
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
      // Move this to NEW FUNCTION ?
      $('#hiveTubeSound').attr('src', 'sound/honeyTube.mp3');
      document.getElementById('hiveTubeSound').play();
    }, 500);
    
    // Trigger hive ungulation here
    $timeout(function(){
      $scope.collectedLetters.push($scope.levelLetters[i]);
      $( ".hivetubeMove" ).hide();
      $( ".hivetube" ).show();
      $scope.canCollectLetter = true;
      if ( !$scope.levelScore.possiblePoints) { // todo: fix multiple calls when answers are collected too quickly
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
    $scope.onMenuClose();
    $scope.generateLetters();
    // $scope.introLevel();

    window.scroll(0,0);
  };
  $scope.introLevel = function() {
    // show level start panel w/ message
    $scope.showIntroPanel = true;
    $scope.busyBee.move(50, 50);
    // console.log("1 - ", $scope.currentLevel);
    $scope.playLevelIntroSounds();

    $timeout(function(){
      $scope.showIntroPanel = false;
    }, 3500);
    // play level audio, callback => display play button
    // timer after audio launches into level screen
  };
  $scope.concludeLevel = function(){
    //alert("CONGRATULATIONS!!");
    $scope.showSuccessPanel = true;
    $scope.busyBee.move(50, 50);
    $timeout(function(){
      $scope.showSuccessPanel = false;
      $scope.levelDifficultyControl.determineLevel();
      $scope.refreshLevel();
      // todo: we can initialize some level complete screen if statement
    }, 4000);
    // Move this to NEW FUNCTION ?
    $('#successSound').attr('src', 'sound/UgotIt.wav');
    document.getElementById('successSound').play();

  };
  $scope.playLevelIntroSounds = function () {
    var numSound = "";
    switch ($scope.levelScore.possiblePoints) {
      case 3 :
        numSound = "three.wav";
        break;
      case 4 :
        numSound = "four.wav";
        break;
      case 5 :
        numSound = "five.wav";
        break;
    }
    function swapSoundSrc () {
      $('#introSound').attr('src', $scope.currentLevel.sound);
      $('#introSound')[0].play();
      $('#introSound').off("ended", swapSoundSrc);
    }
    $('#introSound').attr('src', "sound/" + numSound);
    $('#introSound')[0].play();
    $('#introSound').on("ended", swapSoundSrc);
  };
  // ***** Level Flow *****



  // ***** Letter Control *****
  $scope.generateLetters = function() {
    $scope.levelLetters = [];
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
