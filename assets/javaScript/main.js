"use strict";

class Weather {
    constructor(city){
        this._city = city;
        this.apiKey = "0bf2822d8a0f2091fa35f650d86af728";
        this.apiUrl = "api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={API key}";
        this.getWeather();
    }
    // Sends Request To Api (openweathermap)
    getWeather(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this._city}&units=metric&appid=${this.apiKey}`)
            .then(response => response.json())
            .then(data => this.setWeather(data))
            .catch(err => console.log(err));
    }
    // Sets Api response on elements
    setWeather(data){
        let cityName = data.name;
        let weather = data.main.temp;
        let weatherIcon = data.weather[0].icon;
        let condition = data.weather[0].description;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        document.querySelector(".weatherCity").textContent = `Weather in ${cityName}`;
        document.querySelector(".weather").textContent = `${weather}°C`;
        document.querySelector(".flex img").src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        document.querySelector(".cloudCondition").textContent = condition;
        document.querySelector(".humidity").textContent = `Humidity : ${humidity}%`;
        document.querySelector(".wind").textContent = `Wind : ${windSpeed} km/h`;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${cityName})`;
    }
}

// Default City Weather
new Weather("tehran");

// searchBox Section
document.querySelector(".search button").addEventListener("click" , addCity);
document.querySelector(".search input").addEventListener("keyup" , addCity);
function addCity(event){
    if(this.tagName == "BUTTON"){
        let inputCity = document.querySelector(".search input").value;
        if(inputCity != ""){
            new Weather(inputCity);
            document.querySelector(".search input").value = "";
        }
    }
    if(this.tagName == "INPUT" && event.code === "Enter" && this.value != ""){
        new Weather(this.value);
        this.value = ""; 
    }
}