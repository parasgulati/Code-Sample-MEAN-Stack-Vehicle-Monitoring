var Vehicle = require("../models/Vehicle");
var Vehicle_Point = require("../models/Vehicle_Point");

module.exports={
    all:function(req,res)
    {
        Vehicle.find({},function(err,data){
            if(err)
            {
                res.json({
                    status:500,
                    message:"Internal Server Error"
                }).send();
            }
            else if(data.length==0)
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
                    message:"Success",
                    vehicles:data
                }).send();
            }
        })
    }
    ,
    all_points:function(req,res)
    {   
        var post=req.body;
        Vehicle_Point.find({Vehicle_Number:post.Vehicle_Number},function(err,data){
            if(err)
            {
                res.json({
                    status:500,
                    message:"Internal Server Error"
                }).send();
            }
            else if(data.length==0)
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
                    message:"Success",
                    vehicle_points:data
                }).send();
            }
        })
    }
}

