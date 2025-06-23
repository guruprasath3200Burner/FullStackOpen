import { useEffect, useState } from "react";
import CountryService from "./service/country-api.js";
function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountryService.getAll()
      .then((response) => {
        setCountries(response);
        console.log("Countries fetched successfully:", response);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const [countryName, setCountryName] = useState("");
  const HandleCountryNameChange = (e) => {
    setCountryName(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase())
  );

  const showCountryHandler = (cca3) => {
    const selectedCountry = countries.find((country) => country.cca3 === cca3);
    if (selectedCountry) {
      setCountryName(selectedCountry.name.common);
    }
    // Fetch the details of the selected country using its cca3 code
  };

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={countryName}
          onChange={HandleCountryNameChange}
        />
        <CountryList
          filteredCountries={filteredCountries}
          countryName={countryName}
          showCountryHandler={showCountryHandler}
        />
      </div>
    </>
  );
}

function CountryList({ filteredCountries, countryName, showCountryHandler }) {
  if (filteredCountries.length === 0 && countryName) {
    return <p>No countries found</p>;
  }
  if (filteredCountries.length > 5) {
    return <p>Too many countries, specify another filter</p>;
  }
  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => showCountryHandler(country.cca3)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area : {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>

        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "150px", height: "auto" }}
        />

        <WeatherInfo country={country} />
      </div>
    );
  }
  return null;
}

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (country) {
      const { latlng } = country;
      if (latlng && latlng.length === 2) {
        const [lat, lon] = latlng;
        CountryService.getWeather(lat, lon)
          .then((data) => {
            setWeather(data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }
    }
  }, [country]);

  return (
    <>
      <h3>Weather in {country.name.common}</h3>

      <p>Temperature: {weather?.current_weather?.temperature}°C</p>
      <p>Wind: {weather?.current_weather?.windspeed} m/s</p>
    </>
  );
};

export default App;
