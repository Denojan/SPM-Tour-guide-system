const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({

    userId: {
      type: String,
      required: true,
    },
    packageName:{
      type:String,
    },
    placeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    note:{
      type:String
    }
   
  });
  
  module.exports = mongoose.model("WishListModel", wishListSchema);