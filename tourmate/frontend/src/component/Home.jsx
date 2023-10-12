import React, { useState, useEffect } from "react";
import i18nIsoCountries from "i18n-iso-countries";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Autocomplete } from '@react-google-maps/api';
import back from "../assert/back.jpeg"
import slide1 from "../assert/slide1.jpg"
import slide2 from "../assert/slide2.jpg"
import slide3 from "../assert/slide3.jpg"
import { Helmet } from 'react-helmet-async';
import { Link, useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const api = {
  openWeatherMapKey: "f8358e088ce7977e04d5ef56c9e7c3bb",
  googlePlacesKey: "AIzaSyACdwaw1h6cATe6laoMWoayEniMemjgVkE", // Replace with your Google Places API key
};

function Home(props) {
//  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageFav, setErrorMessageFav] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [hiddenPlaces, setHiddenPlaces] = useState([]);
  const [favoritePlaces, setFavouritePlaces] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("suggested");
  const images = [slide1,slide2,slide3,back];
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);

 const fetchHiddenPlaces = async (keyword) => {
   try {
     const response = await axios.get(
       "http://localhost:8080/favplace/gethidden"
     );
     console.log(keyword);
     const filteredData = response.data.place.filter((data) =>
       data.location.includes(keyword)
     );
     setHiddenPlaces(filteredData);
   } catch (error) {
     console.error("Error fetching favorite places:", error);
   }
 };

 
 const fetchFavoritePlaces = async (keyword) => {
   try {
     const response = await axios.get(
      `http://localhost:8080/favplace/getallplaces/user01`
     );
     console.log(keyword);
     const filteredData = response.data.place.filter((data) =>
       data.location.includes(keyword)
     );
     setFavouritePlaces(filteredData);
   } catch (error) {
     console.error("Error fetching favorite places:", error);
   }
 };

 useEffect(() => {
    const interval = setInterval(() => {
      // Advance to the next image (looping back to the start if at the end)
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => {
        // Clean up the interval when the component unmounts
        clearInterval(interval);
      };
    }, []);

    // useEffect(() => {
    //   // Load the OpenWeatherMap widget script dynamically
    //   const script = document.createElement("script");
    //   script.async = true;
    //   script.charset = "utf-8";
    //   script.src =
    //     "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    //   const s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(script, s);
  
    //   // Initialize the OpenWeatherMap widget after the script is loaded
    //   script.onload = () => {
    //     if (window.myWidgetParam) {
    //       window.myWidgetParam.push({
    //         id: 11,
    //         cityid: "1227603",
    //         appid: "f8358e088ce7977e04d5ef56c9e7c3bb",
    //         units: "metric",
    //         containerid: "openweathermap-widget-11",
    //       });
    //       window.myWidgetParam = window.myWidgetParam || [];
    //       (function () {
    //         var script = document.createElement("script");
    //         script.async = true;
    //         script.charset = "utf-8";
    //         script.src =
    //           "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    //         var s = document.getElementsByTagName("script")[0];
    //         s.parentNode.insertBefore(script, s);
    //       })();
    //     }
    //   };
    // }, []);
    
//   const fetchFavoritePlaces = (lat, lng, initialRadius = 10000) => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/favplace/getallplaces/aaa"
//         );
//         console.log(response);

//         setMapCenter({ lat, lng });
//           fetchNearbyFavPlaces(lat, lng);
        
//       } catch (error) {
//         setErrorMessageFav("No favorite places added yet.")
//         console.error("Error fetching favorite places:", error);
//         setFavoritePlaces([]);
//     }
//     }
 
const goToPreviousImage = () => {
  setCurrentImageIndex((prevIndex) =>
    prevIndex === 0 ? images.length - 1 : prevIndex - 1
  );
};

// Define a function to handle moving to the next image
const goToNextImage = () => {
  setCurrentImageIndex((prevIndex) =>
    prevIndex === images.length - 1 ? 0 : prevIndex + 1
  );
};

  // const fetchNearbyFavPlaces = (lat, lng) => {
  //  const initialRadius = 10000;
  //  const { accessToken } = auth;
  //   const fetchWithAdjustedRadius = async () => {
  //     try {
  //       const response = await axios.get('/favplace/getlocationplaces/aaa', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         withCredentials: true,
  //         params: {
  //           lat: lat,
  //           lon: lng,
  //           radius: initialRadius,
  //         },
  //       });
  
        
        
        

  //       const result = response.data;
  
  //       console.log(result)

  //       if (result.status === 'OK') {
  //         const placesWithWeatherPromises = result.results.map((place) => {
  //           return axios.get('https://api.openweathermap.org/data/2.5/weather', {
  //             params: {
  //               lat: place.latitude,
  //               lon: place.longitude,
  //               units: 'metric',
  //               appid: api.openWeatherMapKey,
  //             },
  //           });
  //         });
  
  //         console.log(placesWithWeatherPromises)

  //         const weatherResponses = await Promise.all(placesWithWeatherPromises);
  
  //         console.log(weatherResponses)

  //         const placesWithWeather = weatherResponses.map((weatherResponse, index) => {
  //           const place = result.place[index];
  //           const weatherData = weatherResponse.data;
  
  //           place.weather = {
  //             temperature: weatherData.main.temp,
  //             humidity: weatherData.main.humidity,
  //             windSpeed: weatherData.wind.speed,
  //           };
  
  //           return place;
  //         });
  //         console.log(weatherResponses)
          

   
  //         console.log(placesWithWeather)

  //         return placesWithWeather;
  //       } else {
  //         return [];
  //       }
  //     } catch (error) {
  //       console.error('Error fetching and filtering data:', error);
  //       return [];
  //     }
  //   };
  
  //   return fetchWithAdjustedRadius(initialRadius)
  //     .then((placesWithWeather) => {
  //       setFavoritePlaces(placesWithWeather);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching and filtering data:', error);
  //       setFavoritePlaces([]);
  //     });
  // };

  const fetchCityCoordinates = async () => {
    try {
      const response = await axios.get('api/place', {
        params: {
          name: search,
          key: api.googlePlacesKey,
        },
      });


  
      const results = response.data.results;
  
      if (results.length > 0) {
        const location = results[0].geometry.location;
        const lat = location.lat;
        const lng = location.lng;
  
        setMapCenter({ lat, lng });
        fetchNearbyPlaces(lat, lng);
         setSearchPerformed(true);
         fetchHiddenPlaces(search)
         fetchFavoritePlaces(search)
        // fetchNearbyFavPlaces(lat,lng);
      } else {
        setErrorMessage('City not found.');
        setPlaces([]);
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching data.');
      setPlaces([]);
    }
  };
  

  const fetchNearbyPlaces = (lat, lon, initialRadius = 10000) => {
    const keyword = ['tourist_attraction'];
    const fetchWithAdjustedRadius = async (adjustedRadius) => {
      try {
        const response = await axios.get('/api/places', 
        {
          params: {
            lat: lat,
            lon: lon,
            radius: adjustedRadius,
            keyword: keyword.join('|'),
            apiKey: api.googlePlacesKey,
          },
        });
        
        
        

        const result = response.data;
  
        console.log(result)

        if (result.status === 'OK') {
          const placesWithWeatherPromises = result.results.map((place) => {
            return axios.get('https://api.openweathermap.org/data/2.5/weather', {
              params: {
                lat: place.geometry.location.lat,
                lon: place.geometry.location.lng,
                units: 'metric',
                appid: api.openWeatherMapKey,
              },
            });
          });
  
          console.log(placesWithWeatherPromises)

          const weatherResponses = await Promise.all(placesWithWeatherPromises);
  
          console.log(weatherResponses)

          const placesWithWeather = weatherResponses.map((weatherResponse, index) => {
            const place = result.results[index];
            const weatherData = weatherResponse.data;
  
            place.weather = {
              temperature: weatherData.main.temp,
              humidity: weatherData.main.humidity,
              windSpeed: weatherData.wind.speed,
            };
  
            return place;
          });
          console.log(weatherResponses)
          

    //       const filteredPlaces = placesWithWeather.filter((place) =>
    //         place.types.every((type) => keyword.includes(type))
    //       );
  
    //    //   console.log('Place Types:', place.types);
    //       console.log('Keyword:', keyword);
          
          console.log(placesWithWeather)

          return placesWithWeather;
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error fetching and filtering data:', error);
        return [];
      }
    };
  
    return fetchWithAdjustedRadius(initialRadius)
      .then((placesWithWeather) => {
        setPlaces(placesWithWeather);
        
      })
      .catch((error) => {
        console.error('Error fetching and filtering data:', error);
        setPlaces([]);
      });
  };
  


  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setSearchPerformed(true);
        setSearch(place.formatted_address);
        fetchCityCoordinates(); // Trigger the search automatically
        fetchHiddenPlaces(place.formatted_address);
        fetchFavoritePlaces(place.formatted_address);
    }
    }
  };

  return (
    <div className="App bg-slate-300 h-full">
      {/* bg-image w-full h-screen bg-opacity-90 */}
      <header className="App-header">
        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <div className="flex justify-center mt-10 mb-4">
            <input
              type="text"
              placeholder="Enter city/town..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 p-2 mr-2 mt-5 rounded-l border border-black"
            />
            <datalist id="suggestions">
              {suggestions.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>
            <button
              onClick={fetchCityCoordinates}
              className="w-40 bg-blue-500 text-white p-2 mt-5 rounded-r hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </Autocomplete>
        {!searchPerformed && (
          <div className="advertisement bg-white p-4 rounded-lg shadow-md text-center w-3/4 h-full relative overflow-hidden flex flex-col justify-center items-center mx-auto mb-10">
            {/* Advertisement Image */}
            <button
              onClick={goToPreviousImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 z-10" // Increase z-index value
            >
              &lt;
            </button>
            <button
              onClick={goToNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 z-10" // Increase z-index value
            >
              &gt;
            </button>
            <div
              className="transition-transform transform"
              style={{
                transform: `translateX(-${
                  currentImageIndex * (100 / images.length)
                }%)`,
                transition: "transform 1s ease",
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Advertisement ${index + 1}`}
                  className="w-100 h-80 inline-block"
                  style={{ width: `${100 / 4}%` }} // Set the width for each image
                />
              ))}
            </div>

            <p className="text-gray-900 mt-20 mb-10 font-bold">
              Discover great places with our website and maintain your records
              to get wonderful suggestions!
            </p>
          </div>
        )}

        {searchPerformed && (
          <div>
            {/* <Helmet>
      // Include the OpenWeatherMap widget script 
      <script>
        {`
          window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
          window.myWidgetParam.push({
            id: 11,
            cityid: '1227603',
            appid: 'f8358e088ce7977e04d5ef56c9e7c3bb',
            units: 'metric',
            containerid: 'openweathermap-widget-11',
          });
          (function() {
            var script = document.createElement('script');
            script.async = true;
            script.charset = "utf-8";
            script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
          })();
        `}
      </script>
    </Helmet>
    // Include the widget's container 
    <div id="openweathermap-widget-11"></div> */}
            <div className="flex justify-center mt-4 mb-4">
              <button
                onClick={() => setActiveTab("suggested")}
                className={`${
                  activeTab === "suggested"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } p-2 w-1/4 rounded-l hover:bg-blue-600`}
              >
                Suggested Places
              </button>
              <button
                onClick={() => setActiveTab("hidden")}
                className={`${
                  activeTab === "hidden"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } p-2 w-1/4 hover:bg-blue-600`}
              >
                Hidden Places
              </button>
              <button
                onClick={() => setActiveTab("favorite")}
                className={`${
                  activeTab === "favorite"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } p-2 w-1/4 hover:bg-blue-600`}
              >
                Favorite Places
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`${
                  activeTab === "experience"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } p-2 w-1/4 rounded-r hover:bg-blue-600`}
              >
                Experience
              </button>
            </div>

            {activeTab === "suggested" && (
              <div>
                {places.length > 0 && (
                  <div>
                    <h1 className="text-2xl font-bold ml-4 mb-4">
                      Suggested Places
                    </h1>
                    {errorMessage ? (
                      <p className="text-red-500">{errorMessage}</p>
                    ) : (
                      <div>
                        <div className="grid grid-cols-4 gap-4 overflow-x-auto">
                          {places.map((place, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 bg-gray-100 rounded-lg p-4 shadow-md mb-4 ml-4 mr-4"
                            >
                              <div className="mb-2">
                                {place.photos && place.photos.length > 0 ? (
                                  <img
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${api.googlePlacesKey}`}
                                    alt={`Photo of ${place.name}`}
                                    className="w-50 h-50 rounded-t-lg"
                                  />
                                ) : (
                                  <p className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-400 rounded-t-lg">
                                    Image not found
                                  </p>
                                )}
                              </div>

                              <div className="mb-2">
                                <h3 className="text-lg font-semibold">
                                  {place.name}
                                </h3>
                                <p className="text-gray-600">
                                  {place.vicinity}
                                </p>
                              </div>
                              <div className="grid grid-cols-2">
                                <div>
                                  <p>
                                    Temperature: {place.weather.temperature}°C
                                  </p>
                                  <p>Humidity: {place.weather.humidity}%</p>
                                  <p>
                                    Wind Speed: {place.weather.windSpeed} km/h
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === "hidden" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-36 m-8">
                  {hiddenPlaces.length === 0 ? (
                    <div className="bg-red-600">
                      <h1 className="text-center text-zinc-50">
                        No Records Found
                      </h1>
                    </div>
                  ) : (
                    hiddenPlaces.map((place, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
                      >
                        <img
                          src={place.image}
                          alt={place.placeName}
                          className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                          <h5 className="text-3xl font-semibold mb-2 text-gray-800">
                            {place.placeName}
                          </h5>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "favorite" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-36 m-8">
                  {favoritePlaces.length === 0 ? (
                    <div className="bg-red-600">
                      <h1 className="text-center text-zinc-50">
                        No Records Found
                      </h1>
                    </div>
                  ) : (
                    favoritePlaces.map((place, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg  overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
                      >
                        <img
                          src={place.image}
                          alt={place.placeName}
                          className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                          <h5 className="text-3xl font-semibold mb-2 text-gray-800">
                            {place.placeName}
                          </h5>
                          <p className="text-xl text-gray-500">
                            Visited Date: {place.visitedDate}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div>{/* Render content related to Experience */}</div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
