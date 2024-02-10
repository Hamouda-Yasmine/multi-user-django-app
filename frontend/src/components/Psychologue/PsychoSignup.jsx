import React, { useState }from 'react'
import { useAppState } from '../../app/App';
  import Cookies from 'react-cookies';
  import {Flex,Heading,Input, Button,InputGroup, Stack,InputLeftElement,chakra, Box, Avatar,FormControl,InputRightElement} from "@chakra-ui/react";
  import { Link, useNavigate } from 'react-router-dom';
  import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
  import { RiPsychotherapyFill } from "react-icons/ri";
  import axios from "axios"
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CFaEnvelope = chakra(FaEnvelope);
  const CRiPsychotherapyFill = chakra(RiPsychotherapyFill);
function PsychoSignup() {
 //showing the password
 const [showPassword, setShowPassword] = useState(false);
 const handleShowClick = () => setShowPassword(!showPassword);
 
 // Set the CSRF token in the header for all POST requests
 let csrftoken = Cookies.load('csrftoken');
 axios.defaults.headers.post['X-CSRFTOKEN'] = csrftoken;
 
 const navigate = useNavigate();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [email,setEmail]=useState('')
 const [specialite,setSpecialite]=useState('')

 const{setState}=useAppState();



 const handleSubmit = async (event) => {
   event.preventDefault();
   const formObject = {
     username: username,
     password: password,
     email: email,
     specialite: specialite,
     };
  
   try {
     const response = await axios.post('/psychologue/signupPsychologue/', formObject, { withCredentials: true });
 
     if (response.status === 201) {
       //update the state of the app 
       setState((prev) => ({
         ...prev,
         user: response.data.user,
       }));
       //storege the user 
       console.log('this is the psycho ',response.data.psy)
       localStorage.setItem('user', JSON.stringify(response.data.user));
       navigate('/psychologue');
    
     } else {
       console.error('user faild:', response.data.message);
     }
   } catch (error) {
     console.error('Axios error:', error);
   }
     
   
 };



  return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar bg="pink.400" />
      <Heading color="pink.400">Welcome</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form  onSubmit={handleSubmit}>
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">


            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input name='username' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </InputGroup>
            </FormControl>
            
            
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaEnvelope color="gray.300" />}
                />
                <Input name='email' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputGroup>
            </FormControl>
            
            
            
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
           
            </FormControl>


            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CRiPsychotherapyFill color="gray.300" />}
                />
                <Input name='specialite' type="text" placeholder="profession" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
              </InputGroup>
            </FormControl>


            <Button borderRadius={10} type="submit"  variant="solid" bg="pink.400" color="white" width="full">
              Signup
            </Button>
            
          </Stack>
        </form>
      </Box>
    </Stack>


    <Box>
      Already have an account?{" "}
      <Link color="teal.500" to="/login">
      Login 
      </Link> <br></br>
   
    </Box>


 
  </Flex>
  )
}

export default PsychoSignup