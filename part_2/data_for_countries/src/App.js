import axios from "axios";
import { useEffect, useState } from "react";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(COUNTRIES_API_URL)
      .then((res) => setCountries(res.data))
      .catch((error) => console.error(`something went wrong: ${error}`));
  }, []);

  useEffect(() => {
    if (!selectedCountry || !selectedCountry.capitalInfo.latlng) {
      // Check if there is a selected country so it can fetch the data right
      // Also checks if there is some data about the capital
      // as some countries have an empty object for the latlng data like United States Minor Outlying Islands
      setWeather(null);
      return;
    }

    const [lat, lng] = selectedCountry.capitalInfo.latlng;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    axios
      .get(weather_url)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        setWeather(null);
        console.error(`Could not get weather: ${err}`);
      });
  }, [selectedCountry]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (filteredCountries.length > 1 || event.target.value === "") {
      // To prevent excessive re renders of the country full component
      // This reduces api calls for the weather.
      setSelectedCountry(null);
    }
  };

  const showCountry = (country) => setSelectedCountry(country);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  return (
    <div>
      <p>Find countries</p>
      <input value={search} onChange={handleChange} />
      {selectedCountry ? (
        <CountryFull country={selectedCountry} weather={weather} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify your filter more precisely</p>
      ) : (
        <ListedCountries
          countries={filteredCountries}
          showCountry={showCountry}
        />
      )}
    </div>
  );
}

const ListedCountries = ({ countries, showCountry }) => {
  return (
    <>
      {countries.map((country) => (
        <CountrySmall
          country={country}
          key={country.name.common}
          showCountry={showCountry}
        />
      ))}
    </>
  );
};

const CountrySmall = ({ country, showCountry }) => {
  return (
    <p>
      {country.name.common}
      <button onClick={() => showCountry(country)}>show</button>
    </p>
  );
};

const CountryFull = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>
        Area: {country.area} km<sup>2</sup>
      </p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather ? (
        <WeatherInformation capital={country.capital} weather={weather} />
      ) : (
        <p>Can't fetch weather for this location</p>
      )}
    </div>
  );
};

const WeatherInformation = ({ capital, weather }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      {weather ? (
        <>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default App;
