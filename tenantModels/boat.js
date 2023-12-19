const mongoose = require("mongoose");

const boatSchema = mongoose.Schema({
    tenantId: { type: String, required: true },
    boatName: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Boat", boatSchema);
