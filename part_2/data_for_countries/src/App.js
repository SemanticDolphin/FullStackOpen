import axios from "axios";
import { useEffect, useState } from "react";

const API_ENDPOINT = "https://restcountries.com/v3.1/all";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get(API_ENDPOINT).then((res) => setCountries(res.data));
  }, []);

  const handleChange = (event) => setSearch(event.target.value);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p>Find countries</p>
      <input value={search} onChange={handleChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify your filter more precisely</p>
      ) : (
        <ListedCountries countries={filteredCountries} />
      )}
    </div>
  );
}
const ListedCountries = ({ countries }) => {
  console.log(countries);
  return (
    <>
      {countries.length > 1
        ? countries.map((country) => (
            <CountrySmall country={country} key={country.name.common} />
          ))
        : countries.map((country) => (
            <CountryFull key={country.name.common} country={country} />
          ))}
    </>
  );
};

const CountrySmall = ({ country }) => {
  return <p>{country.name.common}</p>;
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
