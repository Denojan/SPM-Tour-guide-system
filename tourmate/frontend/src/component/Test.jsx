import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "900px",
};

const center = {
  lat: 7.8731, // Default center for the map
  lng: 80.7718,
};

function Map() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  // Create an array of path coordinates for the polyline
 useEffect(() => {
   // Update pathCoordinates when favoritePlaces are updated
   setPathCoordinates(
     favoritePlaces.map((place) => ({
       lat: place.latitude,
       lng: place.longitude,
     }))
   );
 }, [favoritePlaces]);

  console.log(pathCoordinates)

  return (
    <LoadScript googleMapsApiKey="AIzaSyACdwaw1h6cATe6laoMWoayEniMemjgVkE">
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
              <img
                src={selectedPlace.image}
                alt={selectedPlace.placeName}
                className="w-full h-40 object-cover"
              />
              <h2>{selectedPlace.placeName}</h2>
              <p>Visited Date: {selectedPlace.visitedDate}</p>
              {/* Add more details here */}
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
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
