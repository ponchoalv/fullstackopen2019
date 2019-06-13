import React from "react";

const MultiResults = ({ countries, showCountry }) => (
  <div>
    {countries.map(country => (
      <p key={country.alpha2Code}>{country.name}<button onClick={showCountry(country)}>show</button></p>
    ))}
  </div>
);

export default MultiResults;
