const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  //Required to establish communication between react(client) and (server)node. Since, both origins are different ,we need both of them to comply.
const path=require("path");
const bodyParser=require("body-parser");
const users=require("./routes/users");

const app = express();

app.use(express.json());  //method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(cors());  //Allows all corss origin requests.
app.use(bodyParser.urlencoded({extended:true}));

//Connect node with data base atlas.

mongoose.connect(
    "mongodb+srv://Arshad:13may2001@keepappcluster.5uqgf.mongodb.net/keeperDB?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
);

/*Connect node with data base locally.
mongoose.connect("mongodb://localhost:27017/keeperDB", {

//All three options are for using the new additions in mongodb.
    useNewUrlParser: true,  //Old url parser is deprecated.SO, to use new url parser, use this.
    useUnifiedTopology: true, //False by default. Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.
    useCreateIndex: true  //False by default. Set to true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
});
*/
const db = mongoose.connection;
db.once('open', () => console.log("Connection to database is successful"));  //Once connection established ,tell that connection is successful.Afterwards,this won't execute.


//("/") will match any path that follows "/" and makes request to server. When that happens, then code in users.js will be executed 
app.use("/",users); //Maps '/' route to users file.



const PORT=process.env.PORT || 4000; //when the application is running locally, the server will be hosted at PORT 4000.
//but once is deployed, Heroku will run the server in any available PORT


//---------------FOR DEPLOYMENT--------------------------------------------------------------------------------------

/*
if ( process.env.NODE_ENV == "production"){  //if production mode,then get from here 
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
*/

//---------------FOR DEPLOYMENT--------------------------------------------------------------------------------------



//Listen to the port for any requests or messages from the browser or frontEnd.
app.listen(PORT, function() {
    console.log("Node Server started on port 4000");
});
