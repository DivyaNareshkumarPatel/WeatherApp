var date = new Date;
var MONTHindex = date.getMonth();
const MONTHARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
const MONTHARRAY2 = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
document.querySelector(".month").innerHTML = MONTHARRAY[MONTHindex] + " " + date.getFullYear();
const DAYARRAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.querySelector(".day").innerHTML = DAYARRAY[date.getDay()] + "," + MONTHARRAY2[MONTHindex] + " " + date.getDate() + "," + date.getFullYear();
setInterval(() => {
    let ddate = new Date;
    let dtFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
    document.querySelector(".whiteTime").innerHTML = dtFormat.format(ddate);
    document.querySelector(".time").innerHTML = dtFormat.format(ddate);
}, 1000)
const xValues = ["Mumbai", "Kolkata", "Chennai", "Ahmedabad"];
const yValues = new Array;
for (let i = 0; i < 4; i++) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${xValues[i]}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric`)
        .then(a => a.json())
        .then(response => {
            yValues[i] = response.main.temp;
            new Chart("charttemp", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [
                        {
                            backgroundColor: "#0336a3",
                            data: yValues
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            })
        })
}
const block = document.querySelector(".block2");
const icon = document.querySelector(".icontop");
const block1 = document.querySelector(".block1");
const body = document.querySelector("body");
const showBlock = () => {
    block.style.display = "flex";
    block1.style.overflow = "hidden";
    block1.style.opacity = ".5";
    icon.style.opacity = "0";
}
const hideBlock = () => {
    block.style.display = "none";
    block1.style.overflow = "scroll";
    block1.style.opacity = "1";
    icon.style.opacity = "1";
}
icon.addEventListener("click", showBlock);
if (window.innerWidth <= 1196) {
    block1.addEventListener("click", hideBlock);
}
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric`)
    .then(a => a.json())
    .then(response => {
        console.log(response);
        document.querySelector(".temprature").innerHTML = response.main.temp + " °C";
        document.querySelector(".windspeed").innerHTML = response.wind.speed + " km/hr";
        document.querySelector(".pressure").innerHTML = response.main.pressure + " hpa";
        document.querySelector(".feel").innerHTML = response.main.feels_like + " °C";
        document.querySelector(".winddeg").innerHTML = response.wind.deg;
        document.querySelector(".visible").innerHTML = response.visibility + " m";
        document.querySelector("img").src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        document.querySelector(".tempbody").innerHTML = response.main.temp + " °C";
        document.querySelector(".tempname").innerHTML = response.weather[0].description;
        document.getElementById("cloud").innerHTML = response.clouds.all + "%";
        document.getElementById("min").innerHTML = response.main.temp_min + " °C";
        document.getElementById("max").innerHTML = response.main.temp_max + " °C";
        document.getElementById("humid").innerHTML = response.main.humidity + "%";
    })
fetch(`https://api.sunrise-sunset.org/json?Delhi&date=today`)
    .then(a => a.json())
    .then(response => {
        console.log(response);
        document.querySelector(".sunrisebody").innerHTML = response.results.sunrise;
        document.querySelector(".sunsetbody").innerHTML = response.results.sunset;
    })
let form = document.querySelector("form");
let search = document.querySelector("#search");
const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return showWeather(data);
}
const showWeather = (response) => {
    console.log(response);
    try {
        document.querySelector(".temprature").innerHTML = response.main.temp + " °C";
    } catch {
        alert("Wrong city name");
    }
    document.querySelector(".windspeed").innerHTML = response.wind.speed + " km/hr";
    document.querySelector(".pressure").innerHTML = response.main.pressure + " hpa";
    document.querySelector(".feel").innerHTML = response.main.feels_like + " °C";
    document.querySelector(".winddeg").innerHTML = response.wind.deg;
    document.querySelector(".visible").innerHTML = response.visibility + " m";
    document.querySelector("img").src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
    document.querySelector(".tempbody").innerHTML = response.main.temp + " °C";
    document.querySelector(".tempname").innerHTML = response.weather[0].description;
    document.getElementById("cloud").innerHTML = response.clouds.all + "%";
    document.getElementById("min").innerHTML = response.main.temp_min + " °C";
    document.getElementById("max").innerHTML = response.main.temp_max + " °C";
    document.getElementById("humid").innerHTML = response.main.humidity + "%";
    if(response.sys.country==undefined){
    document.querySelector(".place").innerHTML = response.name;
    document.querySelector(".placewhite").innerHTML = response.name;
    }
    else{
        document.querySelector(".place").innerHTML = response.name + " ," + response.sys.country;
    document.querySelector(".placewhite").innerHTML = response.name + " ," + response.sys.country;
    }
}
const getSun = async (city) => {
    const url = `https://api.sunrise-sunset.org/json?${city}&date=today`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return showSun(data);
}
const showSun = (response) => {
    console.log(response);
    document.querySelector(".sunrisebody").innerHTML = response.results.sunrise;
    document.querySelector(".sunsetbody").innerHTML = response.results.sunset;
}
form.addEventListener(
    "submit",
    function (event) {
        console.log(search.value);
        getWeather(search.value);
        getSun(search.value);
        event.preventDefault();
    }
)