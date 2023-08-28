import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

const data = document.querySelector(".data");
const input = document.querySelector("input");
const search = document.querySelector(".search");

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

search.addEventListener("click", () => {
  console.log("searched");
  weatherRequest(input.value).then((val) => console.log(val));
});
