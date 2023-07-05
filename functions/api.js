const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const router = express.Router();

let app = express();

app.use(cors())

router.get('/add', (req, res) => {
    res.send("add")
})

app.use('./netlify/functions/api', router)
app.listen(1000)

module.exports.handler = serverless(app)
