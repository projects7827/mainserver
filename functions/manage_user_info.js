const Country = require('country-state-city').Country;
const State = require('country-state-city').State;
const City = require('country-state-city').City;
const nodeCache = require("node-cache")
const mongooseModel = require("./database");
let cacheMemory = new nodeCache();
let express = require("express");
let router = express.Router();

router.get("/get-data", (req, res) => { //use to get user details
    mongooseModel.find({}).then((data) => {
        res.status(200).send({ "status": "success", "data": data })
    })
})


router.post("/submit", (req, res) => { //use to submit user details
    let body = req.body
    let userData = new mongooseModel(body)
    userData.save();
    res.status(200).send({ "status": "success", "message": "Data Added Successfully" })
})


router.get("/get-input-data", (req, res) => { //use to get country,state,city list
    let response = getInputDetails(req.query)
    let statusCode;
    if (response["status"] === "success") {
        statusCode = 200
    }
    else {
        statusCode = 400
    }
    res.status(statusCode).send(response)
})


function getInputDetails(inputData = {}) {//processing of state,country and cities data
    let type = inputData["type"] === undefined ? null : inputData["type"]
    let countryCode = inputData["country_code"] === undefined ? null : inputData["country_code"]
    let stateCode = inputData["state_code"] === undefined ? null : inputData["state_code"]
    let finalData;
    if (type === "get_country") {
        let data
        if (cacheMemory.has("countryData") === true) {
            data = cacheMemory.get("countryData")
        }
        else {
            data = Country.getAllCountries()
            cacheMemory.set("countryData", data)
        }
        finalData = { "status": "success", "data": data }
    }
    else if (type === "get_state") {
        if (countryCode === null) {
            finalData = { "status": "failure", "message": "Country Code Invalid" }
        }
        else {
            finalData = { "status": "success", "data": State.getStatesOfCountry(countryCode) }
        }
    }
    else if (type === "get_city") {
        if (countryCode === null) {
            finalData = { "status": "failure", "message": "Country Code Invalid" }
        }
        else if (stateCode === null) {
            finalData = { "status": "failure", "data": "State Code Invalid" }
        }
        else {
            finalData = { "status": "success", "data": City.getCitiesOfState(countryCode, stateCode) }
        }
    }
    else {
        finalData = { "status": "failure", "data": "Invalid Type" }
    }
    return finalData
}


module.exports = router;