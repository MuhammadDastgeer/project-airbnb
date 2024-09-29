const Listing = require("../models/listing.js");
const review = require("../models/review.js");


// create review
module.exports.review = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Created")
    res.redirect(`/listings/${listing._id}`);
};

//Delete review
module.exports.Deletereview = async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    let deletedreview = await review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Delete")
    res.redirect(`/listings/${id}`)

};