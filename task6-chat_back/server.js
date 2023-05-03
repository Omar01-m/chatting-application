const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db.js");

const userRoutes = require("./routes/userRoutes.js");

//const messageRoutes = require("./routes/messageRoutes.js");

const chatRoutrs = require("./routes/chatRoutrs.js");



dotenv.config();
connectDB();

const app = express();



//  taking infos(values ) from our front end so the server should accept the json data
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.get('/api/chat', (req, res) => {

    res.send('Hello from server! from chat ');
  });



app.get('/',(req,res) =>{
    res.send(" API ye5dem on 5000");
});



/*an endpoint is a URL (Uniform Resource Locator) that clients can use to communicate with a server. An endpoint typically represents
 a specific resource or functionality that is provided by the server, and clients can send requests to the endpoint to perform actions 
 such as retrieving, creating, updating, or deleting data.*/
//adding an endpoint for the users
app.use('/api/user', userRoutes);

app.get('/api/user',(req,res) =>{
  res.send(" API  user ye5dem on 5000");
});


//api endpoint for chat creation
app.use("/api/chat",chatRoutrs)




//app.use('/api/message', messageRoutes);



const port = process.env.port || 5000;
app.listen(5000,console.log("server ye5dem on 5000"));

