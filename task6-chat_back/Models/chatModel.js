// structering the data models (how would the data would be stired in our data base) 
//npm mongoose

const { default: mongoose } = require("mongoose");

//timestamps: true, when a new document is created, Mongoose will automatically set the createdAt field to the current time.
// Similarly, when a document is updated, Mongoose will automatically set the updatedAt field to the current time.
const chatModel = mongoose.Schema({
    chatName: 
    {
        type : String ,
         trim : true
    },
    //trim bch famech espace 9odem isem chat

    isGroupChat: 
    {
        type : Boolean ,
         default : false},
    //default would be false cuz usually its a normal room chat
    
    users:[
        {
            type :mongoose.Schema.Types.ObjectId,
            //feha l ID mta3 l user 
            ref: "User",
        },
    ],
    //it's array 3ala 5ater kol chat l min feha 2 users 

    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    // holding the last message sent so it'd be displayed on the chat


    groupAdmin: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},
    {
        timestamps: true,
    }





);
 const Chat = mongoose.model("Chat", chatModel)

 module.exports = Chat