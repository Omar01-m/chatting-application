import React from 'react'
import { Avatar, Box ,Text} from '@chakra-ui/react'
  
const UserListItems = ({ user,handlFunction }) => { 

  return (
    


    <Box onClick={handlFunction}
    
    cursor="pointer"
    bg="black"
    _hover={{
        background: "red",
        color: "blue",

    }}
    w="100%"
    display="flex"
    alignItems="center"
    color="black"
    paddingx={5}
    paddingz={5}
    marginBottom="lg"
    >
        <Avatar
         mr={2}
         size="sm"
         cursor="pointer"
         name={user.name}
         src={user.pic}

        />
        <Box>
            <Text>
                {user.name}

            </Text>
            <Text fontSize="xs">
                <i> email</i>
                {user.email}
                 </Text>
        </Box>



    </Box>
  )
}

export default UserListItems
