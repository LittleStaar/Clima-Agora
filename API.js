//https://api.openweathermap.org/data/2.5/weather?q=Paulista&units=metric&appid=9ff9cf221aa09c6d6d4b4ab912b7601f&lang=pt_br
// apiKey = "9ff9cf221aa09c6d6d4b4ab912b7601f";
//1-Variáveis e seleções de elementos


const apiKey = "9ff9cf221aa09c6d6d4b4ab912b7601f";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const wheatherDataContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");

//3-Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
};

const showWeatherData = async(city) =>{
    hideInformation();
    const data = await getWeatherData(city);
    if (data.cod === "404"){
        showErrorMessage();
        return;
    }
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`)
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    wheatherDataContainer.classList.remove("hide");
};

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    wheatherDataContainer.classList.add("hide");
    errorMessageContainer.classList.add("hide");

};

//2-Eventos
searchBtn.addEventListener("click", (e) =>{
    e.preventDefault() //evita o envio do formulário
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});

