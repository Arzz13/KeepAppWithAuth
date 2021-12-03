const mongoose=require("mongoose");


//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true    //Should definitely be present for a document.
    },
    password:{
        type:String,
        required:true
    },
    notesArr:{
        type:Array
    }
});

//Model creation as constructor.
const User=mongoose.model("User",userSchema);

module.exports=User;  //So that other files can import this constructor.