
var userInputEl = document.querySelector("#user-input");
var buttonEl = document.querySelector("#button");
var searchHistorySectionEl = document.querySelector("#search-history");
var cityDateEl = document.querySelector("#city-and-date");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvIndexEl = document.querySelector("#uv-index");
var currentDate = moment().format('dddd, MM/D/YYYY');
const tempTag = "°F";
const humTag = "%";
const windTag = " mph";
const apiKeyWeather = "6448bd8128588d7c43d52ab41e66cefb";
var userInputForStoring = [""];
var city = "";
var temp = "";
var humidity = "";
var wind = "";
var uv = "";
var fiveDayTemp = [];
var fiveDayWind = [];
var fiveDayHumidity = [];
var fiveDayStatus = [];
var fiveDayImages = [];
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
var imagesEl = [
    document.querySelector("#image-one"),
    document.querySelector("#image-two"),
    document.querySelector("#image-three"),
    document.querySelector("#image-four"),
    document.querySelector("#image-five")
];
var fiveDayTempEl = [
    document.querySelector("#temp-one"),
    document.querySelector("#temp-two"),
    document.querySelector("#temp-three"),
    document.querySelector("#temp-four"),
    document.querySelector("#temp-five")
];
var fiveDayWindEl = [
    document.querySelector("#wind-one"),
    document.querySelector("#wind-two"),
    document.querySelector("#wind-three"),
    document.querySelector("#wind-four"),
    document.querySelector("#wind-five")
];
var fiveDayHumidityEl = [
    document.querySelector("#humidity-one"),
    document.querySelector("#humidity-two"),
    document.querySelector("#humidity-three"),
    document.querySelector("#humidity-four"), 
    document.querySelector("#humidity-five")
];

var i = 0;
while(i<5){
    $(fiveDayContainersEL[i]).addClass("default-conditions-theme");
    var dayFuture = moment().add(i+1, "days").format("dddd, MM/D/YYYY");
    $(headersEL[i]).text(dayFuture);
    
    $(fiveDayTempEl[i]).text(fiveDayTemp[i]);
    $(fiveDayWindEl[i]).text(fiveDayWind[i]);
    $(fiveDayHumidityEl[i]).text(fiveDayHumidity[i]);
    i++;
}

// Event listener looks out for clicks on input button
buttonEl.addEventListener('click', function(){
    getData();
    setTimeout(function(){
        arrangeData();
    }, 1000)
});

// Function fetches data from api
function getData(){
    // Getting Data for current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInputEl.value}&units=imperial&appid=${apiKeyWeather}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        city = data['name'];
        temp = data['main']['temp'];
        humidity = data['main']['humidity'];
        wind = data['wind']['speed'];
        lat = data['coord']['lat'];
        lon = data['coord']['lon'];
        getFiveDayData(lat, lon);
    })
    .catch(error => alert("Error! Please Try Again 1")); 
}

function getFiveDayData(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKeyWeather}`)
    .then(response => response.json())
    .then(data => {
        uv = data['current']['uvi'];
        fiveDayTemp = [
            data['daily'][0]['temp']['day'],
            data['daily'][1]['temp']['day'],
            data['daily'][2]['temp']['day'],
            data['daily'][3]['temp']['day'],
            data['daily'][4]['temp']['day']
        ];

        fiveDayWind = [
            data['daily'][0]['wind_speed'],
            data['daily'][1]['wind_speed'],
            data['daily'][2]['wind_speed'],
            data['daily'][3]['wind_speed'],
            data['daily'][4]['wind_speed']
        ];
        fiveDayHumidity = [
            data['daily'][0]['humidity'],
            data['daily'][1]['humidity'],
            data['daily'][2]['humidity'],
            data['daily'][3]['humidity'],
            data['daily'][4]['humidity']
        ];
        fiveDayStatus = [
            data['daily'][0]['weather'][0]['id'],
            data['daily'][1]['weather'][0]['id'],
            data['daily'][2]['weather'][0]['id'],
            data['daily'][3]['weather'][0]['id'],
            data['daily'][4]['weather'][0]['id']
        ];
        fiveDayImages = [
            data['daily'][0]['weather'][0]['icon'],
            data['daily'][1]['weather'][0]['icon'],
            data['daily'][2]['weather'][0]['icon'],
            data['daily'][3]['weather'][0]['icon'],
            data['daily'][4]['weather'][0]['icon']
        ];
    }) 
    .catch(error => alert("Error! Please Try Again 2")); 
}


// Function adds data from API into the viewable DOM elements
function arrangeData(){
    $(cityDateEl).text(city + " " + currentDate);
    $(tempEl).text(temp + tempTag);
    $(windEl).text(wind + windTag);
    $(humidityEl).text(humidity + humTag);
    $(uvIndexEl).text(uv);  

    var i = 0;
    while(i<5){
        $(fiveDayTempEl[i]).text((fiveDayTemp[i]) + tempTag);
        $(fiveDayWindEl[i]).text(fiveDayWind[i] + windTag);
        $(fiveDayHumidityEl[i]).text(fiveDayHumidity[i] + humTag);
        i++;
    }
    dynamicStyle();
}

function dynamicStyle(){
    var i = 0;
    while(i<5){
        $(imagesEl[i]).attr("src", `http://openweathermap.org/img/wn/${fiveDayImages[i]}@2x.png`);
        if(fiveDayStatus[i] >= 200 && fiveDayStatus[i] < 800){
            $(fiveDayContainersEL[i]).removeClass("default-conditions-theme").addClass("raining-conditions-theme");
        }
        if(fiveDayStatus[i] >= 801 && fiveDayStatus[i] < 900){
            $(fiveDayContainersEL[i]).removeClass("default-conditions-theme").addClass("cloudy-conditions-theme");
        }
        if(fiveDayStatus[i] == 800){
            $(fiveDayContainersEL[i]).removeClass("default-conditions-theme").addClass("sunny-conditions-theme");
        }
        i++;
    }
}