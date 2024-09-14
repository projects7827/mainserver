
const mongooseModel = require("../models/employee");
let express = require("express");
let router = express.Router();
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')


router.use((req, res, next) => {
    if (req.originalUrl === "/employee/login") {
        next();
    }
    else {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'invalid_token' });
            }
            else if (user.email === process.env.ADMIN_EMAIL && user.password === process.env.ADMIN_PASSWORD) {
                next();
            }

        });

    }

})

router.post('/login', async (req, res) => {

    let input_password = req.body.password
    let input_email = req.body.email

   
    if (input_email !== process.env.ADMIN_EMAIL) {
        return res.status(400).json({ message: 'wrong_email' });
    }
    else if (input_password !== process.env.ADMIN_PASSWORD) {
        return res.status(400).json({ message: 'wrong_password' });
    }
    const token = jwt.sign({ email: input_email, "password": input_password }, process.env.JWT_SECRET, {
        expiresIn: '1d',  // Token expiry time
    });

    res.send({ "email": input_email, token, "password": input_password });
});

router.put("/", (req, res) => { //use to edit employee details
    let body = req.body
    mongooseModel.updateOne({ id: body.id }, { $set: body }).then((data) => {
        res.status(200).send({ "status": "success", "message": "Data Edited Successfully" })
    })
})

router.delete("/", (req, res) => { //use to delete employee details
    let body = req.body
    mongooseModel.deleteOne({ id: body.id }).then((data) => {
        return res.status(200).send({ "status": "success", data })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ "status": "error", "message": "internal servr error" })
    })
})

router.post("/", (req, res) => {//use to add employee details
    let body = req.body
    body['id'] = Math.floor(Math.random() * 10000)
    mongooseModel.insertMany(body).then(() => {
        res.status(200).send({ "status": "success", "message": "Data Added Successfully" })
    }).catch(() => {
        console.log(err)
        res.status(500).send({ "status": "error", "message": "internal servr error" })
    })
})

router.get("/", (req, res) => { //use to get employee details
    try {
        mongooseModel.find({}).then((data) => {
            res.send({ "data": data, "status": "success" })
        })
    }
    catch (err) {
        console.log(err)
        res.send({ "data": data, "status": "error" })
    }
})




module.exports = router;