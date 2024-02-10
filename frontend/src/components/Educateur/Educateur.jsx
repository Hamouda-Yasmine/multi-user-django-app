import React from "react";
import { useAppState } from "../../app/App";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Cours from "./Cours";
function Educateur() {
  const { state } = useAppState();

  return (
    <Flex
      direction="column"
      p={7}>
      <Tabs
        variant="soft-rounded"
        colorScheme="green">
        <TabList>
          <Tab mr={5}>Mes cours</Tab>
          <Tab mr={5}>Mes Etudiants</Tab>
          <Tab>tab3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Cours />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Educateur;
