const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  addFavPlace,
  deletePlace,
  updatePlace,
} = require("../controller/favouritePlaceController");
 console.log("route");
router.get("/getallplaces/:userid", getAllPlaces);
router.post("/addfavplace", addFavPlace);
router.delete("/deleteplace/:id", deletePlace);
router.put("/updateplace/:id", updatePlace);

module.exports = router;
