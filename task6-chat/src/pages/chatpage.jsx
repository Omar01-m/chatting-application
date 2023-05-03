import { ChatState } from "../context/chatprovider";
import SideDrawer from "../components/authantication/chatreact/sideDrawer"
import { Box } from "@chakra-ui/react";
import ChatBox from "../components/authantication/chatreact/ChatBox";
import MyChat from "../components/authantication/chatreact/MyChat";
const Chatpage = () => {
    // taking the user state from the context api
   const{user}= ChatState()
   
  return (
    <div style={{ width : "100%" ,}} >
      {/*only if the user mawjoud*/ user && <SideDrawer/>}
      <Box
      display='flex' 
      flexDirection='row' 
      paddingTop='10px' 
      justifyContent='space-between'

      >
        
              { user && <MyChat/>}
        
        {user && <ChatBox/>}
        
      </Box>
    </div>
  )
};

export default Chatpage;