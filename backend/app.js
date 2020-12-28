const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const API = express();

require('dotenv/config');


API.use(cors());
API.use(bodyParser.json());
API.use(bodyParser.urlencoded({extended:false}));

function Authenticate(req,res,next)
{
    if(process.env.API_KEY==req.body.API_KEY)
    {
        next();
    }
    else
    {
        res.json({
            status:401,
            message:"Unauthorized"
        }).send();
    }
}

/*
function Validation(req,res,next)
{
    const email = req.body.email;
    const password = req.body.password;
    var email_pattern = /^[A-Za-z0-9_]@^[A-Za-z].^[A-Za-z]/;
    var password_pattern = /^[A-Za-z0-9@_]/

    if(email_pattern.test(email) && password_pattern.test(password))
        next();
    else
    {
        res.status(406).json({
            message:"Not Acceptable"
        }).send();
    }
}
*/
var loginAPI = require("./routes/loginAPI.js")
var createAPI = require("./routes/createAPI.js");
var fetchAPI = require("./routes/fetchAPI.js");

API.use('/authenication',Authenticate,loginAPI);
API.use('/create',Authenticate,createAPI);
API.use('/fetch',Authenticate,fetchAPI);

const port =process.env.PORT | 3000;
API.listen(port);
