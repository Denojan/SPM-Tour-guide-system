import React, { useEffect, useState } from "react";
import bg from "../asserts/bg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; 
import NavBar from "./NavBar";

function Wishlist() {
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/wishlist/getWishlist/user2";
    axios
      .get(apiUrl)
      .then((response) => {
        setPlacesData(response.data.wishlist);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);




  const removeWishlist = (placeName) => {
    const deleteUrl = `http://localhost:8080/wishlist/deleteWishList/${placeName}`;

    axios
      .delete(deleteUrl)
      .then(() => {
        // Remove the package from the state
        setPlacesData((prevData) =>
          prevData.filter((place) => place.placeName !== placeName)
        );

        // Optionally, display a success toast
        toast.success(`Removed ${placeName} from wishlist.`);
      })
      .catch((error) => {
        console.error("Error removing package:", error);
        // Optionally, display an error toast
        toast.error(`Error removing ${placeName} from wishlist.`);
      });
  };



  const handleDeleteClick = async (placeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!confirmed) {
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:8080/wishlist/deletePlace/${placeId}`
      );
      console.log("Place deleted:", response.data);
      // Refresh the list after successful deletion
      window.location.reload();
     
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };
   console.log(handleDeleteClick)

//   console.log(placesData);


return (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex flex-col items-center">
      {/* Your existing content */}
      <h1
  className="text-6xl font-bold mb-4 mt-4"
  style={{
    fontFamily: 'Brush Script MT, cursive',

  }}
>
  My Trips
</h1>

      <div className="main">
        <div>
          <div className="overflow-y-auto" style={{ maxHeight: '100%', overflow: 'hidden' }}>
            {Array.from(new Set(placesData.map((place) => place.placeName))).map((placeName) => (
              <div key={placeName}>
                <div>
                  <h2 className="text-2xl font-bold mb-4 ml-5">{placeName}</h2>
                  <button
                    type="button"
                    className="ml-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                    onClick={() => removeWishlist(placeName)}
                  >
                    Remove
                  </button>
                  <Link to="/searchPlaces">
                    <button
                      type="button"
                      class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                       + Add New Place
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {placesData
                    .filter((place) => place.placeName === placeName)
                    .map((place) => (
                      <div
                        key={place._id}
                        className="card m-2 bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                          {place.placeName2}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">{place.description}</p>
                        {/* <p className="text-gray-500 dark:text-gray-400">Open Hours: {place.openhours}</p> */}
                        <div className="flex justify-end mt-2">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                            onClick={() => handleDeleteClick(place._id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                          >
                            Note
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <hr
                  className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-690"
                  style={{ marginLeft: '35px', marginRight: '35px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
  

                        }  

export default Wishlist;
