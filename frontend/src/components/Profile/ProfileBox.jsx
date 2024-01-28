import React from 'react'
import { useAppState } from '../../app/App';
import { Avatar, Box, Button, Text } from '@chakra-ui/react';

function ProfileBox() {

    const{state}=useAppState();
  return (
    <>
     <Box
              bg="white"
              shadow="base"
              p={4}
              borderRadius="md"
              textAlign="center">
              <Avatar
                size="xl"
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                mb={2}
              />
              <Text fontWeight="bold">{state.user.username}</Text>
            { /*<Text
                color="gray.500"
                fontSize="sm"
                mb={2}>
                Full Stack Developer
              </Text>*/}
              <Text
                color="gray.500"
                fontSize="sm"
                mb={4}>
              {state.user.address}
              </Text>
              <Button
                colorScheme="blue"
                mr={2}>
                Follow
              </Button>
              <Button
                colorScheme="blue"
                variant="outline">
                Message
              </Button>
            </Box>
    </>
  )
}

export default ProfileBox