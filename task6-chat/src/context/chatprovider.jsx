import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate  /*,useHistory*/} from "react-router-dom";
const ChatContext = createContext()

//wrapping all of our app

const ChatProvider = ({children})=>{
const[user, setUser]= useState()
const navigate = useNavigate();

const[selectedChat, setSelectedChat]= useState()
//so we can populate all of our cjats in this current cht state
const[chats, setChats]= useState()


//const history = useHistory()
//when  u log in or sing up all the info will be stored in the local storage
useEffect(()=>{
   const userInfo= JSON.parse(localStorage.getItem("userInfo"))
   //storing it in the setuser statte
   setUser(userInfo)



   // if the user is not logged in he will be reindered to the log in page
//    if (!userInfo) {
//      // or if it didn't work we can use thishistory.push("/")
//     navigate("/");
//    }
},[navigate])

    return(<ChatContext.Provider value={{user, setUser,selectedChat, setSelectedChat,chats, setChats}} >
        {children}
        </ChatContext.Provider>) 
}


export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider
