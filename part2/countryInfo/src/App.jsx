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
        />
      </div>
    </>
  );
}

function CountryList({ filteredCountries, countryName }) {
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
          <li key={country.cca3}>{country.name.common}</li>
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
      </div>
    );
  }
  return null;
}

export default App;
