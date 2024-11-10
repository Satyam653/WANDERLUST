const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const {isLoggedIn,isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")

//Index Route
router.get("/",wrapAsync(listingController.index));

 //New Route
 router.get("/new",isLoggedIn,listingController.renderNewForm);

 //Show Route
 router.get("/:id", wrapAsync(listingController.showListing));

 //Create Route
 router.post("/",isLoggedIn,
 upload.single("listing[image]"),
 validateListing,
 wrapAsync(listingController.createListing));

 
 //edit route
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//Update Route

router.put("/:id",isLoggedIn,
isOwner,
upload.single("listing[image]"),
validateListing, 
wrapAsync(listingController.updateListing));


  //delete
  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));
  
module.exports = router;