import React, { useState, useEffect } from "react";
import axios from "axios";


function DisplayFavPlace() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);

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
  }, []);


  async function addToPackage(favoritePlaces) {
    try {
      const response = await axios.post(
        "http://localhost:8080/wishlist/addPlaceToPackage",
        {
          userId: "user123", // You should provide the actual user ID here
          selectedPlace: favoritePlaces,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding place to package:", error);
    }
  }

   

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {favoritePlaces.map((place, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
      >
        <a href="#!">
          <img
            src={place.image}
            alt={place.placeName}
            className="w-full h-40 object-cover"
          />
        </a>
        <div className="p-4">
          <h5 className="text-xl font-semibold mb-2 text-gray-800">
            {place.placeName}
          </h5>
          <p className="text-sm text-gray-500">
            Visited Date: {place.visitedDate}
          </p>
          <div className="mt-4 flex space-x-2">
            <button
            
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Update
            </button>
            <button
             
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>

            <button
      onClick={() => addToPackage(place)}
      className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
    >
      Add To List
    </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);



    }

export default DisplayFavPlace;
