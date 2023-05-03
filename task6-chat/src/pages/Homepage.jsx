import { Box, Container ,Text} from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import React, { useEffect } from 'react';
import Login from "../components/authantication/Log_in";
import Singup from '../components/authantication/Sign_up';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate =useNavigate()
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("userInfo"))
    //storing it in the setuser statte
    
 
 
 
    // if the user is not logged in he will be reindered to the log in page
    if (user) {
      // or if it didn't work we can use thishistory.push("/")
     navigate("/chats");
    }
 },[navigate])
  return (
    <div>
        <Container maxW='xl' centerContent>
      <Box d="flex"
        //display
        justifyContent={"center"}
        
        p={3}
        //padding
        bg={"white"}
        //background
        w={"100%"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
>
        <Text textAlign="center" fontFamily={"work sans"} fontSize={"4xl"}> slack 0.2</Text>
        
      </Box>
      <Box
      p={4}
      //padding
      bg={"white"}
      //background
      w={"100%"}
      
      borderRadius="lg"
      borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList marginBottom={"5em"}>
    <Tab width={"50%"}  >log in </Tab>
    <Tab width={"50%"} >sing up </Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Singup />
    </TabPanel>
  </TabPanels>
</Tabs>

        </Box>
    </Container>
    </div>
  );
};

export default Homepage;
