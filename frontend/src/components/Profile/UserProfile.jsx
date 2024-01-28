import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Cookies from 'react-cookies';
import { useEffect, useState } from "react";
import axios from "axios"
import { useAppState } from "../../app/App";
const ProfilePage = () => {
  const {setState}=useAppState()
  // user data
  const [userData, setUserData] = useState({
    id:"",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState({
    confirmPassword: true,
  });
  //const{state}=useAppState();
  useEffect(() => {
    // Retrieve user data from local storage
    if(localStorage.getItem("user"))
   { const storedUserData = JSON.parse(localStorage.getItem("user")) || {};
    setUserData(storedUserData);}
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });

    if (id === "newPassword" || id === "confirmPassword") {
      const confirmPasswordMatch =
        id === "newPassword"
          ? value === userData.confirmPassword
          : userData.newPassword === value;

      setPasswordMatch({
        confirmPassword: confirmPasswordMatch,
      });
    }
  };
  let csrftoken = Cookies.load('csrftoken');
  axios.defaults.headers.common['X-CSRFToken'] =csrftoken

 
  const handleSave = () => {
    
    axios.put(`/user/userCRUD/${userData.id}/`, userData,{ withCredentials: true }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("user")}`,
     
      },
    })
      .then(response => {
        console.log("hellow this is the data",response.data); 
        localStorage.setItem('user', JSON.stringify(response.data));
            //update the state of the app 
            setState((prev) => ({
              ...prev,
              user: response.data,
            }));
        
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <Box
      bg="white"
      shadow="base"
      p={4}
      borderRadius="md"
      textAlign="center">
      <Tabs>
        <TabList>
          <Tab color="teal.300">Compte</Tab>
          <Tab>Carte</Tab>
          <Tab>TAB 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex>
              <FormControl
                id="first_name"
                marginBottom="3"
                mr="2">
                <FormLabel>Prénom</FormLabel>
                <Input
                  type="text"
                  id="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                />
              </FormControl>
           
              <FormControl
                id="last_name"
                marginBottom="3">
                <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  id="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl
                id="gender"
                marginBottom="3"
                mr="2">
                <FormLabel>Genre</FormLabel>
                <Select
                  placeholder="Sélectionner le genre"
                  id="gender"
                  value={userData.gender}
                  onChange={handleChange}>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </Select>
              </FormControl>
              <FormControl
                id="date_of_birth"
                marginBottom="3">
                <FormLabel>Date de naissance</FormLabel>
                <Input
                  type="date"
                  id="date_of_birth"
                  value={userData.date_of_birth}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormControl
              id="address"
              marginBottom="3">
              <FormLabel>Adresse</FormLabel>
              <Input
                type="text"
                id="address"
                value={userData.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl
              id="phone_number"
              marginBottom="3">
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input
                type="tel"
                id="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
              />
            </FormControl>

            <Flex>
              <FormControl
                id="username"
                marginBottom="3"
                mr={"2"}>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <Input
                  type="text"
                  id="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                id="email"
                marginBottom="3">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl
                id="password"
                marginBottom="3"
                mr="2">
                <FormLabel>Mot de passe actuel</FormLabel>
                <Input
                  type="password"
                  id="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl
                id="newPassword"
                marginBottom="3"
                mr="2"
                isInvalid={!passwordMatch.confirmPassword}>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <Input
                  type="password"
                  id="newPassword"
                  value={userData.newPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch.confirmPassword && (
                  <FormErrorMessage>
                    Les mots de passe ne correspondent pas
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="confirmPassword"
                marginBottom="2"
                isInvalid={!passwordMatch.confirmPassword}>
                <FormLabel>Retaper le mot de passe</FormLabel>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch.confirmPassword && (
                  <FormErrorMessage>
                    Les mots de passe ne correspondent pas
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>

            <Flex justify="flex-end">
              <Button
                colorScheme="green"
                onClick={handleSave}>
                Sauvegarder
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>{/* Content for Tab 2 */}</TabPanel>
          <TabPanel>{/* Content for Tab 3 */}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
