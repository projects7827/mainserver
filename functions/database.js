const mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    "name": String
});

mongoose.connect(`mongodb+srv://Prateek:ajstyles@cluster0.hll3k7h.mongodb.net/Prateek`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((db) => console.log("db")).catch(err => console.log(err))//mongo db connection establishment

let userrModel = mongoose.model("datas", userSchema)
module.exports = userrModel
