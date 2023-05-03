import { Box, Button, Tooltip, Icon ,Text, Menu, MenuButton, Avatar, MenuList, MenuDivider, MenuItem} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FaAngleDown } from "react-icons/fa";
import { ChatState } from '../../../context/chatprovider';
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState("");
  const [loadingChat, setLoadingChat] = useState("");

  const{user}= ChatState()
  const navigate=useNavigate()
  const logOut = () =>{
    localStorage.removeItem("userInfo")
    navigate("/")
  }
  return (
      <Box
    display='flex' 
     justifyContent='space-between'
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    
    >
      <Tooltip label="Search user">
        <Button>
          <Icon as={FaSearch} />
          <Text /*padding horizontal*/paddingX={"10px"}>
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
         <Button>
         <Icon as={FaAngleDown} />
         
         <Avatar size="sm" 
         /* so if the image isn't availble it will display the first letter*/ 
         name={user.name}
         //src={user.pic}
        
         />
         <Text paddingX="10px">
          {user.name}
         </Text>

         </Button>

      
          <MenuList /*20min*/>
            <MenuButton> my profile</MenuButton>
            <MenuDivider/>
            <MenuItem onClick={logOut} > logout</MenuItem>
          </MenuList>    
          </MenuButton>
        </Menu>
      </div>
    </Box>
  
    
  )
}

export default SideDrawer;