const express = require("express")
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsnc = require("../utils/wrapAsnc.js")

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingcontrollers = require("../controllers/listings.js")


router.route("/")
    .get(wrapAsnc(listingcontrollers.index))
    .post(isLoggedIn, validateListing, wrapAsnc(listingcontrollers.Createlisting));


//New form Route
router.get("/new", isLoggedIn, listingcontrollers.newformrender);

router.route("/:id")
    .get(listingcontrollers.showlisting)
    .put(isLoggedIn, isOwner, validateListing, wrapAsnc(listingcontrollers.Updatelisting))
    .delete(isLoggedIn, isOwner, wrapAsnc(listingcontrollers.Deletelisting));







//Edit listing Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsnc(listingcontrollers.Editlisting));



module.exports = router;