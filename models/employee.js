const mongoose = require("mongoose")

var employee_schema = new mongoose.Schema({
    "id": { "type": Number },
    "full_name": { "type": String, default: null },
    "email": { "type": String, default: null },
    "mobile": { "type": Number, default: null },
    "post": { type: String, default: null },
    "join_date": { type: Date, default: null },
    "leave_date": { type: Date, default: null },
    "address": { type: String, default: null },
    "experience": { "type": Number, default: null },
    "salary": { type: Number, default: null },
    "city": { "type": String, default: null },
    "state": { "type": String, default: null },
    "country": { "type": String, default: null },
    "postal_code": { "type": Number, default: null },
    "gender": { "type": String, default: null },
    "dob": { "type": String, default: null },
});

let employee_model = mongoose.model("employees", employee_schema)
module.exports = employee_model
