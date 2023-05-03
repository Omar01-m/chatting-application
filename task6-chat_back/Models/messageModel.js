 // structering the data models (how would the data would be stired in our data base) 
// tiemsstamps adds createdAt and updatedAt fields to the message model.

const { default: mongoose } = require("mongoose");


const messageModel = mongoose.Schema({
   sender:{
    type : mongoose.Schema.Types.ObjectId ,
    ref:"User"
   },
   content : 
   {
    type : String,
    trim : true
   },
   chat:{
    type : mongoose.Schema.Types.ObjectId ,
    ref:"Chat"
   },

},

{
    timestamps: true,
}



);
 const Message = mongoose.model("Message", messageModel)

 module.exports = Message