const favouritePlace = require("../models/FavouritePlaceModel");

//-----get all places for specific user----

const getAllPlaces = async (req, res) => {
  try {
    const userId = req.params.userid;

    // Retrieve all the tasks related to the specific employee ID
    const place = await favouritePlace.find({ userId: userId });
    res.status(200).json({ place });
  } catch (error) {
    console.error("An error occurred:", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to add Place", errorMessage: error.message });
  }
};

const addFavPlace = async (req, res) => {
    console.log("contrl")
  try {
    //add new place
    const newPlace = new favouritePlace({
      placeName2: req.body.placeName2,
      userId: req.body.userId,
      category: req.body.category,
      visitedDate: req.body.visitedDate,
      location: req.body.location,
      contact: req.body.contact,
      image: req.body.image,
      description: req.body.description,
    });

    // Save the new place to the database
    await newPlace.save();
    res.status(201).json({ message: "Place is added", addedPlace: newPlace });
  } catch (error) {
    console.error("An error occurred:", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to add Place", errorMessage: error.message });
  }
};

//------delete tasks------

const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the profile exists
    const deletedPlace = await favouritePlace.findOne({ _id: id });
    if (!deletedPlace) {
      return res.status(404).json({ error: "place not found" });
    }
    // Delete the profile
    await favouritePlace.findOneAndDelete({ _id: id });

    return res
      .status(200)
      .json({ message: "Task deleted successfully", deletedPlace });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update place details

const updatePlace = async (req, res) => {
  const { id } = req.params;
  const {
      newPlaceName,
      newUserId,
      newCategory,
      newVisitedDate,
      newLocation,
      newContact,
      newImage,
      newDescription,
  } = req.body;

  const updateData = {
    placeName2: newPlaceName,
    userId: newUserId,
    category: newCategory,
    visitedDate: newVisitedDate,
    location: newLocation,
    contact: newContact,
    image: newImage,
    description: newDescription,
  };

  try {
   
    const updatePlace = await favouritePlace.findOne({ _id: id });

    if (!updatePlace) {
      return res.status(404).send({ error: "Place is not found" });
    }

    await favouritePlace.findOneAndUpdate({ _id: id }, updateData);

    // Return success response
    res.status(200).send({ status: "place details updated" });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllPlaces,
  addFavPlace,
  deletePlace,
  updatePlace,

};
