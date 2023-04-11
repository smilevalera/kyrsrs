const humidityClass = document.querySelector('.huuumidity')
const Pweather = document.querySelector('.weather')
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer')
const Prosto = document.querySelector('.prosto')
const image = document.querySelector('.img'); 
const tempCard = document.querySelector('.temp_c'); 
const Wind = document.querySelector('.wind');
const Humidity = document.querySelector('.humidity')
const HApi = document.querySelector('.ApiH')
const box = document.querySelector('.circle');
const Container = document.querySelector('.container');
const localTime = document.querySelector('.localTime');
const Apitext = document.querySelector('.Apitext');
const fonS = document.querySelector('.fonS');
const fonD = document.querySelector('.fonD');
const newHeader = document.querySelector('.newHeader');
const newMain = document.querySelector('.newMain');
const newFooter = document.querySelector('.newFooter')
const colorS = document.querySelector('.colorS');
const colorD = document.querySelector('.colorD');
const poiskText = document.querySelector('.poiskText');
const drygou = document.querySelector('.drygou');
const eerror = document.createElement('div');
let btnError = document.createElement('button');


const btnVitebsk = document.querySelector('.btnVitebsk');
const btnBrest = document.querySelector('.btnBrest');
const btnMinsk = document.querySelector('.btnMinsk');
const btnMogilev = document.querySelector('.btnMogilev');
const btnGrodno = document.querySelector('.btnGrodno');
const btnGomel = document.querySelector('.btnGomel');
const btnCitys = document.querySelectorAll('.btnCity');

let city = 'Minsk';
let url = `http://api.weatherapi.com/v1/current.json?key=daebc8d0a3d64617ad0153304231402&aqi=no&q=`;
let urlNewCity = `http://api.weatherapi.com/v1/forecast.json?key=daebc8d0a3d64617ad0153304231402&q=${city}&days=2&aqi=yes&alerts=0`;
let tempC;

function fetchStart(){
    fetch(url + city) 
    .then(res => res.json()) 
    .then((res) => { 
         console.log(res);
         localTime.innerText = res.location.localtime;
         tempCard.innerText = `${res.current.temp_c}°С`; 
         image.src = 'https:' + res.current.condition.icon; 
         Wind.innerText = `${res.current.wind_kph}km/h`;
         HApi.innerText = `${res.current.humidity}%`;
         Apitext.innerText = res.current.condition.text;



        if(res.current.temp_c <= 0){
            box.style.boxShadow =  '10px 5px 5px 5px rgba(255, 255, 255, 0.616)';
        }
        if(res.current.temp_c >= 10 && res.current.temp_c <50){
            box.style.boxShadow = '10px 5px 5px 5px rgba(255, 217, 0, 0.616)    ';
        }
        if(res.current.temp_c > 0  && res.current.temp_c <= 9){
            box.style.boxShadow = '10px 5px 5px 5px rgba(11, 93, 156, 0.616)'};
    })
    .catch(err => {
        eerror.classList.add('error');
        document.body.append(eerror);
        console.log(eerror);
    } )
}
fetchStart(url);

btnVitebsk.addEventListener('click',  () => addCityInfo(btnVitebsk));
btnBrest.addEventListener('click',  () => addCityInfo(btnBrest));
btnMinsk.addEventListener('click', () => addCityInfo(btnMinsk));
btnMogilev.addEventListener('click',  () => addCityInfo(btnMogilev));
btnGrodno.addEventListener('click',  () => addCityInfo(btnGrodno));
btnGomel.addEventListener('click',  () => addCityInfo(btnGomel));

function addCityInfo(cityBtn){
    city = `${cityBtn.value}`;
    for (let item of btnCitys) {
        if(item.value !== city){
            item.classList.remove('newBtnCity');
        } 
        if(item.value === city){ 
            item.classList.add('newBtnCity');
        }
    }
    fetchStart()
};

fonD.addEventListener('click', function(){
    fonD.classList.add('colorD');
    fonS.classList.remove('colorS')
    header.classList.add('newHeader');
    main.classList.add('newMain');
    footer.classList.add('newFooter')

});
fonS.addEventListener('click', function(){
    fonD.classList.remove('colorD');
    fonS.classList.add('colorS')
    header.classList.remove('newHeader');
    main.classList.remove('newMain');
    footer.classList.remove('newFooter');
});

poiskText.addEventListener('click', function(){
    getWeather();
})

btnError.style.width = '40px';
btnError.style.height = '40px';
btnError.innerText ='x';
btnError.style.position = 'relative';
btnError.style.top = '0';
btnError.style.left = '100%';
btnError.style.fontSize = '3rem';
btnError.style.display = 'flex';  
btnError.style.justifyContent = 'space-around';  
btnError.style.textAlign = 'center';  
btnError.style.alignItems = 'center'; 
eerror.append(btnError);
let pinerror = document.createElement('p');
pinerror.innerText = 'такого города не существует!!!';
eerror.append(pinerror);

btnError.addEventListener('click', function(){
    eerror.classList.remove('error');
});


document.addEventListener('keyup', () => {
    if(drygou == document.activeElement && event.code == "Enter"){
        getWeather();
    }
});

function getWeather(){
    try{
        city = drygou.value;
        urlNewCity =`http://api.weatherapi.com/v1/forecast.json?key=daebc8d0a3d64617ad0153304231402&q=${city}&days=2&aqi=yes&alerts=0`;
        fetchStart(urlNewCity);
    }
    catch(err){
        city = 'Minsk';
        urlNewCity = `http://api.weatherapi.com/v1/forecast.json?key=daebc8d0a3d64617ad0153304231402&q=${city}&days=2&aqi=yes&alerts=0`
        document.body.append(eerror);
    }
}



