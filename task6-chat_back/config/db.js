const mongoose = require("mongoose");
const connectDB = async() =>{
    try
    {
        const conn = await mongoose.connect("mongodb+srv://omar2:omar2@cluster0.yvreym7.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology : true

            });
            console.log(`mongosseee ye5dem : ${conn.connection.host}`);

    } catch(error)
    {
        console.log(`8aleet error 404 : ${error.message}`);
        process.exit();
    }
};
module.exports = connectDB;