const express = require('express')
const serverless = require('serverless-http')
const router = express.Router();
const cors = require('cors')
const app = express();
// const userModal = require("./database")


app.get("/get-data", (req, res) => {
  res.send("hello")

})

// app.use('/.netlify/functions/api', router)
app.use('/', router)
app.listen(1000)
app.use(cors())
module.exports.handler = serverless(app)
