// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services'])

.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
})

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller("RegisterController", function ($scope, MongoRESTService, $http, $httpParamSerializerJQLike, LoginThing) {

    $scope.pageClass = 'register';
//    $scope.register = function (username, password, email) {
//        console.log("inside login function");
//        $http({
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            url: 'https://api.mongolab.com/api/1/databases/lab7/collections/users?apiKey=C3gXPpycyrwWjXzCd11nzyXWl5HDM_gf',
//            data: JSON.stringify({
//                name: username,
//                password: password,
//                email: email
//            }),
//            contentType: "application/json"
//        }).success(function () {
//            $scope.userName = "";
//            $scope.password = "";
//            $scope.email = "";
//
//            $scope.msg = "User created successfully";
//        })
//    }

    $scope.register = function(data) {
        var id = MongoRESTService.register(data);
        console.log("id", id);
    }
    
    $scope.loginMeow = function (username, password) {
            console.log("logins", username);
            var result = MongoRESTService.login(username, password, function (result) {
                console.log("result", result);
                if (result.length = 1){
                    $scope.msg = "user logged in";
                    console.log("login success");
                }
                else{
                    alert("check your credentials");
                }
            })
        };
        //        $scope.loginMeow = function (username, password) {
        //            LoginThing.getLogins().then(function (logins) {
        //                console.log("logins", logins);
        //                var allLogs = logins.data;
        //
        //                console.log("$scope.user is " + $scope.userName);
        //
        //                for (var i = 0; i < allLogs.length; i++) {
        //                    var loginGuy = allLogs[i];
        //                    if ($scope.userName == loginGuy.name) {
        //                        if ($scope.password == loginGuy.password) {
        //
        //                            $scope.uID = loginGuy['_id']['$oid'];
        //
        //                        } else {
        //                            window.alert("Password Incorrect");
        //                            break;
        //                        }
        //                    } else {
        //                        window.alert("No user with that name registered");
        //                    }
        //                }
        //            })
        //        };

    $scope.updateEmail = function (uid, email) {

        LoginThing.updateEmail($scope.uID, $scope.userName, $scope.newEmail);
        $scope.updateE = "User's email address has been updated";

    }

    $scope.deleteUser = function (uid) {
        LoginThing.deleteUser($scope.uID);
        $scope.deletedU = "User has been deleted";
    }
})


.factory('LoginThing', function ($http) {
    var logins = [];
    var baseURL = "https://api.mongolab.com/api/1";
    var apiKey = "apiKey=C3gXPpycyrwWjXzCd11nzyXWl5HDM_gf";
    return {
        getLogins: function () {
            return $http.get(baseURL + '/databases/lab7/collections/users?' + apiKey).then(function (response) {
                console.log("resp", response);
                logins = response;
                return logins;
            });
        },
        updateEmail: function (uid, userName, newEmail) {
            $http({
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-origin': true
                },
                url: baseURL + '/databases/lab7/collections/users/' + uid + '?apiKey=C3gXPpycyrwWjXzCd11nzyXWl5HDM_gf',
                method: 'PUT',
                data: JSON.stringify({
                    "$set": {
                        email: newEmail
                    }
                }),
                contentType: "application/json"
            }).success(function (response) {
                console.log("responseupdate", response);

                return;
            });
        },
        deleteUser: function (uid) {
            $http({
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-origin': true
                },
                url: baseURL + '/databases/lab7/collections/users/' + uid + '?apiKey=C3gXPpycyrwWjXzCd11nzyXWl5HDM_gf',
                method: 'DELETE',
                contentType: "application/json"
            }).success(function (response) {
                console.log("responseDEL", response);
                return;
            });
        }
    }
});