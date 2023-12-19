const mongoose = require("mongoose");
const flightSchema = mongoose.Schema({
    tenantId: { type: String, required: true },
    flightNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true }
});

module.exports = mongoose.model("Flight", flightSchema);
