import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

const inputEL = document.querySelector("input");
const searchEL = document.querySelector(".search");
const dateEL = document.querySelector(".date");
const timeEL = document.querySelector(".time");
const tempEL = document.querySelector(".temp");
const feelsEL = document.querySelector(".feels");
const conditionEL = document.querySelector(".condition");
const humidityEL = document.querySelector(".humidity");
const rainEL = document.querySelector(".rain");
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

const setWeather = (json) => {
  const [date, time] = json.location.localtime.split(" ");
  dateEL.textContent = formatDate(date);
  timeEL.textContent = formatTime(time);
};

searchEL.addEventListener("click", () => {
  console.log("searched");
  weatherRequest(inputEL.value).then((val) => {
    console.log(val);
    setWeather(val);
  });
});

inputEL.addEventListener("keypress", (e) => {
  const keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    console.log("searched");
    weatherRequest(inputEL.value).then((val) => {
      console.log(val);
      setWeather(val);
    });
  }
});
