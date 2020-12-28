const mongoose = require("mongoose");
const Vehicle_Point = mongoose.Schema({
    Vehicle_Number:{type:String},
    Latitude:{type:String},
    Longitude:{type:String}
})
module.exports = mongoose.model("Vehicle_Point",Vehicle_Point);