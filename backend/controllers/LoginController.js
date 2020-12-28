var express = require("express");
var User = require("../models/User");
var mongoose = require("../database");

module.exports={
    login:function(req,res)
    {
        var post=req.body;
        
        User.findOne({email:post.email,password:post.password},function(err,data){
            if(err)
            {
                res.json({
                    status:500,
                    message:"Internal Server Error"
                }).send();
            }
            else if(data==null)
            {
                res.json({
                    status:404,
                    message:"Not Found"
                }).send();
            }
            else
            {
                res.json({
                    status:200,
                    message:"Success"
                }).send();
            }
        })
    }
}

