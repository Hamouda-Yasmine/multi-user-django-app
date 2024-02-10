import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import UserProfile from "../Profile/UserProfile";
import ProfileBox from "../Profile/ProfileBox";
import { useEffect, useState } from "react";
import { useAppState } from "../../app/App";
import axios from "axios";
const EducateurProfile = () => {
  const [educateur, setEducateur] = useState([{}]);
  const { state } = useAppState();
  // Fetch the Educateur data when the component mounts
  useEffect(() => {
    axios
      .get(`/educateur/educateurdetail/${state.user.id}`)
      .then((response) => {
        setEducateur(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Update the Educateur data when the user types in the input fields
  const handleChange = (event) => {
    setEducateur({
      ...educateur,
      [event.target.name]: event.target.value,
    });
  };

  // Send a PUT request to the API when the user clicks the update button
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/educateur/educateurdetail/${state.user.id}/`, educateur)
      .then((response) => {
        setEducateur(response.data);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  // Send a DELETE request to the API when the user clicks the delete button
  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this account?")) {
      axios
        .delete(`/user/userRUD/${state.user.id}/`)
        .then((response) => {
          // Handle the response from the server
        })
        .catch((error) => {
          console.error("Error deleting data: ", error);
        });
    }
  };
  return (
    <Box
      p={4}
      bg={"grey.50"}>
      <Flex>
        <Box
          w="25%"
          mr={4}>
          <ProfileBox />
         

          <Box
            bg="white"
            shadow="base"
            p={4}
            borderRadius="md"
            mt={4}
            textAlign="center">
            <List spacing={3}>
              <ListItem
                display="flex"
                alignItems="center">
                <Icon
                  as={FaGlobe}
                  color="yellow.500"
                  mr={2}
                />
                <Text>https://mdbootstrap.com</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center">
                <Icon
                  as={FaGithub}
                  color="gray.700"
                  mr={2}
                />
                <Text>mdbootstrap</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center">
                <Icon
                  as={FaTwitter}
                  color="blue.400"
                  mr={2}
                />
                <Text>@mdbootstrap</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center">
                <Icon
                  as={FaInstagram}
                  color="pink.500"
                  mr={2}
                />
                <Text>mdbootstrap</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center">
                <Icon
                  as={FaFacebook}
                  color="blue.600"
                  mr={2}
                />
                <Text>mdbootstrap</Text>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box w="75%">
          {/*  component for user informations */}
          <UserProfile />
          
          <Box
          mt={'5'}
            bg="white"
            shadow="base"
            p={4}
            borderRadius="md"
            textAlign="center">
            <FormControl id="user">
              <FormLabel>User ID:</FormLabel>
              <Input
                type="text"
                name="user"
                value={educateur.user}
                isReadOnly
              />
            </FormControl>
            <FormControl id="module">
              <FormLabel>Module:</FormLabel>
              <Input
                type="text"
                name="module"
                value={educateur.module}
                onChange={handleChange}
              />
            </FormControl>
            <Flex justify="flex-end">
              <Button mt={'2'}
                colorScheme="green"
                onClick={handleSubmit}>
                Sauvegarder
              </Button>
            </Flex>
          </Box>
          <Box
            bg="white"
            shadow="base"
            p={4}
            borderRadius="md"
            mt={4}>
            <Text
              color="black"
              fontSize="lg"
              textAlign="center"
              mb={2}>
              Supprimer le compte
            </Text>
            <Text>
              Si vous supprimez votre compte, vos données personnelles seront
              effacées de nos serveurs, toute votre activité dans les cours sera
              anonymisée. Cette action est irréversible ! Annulez tout
              abonnement actif avant de supprimer votre compte.
            </Text>
            <Flex textAlign={'center'}>  <Button
              
              color="red"
              onClick={handleDelete}>
              {" "}
              Supprimer le Compte
            </Button></Flex>
           
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default EducateurProfile;
