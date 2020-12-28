const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@cluster0.y2kbu.mongodb.net/'+process.env.MONGODB_DBNAME+'?retryWrites=true&w=majority',{'useUnifiedTopology':true})
.then(()=>{
    console.log('database connected');
})
.catch((error)=>{
    console.log('database connectivity failed = '+error);
});
mongoose.set('useFindAndModify', false);

module.exports=mongoose;