const mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "country": String,
    "state": String,
    "city": String,
    "gender": String,
    "dob": Date,
    "age": Number
});

let userrModel = mongoose.model("datas", userSchema)
module.exports = userrModel
