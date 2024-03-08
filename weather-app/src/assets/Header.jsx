import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [cityName, setCityName] = useState("Pune"); // State to store the city name input
  const [weatherData, setWeatherData] = useState(null); // State to store the weather data

  const apiKey = "ba40e8411139b0a41fd7c3c4ff52f041";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async () => {
  try {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (!response.ok) {
      // If response is not OK (status code is not 200), handle the error
      if (response.status === 404) {
        // City not found
        throw new Error("City not found");
      } else {
        // Other error
        throw new Error("Failed to fetch weather data");
      }
    }
    const data = await response.json();
    console.log(data);
    setWeatherData(data); // Update weather data state
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Handle the error, e.g., display an error message to the user
  };

  };
  useEffect(() => {
    checkWeather(); // Fetch weather data when component mounts
  }, []);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSearch = () => {
    checkWeather();
  };

  return (
    <div className="container">
      <div className="wrapper">
        <section>
          <div className="search">
            <input
              className="cityname"
              type="text"
              placeholder="Please Enter Your City"
              value={cityName}
              onChange={handleInputChange}
            />
            <button className="bu1" onClick={handleSearch}>
              <img
                src="./search2.png"
                alt="searchbutton"
                width={30}
                height={30}
              />
            </button>
          </div>
          {weatherData && (
            <div className="weather">
              <img src="./rain.png" alt="" className="weathericon" />
              <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
              <h2 className="city">{weatherData.name}</h2>

              <div className="details">
                <div className="col">
                  <img src="./images/humidity.png" alt="" className="humid" />
                  <div>
                    <p className="humidity">{weatherData.main.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>

                <div className="col">
                  <img src="./images/wind.png" alt="" className="windy" />
                  <div>
                    <p className="wind">{weatherData.wind.speed}km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          ;
        </section>
      </div>
    </div>
  );
};

export default Header;
