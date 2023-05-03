import { Box, Button, Tooltip, Icon ,Text, Menu,
   MenuButton, Avatar, MenuList, MenuDivider, MenuItem, 
   useDisclosure, Drawer, DrawerOverlay, DrawerContent, 
   DrawerHeader, DrawerBody, Input,  useToast} 
   from '@chakra-ui/react';

import axios from 'axios';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FaAngleDown } from "react-icons/fa";
import { ChatState } from '../../../context/chatprovider';
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../../chatLoading';
import UserListItems from '../../user search/UserItems';


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //using it to display our research results
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const{user , setSelectedChat,chats, setChats}= ChatState()
  const navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()






  const logOut = () =>{
    localStorage.removeItem("userInfo")
    navigate("/")
    alert("cc aa zin")
  }




  const toast =useToast()
  const handlSearch =  async() =>{
    //if search is empty
    if (!search) {
      toast({
        title: " enter mail or name in the search ",
        status:"warning",
        duration:"5000",
        isClosable:"yes",
        position: "top"
      })
      return
      
    }
    try {
      setLoading(true)

      const config = {
        headers : {
          //Bearer tokens are a type of access token that is used to authenticate and authorize requests to access protected resources
          Authorization:`Bearer ${user.token}`,
        }
      }
      //a get request to the endpoint with the parametre search l value ta3 input
      //
      
      const {data}= await axios.get(`/api/user?search=${search}`,config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: " API faild  ",
        status:"warning",
        duration:"5000",
        isClosable:"yes",
        position: "top"
      })
    }
  }



  const accessChat = async(userId) =>{

    try {
      setLoadingChat(true)
      const config ={
        headers:{"content-type": "application/json",
      Authorization: `bearer ${user.token}`,
      },

      }
      const {data} = await axios.post("/api/chat",{userId}, config)
      setSelectedChat(false)
      setLoadingChat(false)
      onClose()

    } catch (error) {
      
    }
  }
  




  return (
    <>
  <Box
    display='flex' 
     justifyContent='space-between'
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    
    >
      <Tooltip label="Search user">
        <Button onClick={onOpen}>
          <Icon as={FaSearch} />
          <Text /*padding horizontal*/paddingX={"8px"} >
            search user
          </Text>
        </Button>
      </Tooltip>
      <Text fontSize="1.8em" fontFamily="Work sans">
        SLACK 0.2
        
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
          <Icon as={FaBell} />


          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton p={1} >
        
         <Icon as={FaAngleDown} />
         
         <Avatar size="sm" 
         /* so if the image isn't availble it will display the first letter*/ 
         name={user.name}
         //src={user.pic}
        
         />
         <Text paddingX="0px">
          {user.name}
         </Text>

         

      
          <MenuList /*20min*/>
            <MenuButton> my profile</MenuButton>
            <MenuDivider/>
            <MenuItem > <Button onClick={logOut} > logout   </Button> </MenuItem>
          </MenuList>    
          </MenuButton>
        </Menu>
      </div>
      </Box>
    

<Drawer placement="left" isOpen={isOpen}  onClose={onClose}>
  <DrawerOverlay/>
  <DrawerContent>
    <DrawerHeader borderBottomWidth="5px" textAlign="center">
      search user 
    </DrawerHeader>
    <DrawerBody>
      <Box display="flex" paddingBottom="2px">
        <Input 
        placeholder="search by name or email"
        margin="2px"
        value={search}
        onChange={(e)=> setSearch(e.target.value)
        }
        
      
        />
        <Button 
        onClick={handlSearch}
        >
          search
        </Button>

      </Box>
      {loading ? 
      //if the loading is true 
      ( <ChatLoading/> ):( 
        //creating a list of users byrendering them and putting each one in a UserListItems
       searchResult?.map( (user)=> (
        <UserListItems
        key={user._id}
        user={user}
        handlFunction={()=> /* openning the caht interface and sending to it the info needed */

        accessChat(user._id)}
        />
       ))
      
      
      
       )
    }




    </DrawerBody>


  </DrawerContent>


</Drawer>
</>

  )
      }



export default SideDrawer;