import React, { useState, useEffect } from "react";
import axios from "axios";
import slide from "../assert/slide4.jpg";
import slide1 from "../assert/back2.jpeg";
import { Link } from "react-router-dom";

function DisplayFavPlace() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [filterOption, setFilterOption] = useState("All");
  const [userId, setUserId] = useState("user1");

  useEffect(() => {
    async function fetchFavoritePlaces() {
    
      try {
      
        const response = await axios.get(
          `http://localhost:8080/favplace/getallplaces/${userId}`
        );
        console.log(response);
        setFavoritePlaces(response.data.place);
      } catch (error) {
        console.error("Error fetching favorite places:", error);
      }
    }

    fetchFavoritePlaces();
  }, []);


  // async function addList(place) {
  //   const newPlace = {
  //     placeName2: place.name,

  //     userId: "user2",

  //     placeName: place.placeName,

  //     description: place.vicinity,

  //     // lat: place.geometry.location.lat,

  //     // long: place.geometry.location.lng,

  //     note: "",
  //   };

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/wishlist/create",

    //     newPlace,

    //     {
    //       headers: {
    //         "Content-Type": "application/json",

    //         Accept: "application/json",

    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     }
    //   );

      // console.log("List added:", response.data);

      // Update the recommendations state to include the new place

      //   setRecommendations((prevRecommendations) => [...prevRecommendations, newPlace]);
  //   } catch (error) {
  //     console.error("Error adding list:", error);
  //   }
  // }

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

  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get(`http://localhost:8080/favplace/getallplaces/${userId}`)
      .then((res) => {
        if (res.data.place) {
          filterContent(res.data.place, searchTerm);
        }
      });
  };

  function filterContent(place, searchTerm) {
    const result = place.filter((r) =>
      r.placeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFavoritePlaces(result);
  }

  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
    setDropdownIndex(null)
  };

  const closePlaceDetails = () => {
    setSelectedPlace(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="pb-10">
      <div className="relative">
        <img src={slide} className="w-full h-96 object-cover custom-image" />
        <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black text-6xl text-center font-bold bg-opacity-50 px-4 py-2 ">
          Favourite Places with Your Favourite Memories
        </p>

        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative ml-[42%] mt-[-10%] z-30">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 ml-10 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              onChange={handleTextSearch}
              id="default-search"
              className="block w-1/2 h-16 ml-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search the location..."
              required
            />
          </div>
          <div class=" -mt-[60px] relative ml-[420px] ">
            <select
              id="countries"
              value={filterOption}
              onChange={handleFilterChange}
              class="bg-[#f1f1f1] h-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="All">
                All Favouirite Place and Hottel
              </option>
              <option value="Favourite Place">Favourite Place</option>
              <option value="Favourite Hotel">Favourite Hotel</option>
              <option value="Natural Attractions">Natural Attractions</option>
              <option value=" Cultural and Historical Sites">
                Cultural and Historical Sites
              </option>
              <option value="Adventure and Outdoor Activities">
                Adventure and Outdoor Activities
              </option>
              <option value="Wildlife and Safari Tours">
                {" "}
                Wildlife and Safari Tours
              </option>
              <option value="Culinary and Food Tourism">
                {" "}
                Culinary and Food Tourism
              </option>
            </select>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-36 m-8">
        {favoritePlaces.length === 0 ? (
          <div className="bg-red-600">
            <h1 className="text-center text-zinc-50">No Records Found</h1>
          </div>
        ) : (
          favoritePlaces
            .filter((r) =>
              filterOption === "All"
                ? true
                : r.category === filterOption || r.placeType === filterOption
            )
            .map((place, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg  overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
              >
                <div className="absolute top-0 right-0 m-2 cursor-pointer">
                  <div
                    onClick={() => toggleDropdown(index)}
                    className="text-white hover:text-gray-800 text-2xl font-extrabold"
                  >
                    ...
                  </div>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10">
                      <ul>
                        <li>
                          <button className="block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-200">
                            <Link to={`/updateplace/${place._id}`}>Edit</Link>
                          </button>
                        </li>
                        {/* <li>
                          <button
                            onClick={() =>addList(place)}
                            className="block w-full py-2 px-4 text-left text-green-600 hover:bg-red-200"
                          >
                            Add to Trip
                          </button>
                        </li> */}
                        <li>
                          <button
                            onClick={() => handleDeleteClick(place._id)}
                            className="block w-full py-2 px-4 text-left text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link onClick={() => openPlaceDetails(place)}>
                  <img
                    src={place.image}
                    alt={place.placeName}
                    className="w-full h-40 object-cover"
                  />
                </Link>
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
        {selectedPlace && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-lg max-w-screen-sm font-">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.placeName}
                className="w-full h-40 object-cover"
              />
              <h2 className="text-3xl font-semibold mb-2 text-gray-800">
                {selectedPlace.placeName}
              </h2>
              <p className="text-lg font-semibold text-blue-950">
                Visited Date:{"  "}
                <span className="ml-3 text-lg text-orange-600">
                  {selectedPlace.visitedDate}
                </span>
              </p>
              <span></span>
              <p className="text-lg font-semibold text-blue-950">
                Location:
                <span className="ml-3 text-lg text-sky-700">
                  {selectedPlace.location}
                </span>
              </p>
              <span></span>
              <p className="text-lg font-semibold text-blue-950">
                Contact:{" "}
                <span className="ml-3 text-lg text-sky-700">
                  {selectedPlace.contact}
                </span>
              </p>
              <span></span>
              <span></span>
              <p className="text-lg font-semibold text-blue-950">
                Category:{" "}
                <span className=" ml-3 text-lg text-sky-700">
                  {selectedPlace.category}
                </span>
              </p>
              <span></span>
              <p className="text-lg font-semibold text-blue-950">
                Description:{" "}
              </p>
              <br></br>
              <textarea className="w-[30em] h-40 text-lg" disabled>
                {selectedPlace.description}
              </textarea>

              <div className="mt-4 flex justify-center">
                {" "}
                {/* Center the button */}
                <button
                  className="px-4 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={closePlaceDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayFavPlace;
