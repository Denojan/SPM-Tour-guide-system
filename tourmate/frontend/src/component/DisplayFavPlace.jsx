import React, { useState, useEffect } from "react";
import axios from "axios";
import slide from "../assert/slide3.jpg"
import { Link } from "react-router-dom";


function DisplayFavPlace() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  

  useEffect(() => {
    async function fetchFavoritePlaces() {
      try {
        const response = await axios.get(
          "http://localhost:8080/favplace/getallplaces/aaa"
        );
        console.log(response);
        setFavoritePlaces(response.data.place);
      } catch (error) {
        console.error("Error fetching favorite places:", error);
      }
    }

    fetchFavoritePlaces();
  }, [favoritePlaces]);


const handleDeleteClick = async (placeId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this place?"
  );
  if (!confirmed) {
    return;
  }

  try {
    const response = await axios.delete(
      `http://localhost:8080/favplace/deleteplace/${placeId}`
    );
    console.log("Place deleted:", response.data);
    // Refresh the list after successful deletion
   
  } catch (error) {
    console.error("Error deleting place:", error);
  }
};


  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
  };

  
  const closePlaceDetails = () => {
    setSelectedPlace(null);
  };


return (
  <>
    <div>
      <img src={slide} className="w-full h-96 object-cover custom-image" />
   
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8">
      {favoritePlaces.map((place, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
        >
          <Link onClick={() => openPlaceDetails(place)}>
            <img
              src={place.image}
              alt={place.placeName}
              className="w-full h-40 object-cover"
            />
          </Link>
          <div className="p-4">
            <h5 className="text-xl font-semibold mb-2 text-gray-800">
              {place.placeName}
            </h5>
            <p className="text-sm text-gray-500">
              Visited Date: {place.visitedDate}
            </p>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(place._id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {selectedPlace && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-screen-sm">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.placeName}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedPlace.placeName}
            </h2>
            <p className="text-sm text-gray-500">
              Visited Date: {selectedPlace.visitedDate}
            </p>
            <p className="text-sm text-gray-500">
              Location: {selectedPlace.location}
            </p>
            <p className="text-sm text-gray-500">
              Contact: {selectedPlace.contact}
            </p>
            <p className="text-sm text-gray-500">
              Category: {selectedPlace.category}
            </p>
            <div className="text-sm text-gray-500 max-h-40 overflow-y-auto">
              <p>Description: {selectedPlace.description}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={closePlaceDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </>
);



    }

export default DisplayFavPlace;
