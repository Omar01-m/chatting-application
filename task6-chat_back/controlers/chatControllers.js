const asyncHandler = require("async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

//this router is responsible of creating or fetching one to one chats
const accessChat =asyncHandler(async(req,res)=> 
{
    const {userId}=req.body
    //checking if a chat with this user id already exists then return it then creat it


    if (!userId) 
    {
        console.log ("user id param yani user id not sent with the request")
        //throwing an error
        return res.Status(400)    
    }
    
    var isChat = await Chat.find(
        {
            isGroupChat: false,
            // and  trying to find both of the users the one whos logged in and the user id ili 5dhineha mil body b request
             $and:[
                //it should be equal to the loged in user
                {users:{$elemMatch:{$eq:req.user._id}}},
                //or matches the user given from the body
                {users:{$elemMatch:{$eq: userId}}},
            //$elemMatch operator to search for documents that contain both values in the same users array. 
            //
        ],
            }).populate("users","-password")//it would return me everything other than the password
            .populate("latestMessage")
            isChat = await User.populate(isChat,{
                path:"latestMessage.sender",
                select:"name pic email",
            });

    //if the chat exists
    if (isChat.length>0) {
        res.send(isChat[0]);

        
        //sending the first element in the array of chat cuz only one chat can be created between those two
    //else id creat the new chat
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        }
    }
    try{
        
        const createdChat= await Chat.create(chatData)
        //creats the new chat m3a lmsg jdid ili ba3tho l user w tamalo return
        const fullChat = await Chat.findOne({_id:createdChat._id})
        //populates the users field with the details of the users associated with the chat

        .populate("users", "-password")
        res.status(200).send(fullChat)
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }
}
)
//returning all the chats that the logged in user is a part of
const fetchChats =asyncHandler(async(req , res)=> {
    try
    {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).then(result=>res.send())
    }
    catch(error)
    {

    }
})
module.exports={accessChat , fetchChats}