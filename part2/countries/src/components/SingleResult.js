import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleResult = ({ country }) => {
  const [temperature, setTemperature] = useState("N/A");
  const [icon, setIcon] = useState(
    "http://cdn.apixu.com/weather/64x64/day/116.png"
  );
  const [wind, setWind] = useState("N/A");

  const url = `https://api.apixu.com/v1/current.json?key=dff3a47628ab46d1848194913191306&q=${
    country.capital
  }`;

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(url, {
        cancelToken: source.token
      })
      .then(response => {
        const wheather = response.data;

        setTemperature(`${wheather.current.temp_c} Celsius`);
        setIcon(`http:${wheather.current.condition.icon}`);
        setWind(
          `${wheather.current.wind_kph} kph direction ${
            wheather.current.wind_dir
          }`
        );
      });
    
  return function cleanup(){
    source.cancel('Operacion canceled');
  }
   
  }, [url]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        height="120"
        width="120"
      />
      <h3>Wheather in {country.capital}</h3>
      <p>
        <b>temperature:</b> {temperature}
      </p>
      <img src={icon} alt={`${country.capital} temperature`} />
      <p>
        <b>wind:</b> {wind}
      </p>
    </div>
  );
};

export default SingleResult;
