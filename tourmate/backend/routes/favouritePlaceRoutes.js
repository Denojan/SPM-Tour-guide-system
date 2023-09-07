const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  addFavPlace,
  deletePlace,
  updatePlace,
  getHiddenPlaces,
  getHiddenSpecificUser,
  getAnyPlace,
} = require("../controller/favouritePlaceController");
 console.log("route");
router.get("/getallplaces/:userid", getAllPlaces);
router.post("/addfavplace", addFavPlace);
router.delete("/deleteplace/:id", deletePlace);
router.put("/updateplace/:id", updatePlace);
router.get("/gethidden", getHiddenPlaces);
router.get("/gethiddenspecific/:userid", getHiddenSpecificUser);
router.get("/getanyplace/:id", getAnyPlace);
module.exports = router;
