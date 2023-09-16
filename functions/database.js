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

mongoose.connect(`mongodb+srv://Prateek:ajstyles@cluster0.hll3k7h.mongodb.net/Prateek`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((db) => console.log('db connected')).catch(err => console.log(err))//mongo db connection establishment

let userrModel = mongoose.model("datas", userSchema)
module.exports = userrModel
