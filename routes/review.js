const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsnc = require("../utils/wrapAsnc.js")
const ExpressError = require("../utils/ExpressError.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn } = require("../middleware.js")
const reviewcontrollers = require("../controllers/review.js")



// review 
// create review rotes
router.post("/", validateReview, isLoggedIn, wrapAsnc(reviewcontrollers.review));

//Delete review Route
router.delete("/:reviewid", isLoggedIn, wrapAsnc(reviewcontrollers.Deletereview));

module.exports = router;