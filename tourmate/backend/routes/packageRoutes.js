const express = require("express");
const router = express.Router();
const {
    addPlaceToPackage,
} = require("../controller/packageController");
 console.log("route");

router.post('/addPlaceToPackage', addPlaceToPackage);


module.exports = router;