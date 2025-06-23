import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const weatherUrl = "https://api.open-meteo.com/v1/forecast";

const getAll = () => {
  const request = axios.get(`${baseUrl}api/all`);
  return request.then((response) => response.data);
};
const getByName = (name) => {
  const request = axios.get(`${baseUrl}name/${name}`);
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${weatherUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  getByName: getByName,
  getWeather: getWeather,
};
