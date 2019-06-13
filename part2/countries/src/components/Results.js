import React from "react";
import SingleResult from "./SingleResult";
import MultiResults from "./MultiResults";

const Results = ({ countries, showHandler }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (countries.length === 1) {
    return <SingleResult country={countries[0]} />;
  } else {
    return <MultiResults countries={countries} showCountry={showHandler} />;
  }
};

export default Results;
