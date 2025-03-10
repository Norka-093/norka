const cityInput = document.querySelector('.city-input'),
    searchBtn = document.querySelector('.search-btn');

const apiKey = '458f8ff9b6ec6e6682fd522642322e4d';

const notFoundSection = document.querySelector('.not-found'),
    searchCitySection = document.querySelector('.search-city'),
    weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector(".country-txt"),
    tempTxt = document.querySelector(".temp-txt"),
    conditionTxt = document.querySelector(".condition-txt"),
    humidityValueTxt = document.querySelector(".humidity-value-txt"),
    windValueTxt = document.querySelector(".wind-value-txt"),
    weatherSummaryImg = document.querySelector(".weather-summary-img"),
    currentDateTxt = document.querySelector(".current-data-txt");

searchBtn.addEventListener("click",()=>{
    // 不給空值
    if(cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';   // 清空輸入框內容
        cityInput.blur();       // 滑鼠離開欄位時，取消焦點
    }
});
cityInput.addEventListener("keydown", (event)=>{
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});
async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

function getWeatherIcon(id){
    if(id<=232) return 'thunderstorm.svg'
    if(id<=321) return 'drizzle.svg'
    if(id<=531) return 'rain.svg'
    if(id<=622) return 'snow.svg'
    if(id<=781) return 'atmosphere.svg'
    if(id<=800) return 'clear.svg'
    else return 'clouds.svg'
}
function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options);
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);
    
    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection);
        return
    }
    const {
        name: country,
        main: {temp,humidity},
        weather: [{id,main}],
        wind: {speed}
    } = weatherData
    
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity;
    windValueTxt.textContent = speed+ ' M/s';
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;
    currentDateTxt.textContent = getCurrentDate();
    // console.log(getCurrentDate());
    await updateForecastsInfo(city);
    showDisplaySection(weatherInfoSection);
}
async function updateForecastsInfo(city){
    const forecastsData = await getFetchData('forecast',city);
    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];
    
    forecastItemsContainer.innerHTML = '';
    forecastsData.list.forEach(forecastWeather => {
        if(forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)){
            // console.log(forecastWeather);
            updateForecastsItems(forecastWeather);
        }
    });
    // console.log(todayDate);
    // console.log(forecastsData);
}

const forecastItemsContainer = document.querySelector(".forecast-items-container");
function updateForecastsItems(weatherData){
    console.log(weatherData);
    const {
        dt_txt: date,
        weather: [{id}],
        main: {temp}
    } = weatherData

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-US',dateOption);

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-data regular-txt">${dateResult}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-item-temp regular-txt">${Math.round(temp)} °C</h5>
        </div>`;

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}


function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(section => section.style.display = 'none');
    section.style.display = 'flex';
}


