var userInputEl = document.querySelector("#user-input");
var buttonEl = document.querySelector("#button");
var searchHistorySectionEl = document.querySelector("#search-history");
var cityDateEl = document.querySelector("#city-and-date");
var tempEl = document.querySelector("temp");
var windEl = document.querySelector("wind");
var humidityEl = document.querySelector("humidity");
var uvIndexEl = document.querySelector("uv-index");
var currentDate = moment().format('MM/D/YYYY');
var sunnyImage = "assets/sun.png";


buttonEl.addEventListener('click', function(){
    console.log("Entry submitted");
    fetch("api.openweathermap.org/data/2.5/forecast?q=" + userInputEl.value + "&appid=3b952097e301819bade638b0b75441c5")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => alert("Ivalid city Name"));
});

var headersEL = [
    document.querySelector("#day-one"),
    document.querySelector("#day-two"),
    document.querySelector("#day-three"),
    document.querySelector("#day-four"),
    document.querySelector("#day-five")
];
var fiveDayContainersEL = [
    document.querySelector("#forecastOne"),
    document.querySelector("#forecastTwo"),
    document.querySelector("#forecastThree"),
    document.querySelector("#forecastFour"),
    document.querySelector("#forecastFive")
];
var images = [
    document.querySelector("#image-one"),
    document.querySelector("#image-two"),
    document.querySelector("#image-three"),
    document.querySelector("#image-four"),
    document.querySelector("#image-five")
];


var i = 0;
while(i<5){
    $(fiveDayContainersEL[i]).addClass("cloudy-conditions-theme");
    $(images[i]).attr("src", sunnyImage);
    
    var dayFuture = moment().add(i+1, "days").format("MM/D/YYYY");
    $(headersEL[i]).text(dayFuture);
    i++;
}
