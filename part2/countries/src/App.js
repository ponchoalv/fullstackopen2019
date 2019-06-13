import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Results from "./components/Results";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const filteredCountries =
    filter.trim().length === 0
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        );

  const filterHandler = event => setFilter(event.target.value);

  const showHandler = country => () => setFilter(country.name);

  return (
    <div>
      <Filter filter={filter} filterHandler={filterHandler} />
      <Results countries={filteredCountries} showHandler={showHandler} />
    </div>
  );
};

export default App;
