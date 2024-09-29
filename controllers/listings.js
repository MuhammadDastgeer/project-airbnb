const Listing = require("../models/listing.js");


//Listing
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
};

//New form Route
module.exports.newformrender = (req, res) => {

    res.render("listings/new.ejs")
};

//Show listing Route

module.exports.showlisting = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing })
};

//Create listing
module.exports.Createlisting = async (req, res, next) => {

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Listing Created")
    res.redirect("/listings");

};

//Edit listing 
module.exports.Editlisting = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

//Update listing
module.exports.Updatelisting = async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Update")
    res.redirect(`/listings/${id}`);
};

//Delete listing
module.exports.Deletelisting = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Delete")
    res.redirect("/listings");
};