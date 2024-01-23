import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Select,
} from "@chakra-ui/react";

const ProfilePage = () => {
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
                id="first-name"
                marginBottom="3"
                mr="2">
                <FormLabel>Nom</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl
                id="middle-name"
                marginBottom="3">
                <FormLabel>Prénom</FormLabel>
                <Input type="text" />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl
                id="gender"
                marginBottom="3"
                mr="2">
                <FormLabel>Genre</FormLabel>
                <Select placeholder="Sélectionner le genre">
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </Select>
              </FormControl>
              <FormControl
                id="dateN"
                marginBottom="3">
                <FormLabel>Date de naissance</FormLabel>
                <Input type="date" />
              </FormControl>
            </Flex>
            <FormControl
              id="address"
              marginBottom="3">
              <FormLabel> Adresse </FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl
              id="phone-number"
              marginBottom="3">
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input type="phone" />
            </FormControl>
            <Flex>
              <FormControl
                id="user"
                marginBottom="3"
                mr={"2"}>
                <FormLabel> Utilisateur</FormLabel>
                <Input type="text" />
              </FormControl>{" "}
              <FormControl
                id="email-address"
                marginBottom="3">
                <FormLabel> Email</FormLabel>
                <Input type="email" />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl
                id="password"
                marginBottom="3"
                mr="2">
                <FormLabel>Mot de passe actuel</FormLabel>
                <Input type="password" />
              </FormControl>

              <FormControl
                id="password"
                marginBottom="3"
                mr="2">
                <FormLabel>Nouveau mot de passe</FormLabel>
                <Input type="password" />
              </FormControl>

              <FormControl
                id="password"
                marginBottom="2">
                <FormLabel>Retaper le mot de passe</FormLabel>
                <Input type="password" />
              </FormControl>
            </Flex>
            <Flex justify="flex-end">
              <Button colorScheme="green">Sauvegarder</Button>
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
