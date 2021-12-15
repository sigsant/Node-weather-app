const weatherForm = document.querySelector('form');

const msgError = document.querySelector('#info-error');
const infoPlace = document.querySelector('#info-place');
const weatherDesc = document.querySelector('#data-desc');
const weatherTemp = document.querySelector('#data-temp');
const weatherPrec = document.querySelector('#data-prec');
const weatherIcon = document.querySelector('#weather-icon');

const divWeather = document.querySelector('#info-weather');
const divDataWeather = document.querySelector('#data-weather');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const {value} = document.querySelector('input')
    fetch(`weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgError.textContent = data.error;
                msgError.style.display="block";
                divWeather.style.display="none";
                divDataWeather.style.display="none";
                return
            }
            if(msgError.style.display="block"){
                msgError.style.display="none";
                divWeather.style.display="flex";
                divDataWeather.style.display="flex";
            }
            infoPlace.textContent = data.place;
            weatherDesc.textContent = data.forecast.Descripcion;
            weatherTemp.textContent = data.forecast.Temperatura;
            weatherPrec.textContent = data.forecast.Precipitacion;
            weatherIcon.src = data.forecast.Icon
            weatherIcon.alt = data.forecast.Descripcion;
        })
    })
})