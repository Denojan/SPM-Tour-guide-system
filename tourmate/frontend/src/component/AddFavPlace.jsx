import React, { useState } from "react";
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

  async function addPlace(event) {
    event.preventDefault();

    const newPlace = {
      placeName,
      userId,
      category,
      visitedDate,
      location,
      contact,
      image,
      description,
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
    <div>
      <h2>Add Favorite Place</h2>
      <form onSubmit={addPlace}>
        <label>
          Place Name:
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            required
          />
        </label>
        <label>
          UserID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            value={visitedDate}
            onChange={(e) => setVisitedDate(e.target.value)}
            required
          />
        </label>
        {/* Image input and preview */}
        <label>
          Image:
          <input type="file" onChange={convertToBase64} required />
          {image && <img alt="pet" width={100} height={100} src={image} />}
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
}

export default AddFavPlace;
