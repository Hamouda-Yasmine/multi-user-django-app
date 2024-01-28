import {
  Box,
  Button,
  Flex,
  Icon,
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
const EducateurProfile = () => {
  return (
    <Box
      p={4}
      bg="grey.50">
      <Flex>
        <Box
          w="25%"
          mr={4}>
            <ProfileBox/>
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

            <Button
              textAlign="center"
              color="red">
              {" "}
              Supprimer le Compte
            </Button>
          </Box>

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
        </Box>
      </Flex>
    </Box>
  );
};

export default EducateurProfile;
