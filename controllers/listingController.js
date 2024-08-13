const Listing = require("../models/listing");
const errorHandler = require("../utils/error");


exports.createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

exports.deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
}


exports.updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only update your own listings!"));
    }

    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
}


exports.getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}


exports.getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        //pag hindi sinelect yung offer makikita yung parin lahat ng listing. kapag sinelect naman yung offer makikita lang yung mismong merong offer
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        //same logic sa offer
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] }
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.body.searchTerm || '';

        const sort = req.body.sort || 'createdAt';

        const order = req.body.order || "desc";

        const listings = await Listing.find({
            // yung i dito ay pwede kahit upper or lower case yung letter
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}