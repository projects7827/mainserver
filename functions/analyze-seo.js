let express = require("express")
let router = express.Router();
let analyze_seo  = require("./seo")


router.get("/", (req, res) => {
    console.log('pt')
    res.send("pt")
})

router.post("/", (req, res) => {
    if (req.body.input_url !== undefined && req.body.input_url !== null && req.body.input_url.trim() !== "") {
        let url = req.body.input_url
        analyze_seo(url, (result) => {
            res.status(200).json({ "status": 'success', data: result })
        }, (err) => {
            res.status(502).json({ "status": 'failure', data: err.toString() })
        })
    }
})


module.exports = router