const express = require('express');
const router = express.Router();
const {
    createWishList,
    readWishListByUserId,
    updateWishList,
    deletePlace,
    deleteWishList
} = require("../controller/wishListController");
 console.log("route");


router.post('/create', createWishList);
router.get('/getWishlist/:userId', readWishListByUserId);
router.put('/updateWishList/:placeName', updateWishList);
router.delete('/deletePlace/:id',deletePlace);
router.delete('/deleteWishList/:placeName',deleteWishList);



module.exports = router;
