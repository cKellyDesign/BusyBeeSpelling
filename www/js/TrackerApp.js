var TrackerApp = angular.module('trackerApp', ['ngCordova']);
TrackerApp.run(function($rootScope){ });
TrackerApp.controller('controlTest', function($scope, $cordovaSQLite){
    $scope.message = "Hello World";

    document.addEventListener("deviceready", function () {
      console.log("HEEELOOOOO");
      // var db = $cordovaSQLite.openDB({ name: "my.db" });
      console.log("WOOOOORRRLLLDDD");
    }, false);
    // var db = $cordovaSQLite.openDB({ name: "conorsDB" });

    // $scope.execute = function() {
    //   var createTableQuery = "CREATE TABLE IF NOT EXISTS test_table";
    //   var addRedRowQuery = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    //   $cordovaSQLite.execute(db, addRedRowQuery, ["test", 100]).then(function (res){
    //     console.log("TRANSACTION SUCESS!!", res);
    //   }, function (err) {
    //     console.error(err);
    //   });
    // };
});