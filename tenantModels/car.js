const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
    tenantId: { type: String, required: true },
    carNumber: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    color: { type: String, required: true }
});

module.exports = mongoose.model("Car", carSchema);
