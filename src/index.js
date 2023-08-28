import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

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
    return `${city}, ${region}, ${country}`;
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

const setWeather = (json) => {
  cityEL.textContent = formatLocation(
    json.location.name,
    json.location.region,
    json.location.country,
  );
  const [date, time] = json.location.localtime.split(" ");
  dateEL.textContent = formatDate(date);
  timeEL.textContent = formatTime(time);
  tempEL.textContent = `${json.current.temp_f} °F`;
  feelsEL.textContent = `${json.current.feelslike_f} °F`;
  conditionEL.textContent = json.current.condition.text;
  humidityEL.textContent = `${json.current.humidity} %`;
  windEL.textContent = `${json.current.wind_mph} mph`;
};

searchEL.addEventListener("click", () => {
  console.log("searched");
  weatherRequest(inputEL.value).then((val) => {
    console.log(val);
    setWeather(val);
  });
});

inputEL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("searched");
    weatherRequest(inputEL.value).then((val) => {
      console.log(val);
      setWeather(val);
    });
  }
});
