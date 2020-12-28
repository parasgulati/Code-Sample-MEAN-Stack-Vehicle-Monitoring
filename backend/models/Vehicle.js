const mongoose = require("mongoose");
const Vehicle = mongoose.Schema({
    Vehicle_Number:{type:String},
    Driver_Name:{type:String},
    Vehicle_Type:{type:String},
    Fuel_Type:{type:String}
})
module.exports = mongoose.model("Vehicle",Vehicle);