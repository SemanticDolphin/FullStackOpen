import axios from "axios";
import { useEffect, useState } from "react";

const API_ENDPOINT = "https://restcountries.com/v3.1/all";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get(API_ENDPOINT)
      .then((res) => setCountries(res.data))
      .catch((error) => console.error(`something went wrong: ${error}`));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const showCountry = (country) => setSelectedCountry(country);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

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
        <CountryFull country={selectedCountry} />
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

const CountryFull = ({ country }) => {
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
    </div>
  );
};

export default App;
