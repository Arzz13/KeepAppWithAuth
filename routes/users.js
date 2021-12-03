const User = require("../models/usermodels");
const express = require("express");
const router = express.Router(); //This will handle the https requests.

//Get request to home route
router.get("/getdata", function (req,res){
    
    
    User.find({"username":{$ne:null}}, function(err,foundData){  //Finds all the users who has a username(means all the users).{$ne}selects the documents where the value of the field is not equal to the specified value
        if(!err){
            res.json(foundData)  //Send back the data in json format.
        }
        else{
            console.log(err);
        }
    })
});

router.get("/getuserdetails",(req,res) =>{
    const userName = req.query.username;
    User.findOne({username:userName},function(err,foundData){
        if(!err && foundData){
            res.send(foundData.notesArr)
        }
        else{
            console.log(err)
        }
    }) 
});

router.post("/save" , (req,res) => {
    const userName = req.body.username
    
    User.findOne({username:userName},function(err,foundData){
        if(!err && foundData){
            
            foundData.notesArr.push(req.body.newnote)
            foundData.save((err) =>{
                if(!err){
                    res.send({saved:true});  //We are sending back this object in order to inform the frontend and so it can carry out the further steps accordingly.
                }
                else{
                    console.log(err);
                }
            } );
        }
        else{
            console.log(err);
        }
    })
});

router.post("/delete",(req,res)=>{
    const userName = req.body.username
    const title = req.body.title
    const content = req.body.content
    User.findOneAndUpdate({username:userName},{$pull:{notesArr:{title:title,content:content}}},function(err,foundData){
        if(!err){
            res.send({deleted:true}); 
        }
        else{
            console.log(err);
        }
    })

})


router.post("/add",(req,res)=>{
    const new_user = User({
        username:req.body.username,
        password:req.body.password
    });

    new_user.save((err)=>{
        if(!err){
           console.log("successfully saved to database");
        }
        else{
            console.log(err);
        }
    });
})




module.exports= router; //We export the router object.So that,server can use this object to handle all the requests.