import express from "express"
let app = express();
import cors from "cors"

app.use(cors())
app.get("/home", (req, res) => {
    res.send("home")
})

app.listen(1000)

