const express = require('express')
const serverless = require('serverless-http')
const user_info_router = require('../routes/manage_user_info.js');
const cors = require('cors')
const app = express();
const seoRouter = require("../routes/analyze-seo.js")
let mongoose = require('mongoose')
let employee_router = require("../routes/employee.js")
require('dotenv').config()

function main() {
    app.use(cors())
    app.use(express.json())
    // app.use("/analyze-seo", seoRouter)
    // app.use("/", user_info_router)
    // app.use('/.netlify/functions/api/analyze-seo', seoRouter)
    // app.use('/.netlify/functions/api', user_info_router)
    if (process.env.ENVIRONMENT === "development") {
        app.use("/analyze-seo", seoRouter)
        app.use("/", user_info_router)
        app.use('/employee', employee_router)

        app.listen(process.env.PORT, () => {
            console.log("connected")
        })
    }
    else {
        app.use('/.netlify/functions/api/analyze-seo', seoRouter)
        app.use('/.netlify/functions/api', user_info_router)
        app.use('/.netlify/functions/api/employee', employee_router)
    }
}

mongoose.connect(`mongodb+srv://Prateek:ajstyles@cluster0.hll3k7h.mongodb.net/Prateek`,).then((db) => {
}).catch(err => console.log(err))//mongo db connection establishment

main();


module.exports.handler = serverless(app)
