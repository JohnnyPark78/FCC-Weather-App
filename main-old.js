var weatherObj = {};

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(function(position){  
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?APPID=2c724cdb2b1e676c65f7bcaf116fb543&lat=" + lat + "&lon=" + lon,
            dataType: "jsonp",
            success: function(response){
                weatherObj = response;
            }
        }).done(function(){
            var bg = "";
            var weather1 = [200,201,202,210,211,212,221,230,231,232,906];
            var weather2 = [300,301,302,310,311,312,313,314,321,500,501,520,521,502,503,504,522,531,511,615,616,611,612];
            var weather3 = [600,601,620,621,602,622];
            var weather4 = [800];
            var weather5 = [801,802,803,804];
            var weather6 = [951,952,953,954,955,956];
            var weather7 = [781,900,901,902,905,906,957,958,959,960,961,962];
            var weather8 = [701,731,741,751,761,771,711,721,762];
            var weather9 = [903];
            var weather10 = [904];

            if(weather1.includes(weatherObj.weather[0].id)){bg = "thunderstorm";}
            if(weather2.includes(weatherObj.weather[0].id)){bg = "rain";}
            if(weather3.includes(weatherObj.weather[0].id)){bg = "snow";}
            if(weather4.includes(weatherObj.weather[0].id)){bg = "clear";}
            if(weather5.includes(weatherObj.weather[0].id)){bg = "cloudy";}
            if(weather6.includes(weatherObj.weather[0].id)){bg = "wind";}
            if(weather7.includes(weatherObj.weather[0].id)){bg = "severe";}
            if(weather8.includes(weatherObj.weather[0].id)){bg = "haze";}
            if(weather9.includes(weatherObj.weather[0].id)){bg = "hot";}
            if(weather10.includes(weatherObj.weather[0].id)){bg = "cold";}
            var weatherBG = 'url("http://res.cloudinary.com/johnnypark78/image/upload/v1489019301/weather/' + bg + '.jpg")';
            $(".bg").css('background-image', weatherBG);
            $(".location").html(weatherObj.name + ", " + weatherObj.sys.country);
            $("#tempF").html(Math.round((weatherObj.main.temp * 9 /5) - 459.67) + "&deg;");
            $("#tempC").html(Math.round(weatherObj.main.temp - 273.15) + "&deg;");
            $("#f").html("F / ");
            $("#c").html("C");
            $(".weather-desc").html(weatherObj.weather[0].description);
            var winDir = ["NNE","NE","ENE","E","ESE", "SE", "SSE", "S", "SSW", "SW","WSW", "W","WNW","NW", "NNW"]
            var windDeg = weatherObj.wind.deg;
            var windCard = "";
            if(windDeg < 11.25 || windDeg > 348.75){
                windCard = "N";
            } else {
                windCard = winDir[Math.floor((windDeg-11.25)/22.5)];
            }
            $(".windDirection").html("Wind " + windCard);
            $("#windSpeedM").html(" " + Math.round(weatherObj.wind.speed) + " mph");
            $("#windSpeedK").html(" " + Math.round(weatherObj.wind.speed * 1.6093440) + " kph");
            $(".humidity").html("Humidity " + weatherObj.main.humidity + "&#37;");
            var sunrise = new Date(weatherObj.sys.sunrise * 1000);
            $(".sunrise").html("Sunrise " + sunrise.getHours() + ":" + sunrise.getMinutes() + " AM");
            var sunset = new Date(weatherObj.sys.sunset * 1000);
            $(".sunset").html("Sunset " + (sunset.getHours()-12) + ":" + sunset.getMinutes() + " PM");
            var updated = new Date(weatherObj.dt * 1000);
            $(".updated").html("Last updated " + updated.toLocaleDateString() + " @ " + updated.toLocaleTimeString());

        });
    });

    $(".units").on("click", function(){
        $("#tempF").toggleClass("hide-me");
        $("#tempC").toggleClass("hide-me");
        $("#f").toggleClass("inactive-units");
        $("#c").toggleClass("inactive-units");
        $("#windSpeedM").toggleClass("hide-me");
        $("#windSpeedK").toggleClass("hide-me");
    });     
})