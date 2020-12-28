var Vehicle = require("../models/Vehicle");
var Vehicle_Point = require("../models/Vehicle_Point");

module.exports={
    create:function(req,res)
    {
        var post=req.body;
    
        var obj = new Vehicle({
            Vehicle_Number:post.Vehicle_Number,
            Driver_Name:post.Driver_Name,
            Vehicle_Type:post.Vehicle_Type,
            Fuel_Type:post.Fuel_Type
        });
  
        Vehicle.find({Vehicle_Number:post.Vehicle_Number},function(err,data){
            if(err)
            {
                res.json({
                    status:500,
                    message:"Internal Server Error"
                }).send();
            }
            else if(data.length==0)
            {
            
                obj.save();
                res.json({
                    status:200,
                    message:"Success"
                }).send();
            }
            else
            {
                res.json({
                    status:400,
                    message:"Already Exists"
                }).send();
            }
        })
    },
    create_point:function(req,res)
    {
        var post=req.body;
    
        var obj = new Vehicle_Point({
            Vehicle_Number:post.Vehicle_Number,
            Latitude:post.Latitude,
            Longitude:post.Longitude
        });
  
        Vehicle.find({Vehicle_Number:post.Vehicle_Number},function(err,data){
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
                    message:"Vehicle Not Found"
                }).send();
            }
            else
            {
                obj.save(function(err,data){
                    if(err)
                    {
                        res.json({
                            status:500,
                            message:"Internal Server Error"
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
        })
    }
}

