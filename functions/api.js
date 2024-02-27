const express = require('express')
const serverless = require('serverless-http')
const user_info_router = require('./manage_user_info.js');
const cors = require('cors')
const app = express();
const seoRouter = require("./analyze-seo.js")

app.use(cors())
app.use(express.json())
// app.use("/analyze-seo", seoRouter)
// app.use("/", user_info_router)
// app.use('/.netlify/functions/api/analyze-seo', seoRouter)
app.use('/.netlify/functions/api', user_info_router)
app.listen(process.env.PORT || 1000, () => {
    console.log("connected")
})
module.exports.handler = serverless(app)
