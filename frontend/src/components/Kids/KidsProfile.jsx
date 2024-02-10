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
import { useAppState } from "../../app/App";
import ProfileBox from "../Profile/ProfileBox";
import { useEffect, useState } from "react";
import axios from "axios";
const KidsProfile = () => {
  const [kids, setKids] = useState({});
  const { state } = useAppState();

  // Fetch the kids data when the component mounts
  useEffect(() => {
    axios
      .get(`/kids/kidsdetail/${state.user.id}`)
      .then((response) => {
        setKids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Update the kids data when the user types in the input fields
  const handleChange = (event) => {
    setKids({
      ...kids,
      [event.target.name]: event.target.value,
    });
  };

  // Send a PUT request to the API when the user clicks the update button
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/kids/kidsdetail/${state.user.id}/`, kids)
      .then((response) => {
        setKids(response.data);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  return (
    <Box
      p={4}
      bg="grey">
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
          <UserProfile />
          <Box
            mt={"5"}
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
                value={kids.user}
                isReadOnly
              />
            </FormControl>
            <FormControl id="maladie">
              <FormLabel>Maladie:</FormLabel>
              <Input
                type="text"
                name="maladie"
                value={kids.maladie}
                onChange={handleChange}
              />
            </FormControl>
            <Flex justify="flex-end">
              <Button
                mt={"2"}
                colorScheme="green"
                onClick={handleSubmit}>
                Sauvegarder
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default KidsProfile;
