import React, { useState ,useEffect}from 'react'
import { useAppState } from '../../app/App';
  import Cookies from 'react-cookies';
  import {Flex,Heading,Input, Button,InputGroup, Stack,InputLeftElement,chakra, Box, Link,Avatar,FormControl,FormHelperText,InputRightElement} from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom';
  import { FaUserAlt, FaLock } from "react-icons/fa";
  import axios from "axios"
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
 
 

  function Login() {

    //showing the password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    
    // Set the CSRF token in the header for all POST requests
    let csrftoken = Cookies.load('csrftoken');
    axios.defaults.headers.post['X-CSRFTOKEN'] = csrftoken;
    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const{state,setState}=useAppState();
   
   useEffect(() => {
    // This effect runs whenever state.user changes
      if (state.user ) {
      console.log('Login successful:', state.user.user_type);
      navigate(`/${state.user.user_type}`);}
    }, [state.user,navigate]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formObject = {
        username: username,
        password: password,};
     
      try {
        const response = await axios.post('/user/login/', formObject, { withCredentials: true });
    
        if (response.status === 200) {
          //update the state of the app 
          setState((prev) => ({
            ...prev,
            user: response.data.user,
          }));
          //storege the user 
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
       
        } else {
          console.error('Login failed:', response.data.message);
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
          <Avatar bg="teal.300" />
          <Heading color="teal.300">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form  onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
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
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={10}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
                
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <strong color="teal.500" href="#">
          Sign Up as {" "}
          </strong> <br></br>
       
        </Box>


        <Box spacing={1} mt={4}> 
        
        <Button color="teal.300" mr={4} onClick={()=>{navigate('/educateur_signup')}}>
          Teatcher {" "}
        </Button>
        
          <Button color="yellow.300" mr={4} onClick={()=>{navigate('/kids_signup')}}>
          Student {" "}
          </Button>

          <Button color="pink.500" onClick={()=>{navigate('/psychologue_signup')}}>
          Psychologist {" "}
          </Button>
         
        </Box>
      </Flex>
    
  )
}

export default Login