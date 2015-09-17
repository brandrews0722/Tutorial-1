/*jslint browser: true*/
/*global $, jQuery, alert*/

jQuery(document).ready(function ($) {

    /* Edit these variables */
    "use strict";
    var api = "2ea138a9dd52eabe";
    var state = "MO";
    var city = document.getElementsByClassName("inLeft").value;

    $.ajax({
        url: "http://api.wunderground.com/api/" + api + "/forecast/conditions/q/" + state + "/" + city + ".json",
        dataType: "jsonp",
        success: function (parsed_json) {
            /*var icon_url_json = "http://icons.wxug.com/i/c/f/" + parsed_json['current_observation']['icon'] + ".gif";
            var icon_json = '<img src ="' + icon_url_json + '" />';
            var temp_json = parsed_json['current_observation']['temp_f'];
            temp_json += "<span>°F</span>";*/
            var condition_json = parsed_json['current_observation']['weather'];
            /*var real_feel_json = "Feels Like " + parsed_json['current_observation']['feelslike_f'] + "°F";
            var wind_json = 'Winds are ' + parsed_json['current_observation']['wind_string'];
            var location_json = city + ', ' + state;*/

            
            document.getElementById("condition").innerHTML = condition_json;

            /*document.getElementById("weather-icon").innerHTML = icon_json;
            document.getElementById("temp").innerHTML = temp_json;
            
            document.getElementById("real-feel").innerHTML = real_feel_json;
            document.getElementById("wind").innerHTML = wind_json;
            document.getElementById("location").innerHTML = location_json;*/


        }
    });
});