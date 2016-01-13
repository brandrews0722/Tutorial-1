var service = angular.module("starter.services", []);

var url = "http://127.0.0.1:8080/MongoRestApp/user";

service.factory("MongoRESTService", function($http) {
    return{
        login: function (username, password, callback){
            var res = $http.get(url + "?name=" + username + "&password=" + password);
            res.success(function(data, status, headers, config){
                console.log("logindata", data);
                callback(data);
            });
            res.error(function(data, status, headers, config){
                console.log("loginerror", data);
            });
        },
        register: function(user){
            console.log("loginregisteruser", user);
            var res = $http.post(url, user);
            
            res.success(function(data, status, headers, config){
                console.log("registersuccess", data);
            });
            
            res.error(function(data, status, headers, config){
                console.log("registerfail", data);
            });
        }
    }
});