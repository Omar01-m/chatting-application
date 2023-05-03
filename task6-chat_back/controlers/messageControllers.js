const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel")
const Chat = require("../Models/chatModel");

// send a new message
const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  // check if content and chatId exists
  if (!content) {
    console.log("content isn't correct");
    return res.sendStatus(400);
  }
  if (!chatId) {
    console.log("chatid isn't correct");
    return res.sendStatus(400);
  }

  // create a new message
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  // query the database to save the new message
  try {
    var message = await Message.create(newMessage);

    //populiting the content of the new message



    message =await message.populate("sender" , "name pic ")
    //populate() is used to fill in the details of the sender field by fetching the referenced User document and
    // including only the name and pic fields.

    message =await message.populate("chat ")
/*   populate the chat field of the message object with its corresponding 
document from the chats collection in the database. */
    message =await User.populate(message, {
        path : "chat.users",
        select:"name pic email",


    })
    // 2e5er message yod5el yet7at f the latest mesg wfindByIdAndUpdate just to find the id and to update it
    await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage : message,

    })


    res.json(message)

  } catch (error) {
    res.status(400)
    console.log(error);
    throw new Error(error.message)


}
});
 
const allMessages =asyncHandler ( async(req, res )=> 
{
    try{
        const messages = await Message.find({ chat : req.params.chatId /* using the request thingie to access the parametre cha tId */})
        .populate("sender " , "name pic email")
        .populate("chat");
        res.json(messages)
    }catch(error){
        res.status(400)
        throw new Error(error.messages )
    }



})


module.exports = { sendMessages , allMessages };
// gonna populate the user's  id array 