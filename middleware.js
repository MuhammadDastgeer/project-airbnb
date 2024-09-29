const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must b logged in to create listing");
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;  // Destructure the id from req.params
    let listing = await Listing.findById(id);  // Fetch the listing by its id

    // Check if the current user is the owner of the listing
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You no own this listing");  // Display error message
        return res.redirect(`/listings/${id}`);  // Redirect the user back to the listing
    }
    next()

};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// module.exports.isReviewAuthor = async (req, res, next) => {
//     let { id, reviewId } = req.params;
//     let review = await Review.findById(reviewId);
//     if (!review.author.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the author of this review");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// }

