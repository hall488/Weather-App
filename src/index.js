import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";
import dial from "./img/dial.svg";
import cloud from "./img/cloud.svg";
import rain from "./img/rain.svg";
import snow from "./img/snow.svg";
import thunder from "./img/thunder.svg";

const container = document.querySelector(".container");
const searchbarEL = document.querySelector(".searchbar");
const inputEL = document.querySelector("input");
const searchEL = document.querySelector(".search");
const cityEL = document.querySelector(".city");
const dateEL = document.querySelector(".date");
const timeEL = document.querySelector(".time");
const tempEL = document.querySelector(".temp");
const feelsEL = document.querySelector(".feels");
const conditionEL = document.querySelector(".condition");
const humidityEL = document.querySelector(".humidity");
const windEL = document.querySelector(".wind");

const API_KEY = "c5685829d4fe406d88e161048232708";

const weatherRequest = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
    {
      mode: "cors",
    },
  );

  const json = await response.json();

  return json;
};

const formatLocation = (city, region, country) => {
  if (region !== "") {
    return `${city}, ${region}`;
  }

  return `${city}, ${country}`;
};

const formatDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = date.split("-");

  return `${monthNames[month - 1]} ${parseInt(day, 10)}, ${year}`;
};

const formatTime = (time) => {
  const [hour, minute] = time.split(":");

  return hour > 12
    ? `${hour - 12}:${minute} PM`
    : `${parseInt(hour, 10)}:${minute} AM`;
};

function svgComponent(source) {
  const element = document.createElement("object");

  element.data = source;
  element.type = "image/svg+xml";
  element.classList += "svg-object";
  element.style.position = "absolute";

  return element;
}

const dialEL = svgComponent(dial);
dialEL.classList.add("dial");
const cloudEL = svgComponent(cloud);
cloudEL.style.display = "none";
cloudEL.classList.add("weatherEL", "cloudEL");
const rainEL = svgComponent(rain);
rainEL.style.display = "none";
rainEL.classList.add("weatherEL");
const snowEL = svgComponent(snow);
snowEL.style.display = "none";
snowEL.classList.add("weatherEL");
const thunderEL = svgComponent(thunder);
thunderEL.style.display = "none";
thunderEL.classList.add("weatherEL");

container
  .querySelector(".center")
  .append(dialEL, thunderEL, rainEL, snowEL, cloudEL);

const setDial = (time, code) => {
  const [hour, minute] = time.split(":");
  const total = parseInt(hour, 10) * 100 + parseInt(minute, 10);

  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  const deg = scale(total, 0, 2400, 0, 360);
  dialEL.style.transform = `rotate(${-deg - 90}deg)`;

  const sunny = 1000;

  const rainy = [
    1063, 1066, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
    1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276,
  ];

  const snowy = [
    1066, 1069, 1114, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237,
    1249, 1252, 1255, 1261, 1264, 1258, 1279, 1282,
  ];

  const thundery = [1087, 1273, 1276, 1279, 1282];

  if (code !== sunny) cloudEL.style.display = "flex";
  else cloudEL.style.display = "none";

  if (rainy.includes(code)) rainEL.style.display = "flex";
  else rainEL.style.display = "none";

  if (snowy.includes(code)) snowEL.style.display = "flex";
  else snowEL.style.display = "none";

  if (thundery.includes(code)) thunderEL.style.display = "flex";
  else thunderEL.style.display = "none";
};

const setWeather = (json) => {
  cityEL.textContent = formatLocation(
    json.location.name,
    json.location.region,
    json.location.country,
  );
  const [date, time] = json.location.localtime.split(" ");
  dateEL.textContent = formatDate(date);
  timeEL.textContent = formatTime(time);
  tempEL.textContent = `Temp: ${json.current.temp_f} °F`;
  feelsEL.textContent = `Feels: ${json.current.feelslike_f} °F`;
  conditionEL.textContent = json.current.condition.text;
  humidityEL.textContent = `Humidity: ${json.current.humidity} %`;
  windEL.textContent = `Wind: ${json.current.wind_mph} mph`;

  setDial(time, json.current.condition.code);
};

searchbarEL.addEventListener("animationend", () => {
  searchbarEL.style.animation = "none";
  inputEL.style.animation = "none";
});

searchEL.addEventListener("click", () => {
  weatherRequest(inputEL.value)
    .then((val) => {
      setWeather(val);
    })
    .catch(() => {
      searchbarEL.style.animation = "invalidShake .5s";
      inputEL.style.animation = "invalidShake .5s";
    });
});

inputEL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    weatherRequest(inputEL.value)
      .then((val) => {
        setWeather(val);
      })
      .catch(() => {
        searchbarEL.style.animation = "invalidShake .5s";
        inputEL.style.animation = "invalidShake .5s";
      });
  }
});

const mobile = () => {
  if (document.documentElement.clientWidth < 860) {
    container.classList.add("mobile");
    [...container.children].forEach((c) => {
      c.classList.add("mobile");
    });
    const [left, right] = document.querySelectorAll(".data");
    container.querySelector(".bottom").append(left, right);
  } else {
    container.classList.remove("mobile");
    [...container.children].forEach((c) => {
      c.classList.remove("mobile");
    });
    const [left, right] = document.querySelectorAll(".data");
    container.append(left, right);
  }
};

window.addEventListener("load", mobile);

window.addEventListener("resize", mobile);
