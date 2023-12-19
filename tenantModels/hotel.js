const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    tenantId: { type: String, required: true },
    hotelName: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    amenities: { type: [String], required: true },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, required: true }
});

module.exports = mongoose.model("Hotel", hotelSchema);
