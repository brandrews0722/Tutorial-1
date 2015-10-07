// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

.controller('MapCtrl', function ($scope, $http) {
            var map;
            var mapOptions;
            var KCMO = new google.maps.LatLng(39.091919, -94.5757195);
            $scope.initialize = function () {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: KCMO,
                    zoom: 11
                })


            };
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
});