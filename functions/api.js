const express = require('express')
const serverless = require('serverless-http')
const router = express.Router();
const cors = require('cors')
let app = express();

//mongo db connection url  = mongodb+srv://prateek:<password>@cluster0.hll3k7h.mongodb.net/
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://prateek:${encodeURIComponent("Ajstyles@p1")}@cluster0.hll3k7h.mongodb.net/`).then(() => console.log("connected")).catch(err => console.log(err))
// app.listen(1000)
app.use(cors())
app.use('/.netlify/functions/api', router)
// app.use('/', router)

module.exports.handler = serverless(app)
