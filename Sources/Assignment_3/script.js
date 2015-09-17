var AddressBook = angular.module('AddressBook', []);

AddressBook.controller('PersonController', function ($scope) {
  
});

function LoginController($scope) {
    "use strict";
    $scope.logins = [];
    $scope.login = function (user, pwd) {
        localStorage.setItem("name", user);
        $scope.logins.push(localStorage.getItem("name") + " was logged in.");
    };
}

/*weather*/



function clickEvent(){
    
}