import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInformation = ({ country }) => {
  const [example, setExample] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    const getWeatherInformation = async () => {
      try {
        const [lat, lon] = country.latlng;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const parsedResponse = response.data;
        const temperature = `${parsedResponse.main.temp} Celcius`;
        const windSpeed = `${parsedResponse.wind.speed} m/s`;
        const iconURL = `http://openweathermap.org/img/wn/${parsedResponse.weather[0].icon}@2x.png`;
        const description = parsedResponse.weather[0].description;
        setWeatherInfo({ temperature, windSpeed, iconURL, description });
      } catch (error) {
        console.error(error);
      }
    }
    getWeatherInformation();
  }, [])

  return (
    <>
      <h2>{country.name.common}</h2>
      <div><b>Capital(s):</b> {country.capital.join(', ')}</div>
      <div><b>Area:</b> {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ border: '1px solid #000' }} />
      <h3>Weather in {country.name.common}</h3>
      {weatherInfo ? (
        <>
          <div><b>Temperature:</b> {weatherInfo.temperature}</div>
          <img src={weatherInfo.iconURL} alt={weatherInfo.description} />
          <div><b>Wind:</b> {weatherInfo.windSpeed}</div>
        </>
      ) : <div>Loading...</div>}
    </>
  );
}

export default CountryInformation;