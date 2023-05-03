import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const log_in = () => {
  const [password , setPassword] = useState();
  const [email , setEmail] = useState();
  const [show , setShow] = useState(false);
  const [loading , setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const click = () => setShow(!show);

  const submitacc = async () => {
    setLoading(true);

    if (!email ) {
      toast ({
        title: "Please enter your email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (!password ) {
      toast ({
        title: "Please enter your password",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      console.log("9bal")
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        
      );
      console.log("ba3eed")
      toast({
        title: "Login is successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");

    } catch (error) {
      console.log(error);
      toast ({
        title: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"10px"}  >
      <FormControl id='Email' isRequired>
        <FormLabel> Email </FormLabel>
        <Input placeholder=' Enter your Email' onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>

      <FormControl  id='Password' isRequired>
        <FormLabel> Password </FormLabel>
        <InputGroup>
          <Input
            type={ show ? "text" : "password"}
            placeholder=' Enter your Password' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={click} backgroundColor={"red.100"} >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button 
        backgroundColor={"blue.500"}
        width={"100%"}
        style={{marginTop: 15 }}
        onClick={submitacc}
        isLoading={loading}
      >
        Log In 
      </Button>
      <Button 
        backgroundColor={"purple.500"}
        width={"100%"}
        style={{marginTop: 15 }}
        onClick={submitacc}
        
      >
        Help 
      </Button>
    </VStack>
  )
}

export default log_in
