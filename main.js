var weatherObj = {};
var lat,lon;

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(function(position){  
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        $.ajax({
            type: "GET",
            url: "https://api.apixu.com/v1/current.json?key=aff4c3d8fe1c4399a4e42729170903&q=" + lat + "," + lon,
            dataType: "json",
            success: function(response){
                weatherObj = response;
            }
        }).done(function(){
            var bg = "";
            var weather1 = [1087,1246,1273,1276];
            var weather2 = [1063,1072,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1204,1207,1240,1243,1249,1252];
            var weather3 = [1066,1069,1114,1117,1210,1213,1216,1219,1222,1225,1237,1255,1258,1279,1282];
            var weather4 = [1000];
            var weather5 = [1003,1006,1009];
            var weather8 = [1030,1135,1147];
            var weather10 = [1261,1264];
            if(weather1.includes(weatherObj.current.condition.code)){bg = "thunderstorm";}
            if(weather2.includes(weatherObj.current.condition.code)){bg = "rain";}
            if(weather3.includes(weatherObj.current.condition.code)){bg = "snow";}
            if(weather4.includes(weatherObj.current.condition.code)){bg = "clear";}
            if(weather5.includes(weatherObj.current.condition.code)){bg = "cloudy";}
            if(weather8.includes(weatherObj.current.condition.code)){bg = "haze";}
            if(weather10.includes(weatherObj.current.condition.code)){bg = "cold";}
            var weatherBG = 'url("http://res.cloudinary.com/johnnypark78/image/upload/v1489019301/weather/' + bg + '.jpg")';
            $(".bg").css('background-image', weatherBG);
            $("#city").html(weatherObj.location.name);
            $("#state").html(", " + weatherObj.location.region);
            $("#tempF").html(weatherObj.current.temp_f);
            $("#tempC").html(weatherObj.current.temp_c);
            $("#f").html("F ");
            $("#c").html(" C");
            $("#slash").html("/")
            $("#weather-img").html("<img src='https:" + weatherObj.current.condition.icon + "'>");
            $(".weather-desc").html(weatherObj.current.condition.text);
            $("#windDirection").html("Wind " + weatherObj.current.wind_dir + " ");
            $("#windSpeedM").html(weatherObj.current.wind_mph + "mph");
            $("#windSpeedK").html(weatherObj.current.wind_kph + "kph");
            $("#humidity").html("Humidity " + weatherObj.current.humidity + "&#37;");
            $("#pressureIn").html("Pressure " + weatherObj.current.pressure_in + "in");
            $("#pressureMb").html("Pressure " + weatherObj.current.pressure_mb + "mb");
            $("#precipIn").html("Precipitation " + weatherObj.current.precip_in + "in");
            $("#precipCm").html("Precipitation " + weatherObj.current.precip_mm / 100 + " cm");
            $("#visM").html("Visibility " + weatherObj.current.vis_miles + "mi");
            $("#visK").html("Visibility " + weatherObj.current.vis_km + "km");
        });
    });
 
    $(".units").on("click", function(){
        $("#tempF").toggleClass("hide-me");
        $("#tempC").toggleClass("hide-me");
        $("#f").toggleClass("inactive-units");
        $("#c").toggleClass("inactive-units");
        $("#windSpeedM").toggleClass("hide-me");
        $("#windSpeedK").toggleClass("hide-me");
        $("#pressureIn").toggleClass("hide-me");
        $("#pressureMb").toggleClass("hide-me");
        $("#precipIn").toggleClass("hide-me");
        $("#precipCm").toggleClass("hide-me");
        $("#visM").toggleClass("hide-me");
        $("#visK").toggleClass("hide-me");

    });    

});