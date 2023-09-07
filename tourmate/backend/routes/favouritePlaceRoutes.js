const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  addFavPlace,
  deletePlace,
  updatePlace,
  getAllLocationPlaces,
} = require("../controller/favouritePlaceController");
 console.log("route");
router.get("/getallplaces/:userid", getAllPlaces);
router.post("/addfavplace", addFavPlace);
router.delete("/deleteplace/:id", deletePlace);
router.put("/updateplace/:id", updatePlace);
router.get("/getlocationplaces/:userid", getAllLocationPlaces);
module.exports = router;
