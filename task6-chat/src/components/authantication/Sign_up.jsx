import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"





const  Sign_up = () => {
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [show , setShow] = useState(false);
    const [show2 , setShow2] = useState(false);
    
    const [password , setPassword] = useState();
    const [confirmpassword , setConfirmpassword] = useState();
    const [age , setAge] = useState();
    const [pic , setPic] = useState();
    const [laoding , setloading] = useState();
    const toast = useToast();

    const navigate = useNavigate();



    // we're using the state cuz it's an object that can hold our elemnt's data that can change over time (user's interaction waila les requtes ta3 api)
    // setstate methode caan change the element's value ( kima les unputs)
    /*  usestate => The function takes an initial value as its argument and returns an array with two elements: the first element is 
    the current state value, and the second element is a function that allows you to update the state value.
       also by updating the state with the setName function react will re-render and chage the new values by updating our front-end UI    */
    


    const click = () => setShow(!show);
    const click2 = () => setShow2(!show2);
    const setPics =(pics) => {};
    
    const  submitacc=async () => {
        setloading(true)
        //toast is like a pop up
         if (!name ) 
         {
            
           toast ({
                title : "please enter ur name",
                status :"warning" ,
                duration: 5000,
                isClosable: true,
                position : "top",
            });
            setloading(false);
            return
         }
         if (!age ) 
         {
            
           toast ({
                title : "please enter ur age",
                status :"warning" ,
                duration: 5000,
                isClosable: true,
                position : "top",
            });
            setloading(false);
            return
         }
         if (!email ) 
         {
            
           toast ({
                title : "please enter ur email",
                status :"warning" ,
                duration: 5000,
                isClosable: true,
                position : "top",
            });
            setloading(false);
            return
         }
         if (!password ) 
         {
            
           toast ({
                title : "please enter ur password",
                status :"warning" ,
                duration: 5000,
                isClosable: true,
                position : "top",
            });
            setloading(false);
            return
         }
         if (!confirmpassword ) 
         {
            
           toast ({
                title : "please enter ur confirmpassword",
                status :"warning" ,
                duration: 5000,
                isClosable: true,
                position : "top",
            });
            setloading(false);
            return
        
         }
        //api request to try and store this in our data base
    
    
    try
    {
        const config = {
            headers: {
              "content-type": "application/json"
            }
          }
          
          const { data } = await axios.post(
            "http://localhost:5000/api/user/",
            { name, email, password, age },
            config
          );
          toast({
            title: "Registration is successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
         
         
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          setloading(false);

          navigate("/chat");





    }catch (error) 
    {

        toast ({
            title : "catch error yani api/ mch mawjoud waila chnowa ",
            status :"error" ,
            duration: 5000,
            isClosable: true,
            position : "top",
        });
        setloading(false)

    }
    
    
    
    };

  return (
    <VStack spacing={"5px"}  >
       <FormControl id='Name' isRequired>
    <FormLabel> Name </FormLabel>
    <Input placeholder=' Enter your Name' onChange={e => setName(e.target.value)} />
</FormControl>



        <FormControl id='Email' isRequired>
            <FormLabel> Email </FormLabel>
            <Input placeholder=' Enter your Email' 
            onChange={(e) => setEmail(e.target.value)}/>
        </FormControl>


        

        <FormControl  id='Password' isRequired>
            <FormLabel> Password </FormLabel>
            <InputGroup>
            <Input type={ show? "text" : "password"} placeholder=' Enter your Password' 
             // if show is true it's gonna be text otherwuse the type will be password
            //click is the action that's gonna show or hide the password
            onChange={(e) => setPassword(e.target.value)}/>
            
            <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={click} backgroundColor={"red.100"} >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
             </InputGroup>
        </FormControl>

        <FormControl  id=' Confirm_Password' isRequired>
            <FormLabel> Confirm Password </FormLabel>
            <InputGroup>
            <Input type={ show2? "text" : "password"} placeholder=' Enter your Password again  ' 
             
            onChange={(e) => setConfirmpassword(e.target.value)}/>
            
            <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={click2} backgroundColor={"red.100"} >
                    {show2 ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
             </InputGroup>
        </FormControl>




        <FormControl id='Age' isRequired>
            <FormLabel> Age </FormLabel>
            <Input placeholder=' Enter your Age' 
            onChange={(e) => setAge(e.target.value)}/>
        </FormControl>



        <FormControl id='Pic' >
            <FormLabel> upload your picture </FormLabel>
            <Input type="file" 
            accept='image/*'
            // so it would only accept files of image kind
            onChange={(e) => setPics(e.target.files[0])}
            //if many files were chosen it would only pic the first one
            />
            
        </FormControl>

        <Button 
        backgroundColor={"green.500"}
        width={"100%"}
        style={{marginTop: 15 }}
        // the style controls the space bettwen the edges : bch matjich les9a b3adhha
        onClick={submitacc}
        isLoading={laoding}

        >
            sign in 
        </Button>
       
       
    </VStack>
  )
}

export default Sign_up
