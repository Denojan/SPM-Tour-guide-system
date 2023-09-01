import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "900px",
};

const libraries = ["geometry", "directions"];

const center = {
  lat: 7.8731, // Default center for the map
  lng: 80.7718,
};

function Map() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directions, setDirections] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchFavoritePlaces() {
      try {
        const response = await axios.get(
          "http://localhost:8080/favplace/getallplaces/aaa"
        );
        const placesWithCoordinates = await getCoordinatesForPlaces(
          response.data.place
        );
        setFavoritePlaces(placesWithCoordinates);
      } catch (error) {
        console.error("Error fetching favorite places:", error);
      }
    }

    fetchFavoritePlaces();
  }, []);

  async function getCoordinatesForPlaces(places) {
    const placesWithCoordinates = [];

    for (const place of places) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            place.location
          )}&key=AIzaSyACdwaw1h6cATe6laoMWoayEniMemjgVkE`
        );

        const result = response.data.results[0];
        if (result) {
          const { lat, lng } = result.geometry.location;
          placesWithCoordinates.push({
            ...place,
            latitude: lat,
            longitude: lng,
          });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }

    return placesWithCoordinates;
  }

  useEffect(() => {
    // Update pathCoordinates when favoritePlaces are updated
    setPathCoordinates(
      favoritePlaces.map((place) => ({
        lat: place.latitude,
        lng: place.longitude,
      }))
    );
  }, [favoritePlaces]);

  const handleDirectionsClick = (place) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const directionsService = new window.google.maps.DirectionsService();

          // Specify the origin and destination
          const origin = new window.google.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          );
          const destination = new window.google.maps.LatLng(
            place.latitude,
            place.longitude
          );

          // Calculate directions
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`Error fetching directions: ${status}`);
              }
            }
          );
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Update weather data when selectedPlace changes
    if (selectedPlace) {
      fetchWeather(selectedPlace.latitude, selectedPlace.longitude);
    } else {
      setWeather(null); // Clear weather data when no marker is selected
    }
  }, [selectedPlace]);

  const fetchWeather = async (lat, lng) => {
    try {
      // Replace with your weather API key and API endpoint
      const apiKey = "YOUR_WEATHER_API_KEY";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=630c69f94c458f628031272842978ea3&units=metric`
      );

      const weatherData = response.data;

      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyACdwaw1h6cATe6laoMWoayEniMemjgVkE"
      libraries={libraries}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {favoritePlaces.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.latitude, lng: place.longitude }}
            title={place.placeName}
            onClick={() => setSelectedPlace(place)} // Set selected place when marker is clicked
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(null)} // Clear selected place when InfoWindow is closed
          >
            {/* InfoWindow content */}
            <div>
              {selectedPlace && (
                <div>
                  <button onClick={() => handleDirectionsClick(selectedPlace)}>
                    Get Directions
                  </button>
                </div>
              )}

              <img
                src={selectedPlace.image}
                alt={selectedPlace.placeName}
                className="w-full h-40 object-cover"
              />
              <h2>{selectedPlace.placeName}</h2>
              <p>Visited Date: {selectedPlace.visitedDate}</p>

              {weather && (
                <div>
                  <h3>Weather Information</h3>
                  <p>Temperature: {weather.main.temp}°C</p>
                  <p>Weather Condition: {weather.weather[0].description}</p>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
        {/* Draw the polyline connecting favorite places */}
        {pathCoordinates.length > 0 && (
          <Polyline
            path={pathCoordinates}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}
        {/* Display directions on the map */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#007bff",
              },
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
