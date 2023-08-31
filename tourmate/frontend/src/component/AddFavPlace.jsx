import React, { useEffect, useState } from "react";
import axios from "axios";

function AddFavPlace() {
  const [placeName, setPlaceName] = useState("");
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");



  const initializeGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude},${longitude}`);
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationName = async (latitude, longitude) => {

    setLatitude(latitude);
    setLongitude(longitude);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyACdwaw1h6cATe6laoMWoayEniMemjgVkE`
      );

      const formattedAddress = response.data.results[0].formatted_address;
      setCurrentLocation(formattedAddress);
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  async function addPlace(event) {
    event.preventDefault();

    const newPlace = {
      placeName,
      userId,
      category,
      visitedDate,
      location: currentLocation || location,
      contact,
      image,
      description,
      latitude,
      longitude,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/favplace/addfavplace",
        newPlace,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("Favorite place added:", response.data);

        setPlaceName("");
        setUserId("");
        setCategory("");
        setVisitedDate("");
        setLocation("");
        setContact("");
        setImage("");
        setDescription("");
        setLatitude("");
        setLongitude("");

    } catch (error) {
      console.error("Error adding favorite place:", error);
    }
  }

   
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Add Favorite Place
            </h2>
            <p className="text-gray-500 mb-6">
              Please fill out all the fields.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Place Details</p>
                  <p>Add information about your favorite place.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label htmlFor="placeName">Place Name</label>
                      <input
                        type="text"
                        name="placeName"
                        id="placeName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={placeName}
                        onChange={(e) => setPlaceName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="userId">UserID</label>
                      <input
                        type="text"
                        name="userId"
                        id="userId"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="category">Category</label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="location">Location</label>
                      <div className="flex">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={currentLocation || location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <button
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={initializeGeolocation}
                        >
                          Get Current Location
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="visitedDate">Date</label>
                      <input
                        type="text"
                        name="visitedDate"
                        id="visitedDate"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={visitedDate}
                        onChange={(e) => setVisitedDate(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="description">Description</label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={convertToBase64}
                        className="h-10 mt-1 w-full bg-gray-50"
                        accept="image/*"
                      />
                      {image && (
                        <img
                          alt="preview"
                          className="mt-2 max-h-20"
                          src={image}
                        />
                      )}
                    </div>

                    <div className="md:col-span-2 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={addPlace}
                        >
                          Add Place
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default AddFavPlace;
