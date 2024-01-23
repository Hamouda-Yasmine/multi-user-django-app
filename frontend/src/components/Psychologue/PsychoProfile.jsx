import {
    Avatar,
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
  import UserProfile from "../Login-Register/UserProfile";
  const PsychoProfile = () => {
    return (
      <Box
        p={4}
        bg="grey">
        <Flex>
          <Box
            w="25%"
            mr={4}>
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
              <Text fontWeight="bold">Johnatan Smith</Text>
              <Text
                color="gray.500"
                fontSize="sm"
                mb={2}>
                Full Stack Developer
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
                mb={4}>
                Bay Area, San Francisco, CA
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
  
  export default PsychoProfile;
  