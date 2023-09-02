const { request } = require("express");
const WishList = require("../models/WishListModel");


//create a wish list
const createWishList = async (req, res) => {
    console.log(req.body)
  try {
    //add new list
    const newList = new WishList({
      placeName: req.body.placeName,
      userId:req.body.userId,
      packageName:req.body.packageName,
      description:req.body.description,
      lat:req.body.lat,
      long:req.body.long,
      note:req.body.note
    });

    // Save the new place to the database
    await newList.save();
    res.status(201).json({ message: "list is created", addedList: newList });
  } catch (error) {
    console.error("An error occurred:", error); 
    res
      .status(500)
      .json({ error: "Failed to add Place", errorMessage: error.message });
  }
};

 //get all the wish list for one user
const readWishListByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
            const wishlist = await WishList.find({ userId });
  
      if (!wishlist) {
        res.status(404).json({ message: "Package not found for the user" });
      } else {
        res.json({ wishlist: wishlist });
      }
    } catch (error) {
      console.error("Error fetching user's package:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  //delete one place 
const deletePlace = async (req, res) => {
  const id = req.params.id;
  const place = await WishList.findByIdAndDelete(id);

  place
    ? res.status(200).json(place)
    : res.status(400).json({ message: "place details not deleted" });
};


  //delete whole wishlist
  const deleteWishList = async (req, res) => {
    const { packageName } = req.params;
    const deletedItem = await WishList.deleteMany({ packageName });
   
    deletedItem
    ? res.status(200).json(deletedItem)
    : res.status(400).json({ message: "wish list not deleted" });
  };

  //update wishlist
  const updateWishList = async (req, res) => {
    const { id, note } = req.body;
  
    try {
      console.log(id);
      const wishlist = await WishList.findOne({ _id: id });
  
      if (!wishlist) {
        return res.status(404).json({ error: 'Wish list item not found' });
      }
  
      wishlist.note = note;
  
      await wishlist.save();
  
      res.json({ message: 'Wish list item updated', updatedList: wishlist });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Failed to update wish list item', errorMessage: error.message });
    }
  };
  
  
  module.exports = { 
     createWishList,
     readWishListByUserId,
     updateWishList,
     deletePlace,
     deleteWishList
     };