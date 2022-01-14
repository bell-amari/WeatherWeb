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
var apiKey = "api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=6448bd8128588d7c43d52ab41e66cefb";
var city = "";
var temp = "";
var hummidity ="";
var wind = "";
var userInputForStoring = [""];

buttonEl.addEventListener('click', function(){
    console.log("Entry submitted");
    userInputForStoring[0] = userInputEl.value;
    saveInput();
    getData();
    console.log(apiKey);
});

function getData(){
    fetch(apiKey)
    .then(function(response){
        console.log(response);
        if(response.ok){
            response.json()
            .then(function(data){
                console.log(data);
            })
        }
    })
    .catch(e => alert("Error! Please Try Again..."));
}

function saveInput() {
    localStorage.setItem("Cities", JSON.stringify(userInputForStoring));
}

function retriveInputHistory(){
    var getJson = localStorage.getItem("Cities");
    if(getJson){
        var savedResponse = JSON.parse(getJson);
    }

    // console.log(savedResponse);
}

if (window.addEventListener) {
    window.addEventListener('load', retriveInputHistory, false);
} else if (window.attachEvent) { 
    window.attachEvent('onload', retriveInputHistory);
}


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
