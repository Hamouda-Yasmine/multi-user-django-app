import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,

  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {

  FiMenu,
} from "react-icons/fi";

export const Sidebar = ({ chapters ,handleItemClick }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listchapters, setListChapters] = useState(chapters);

  useEffect(() => {
    // Update listchapters when chapters changes
    setListChapters(chapters);
  }, [chapters]);



  return (
    <Box
     
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        chapters={listchapters}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        handleItemClick={handleItemClick}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
         
          <SidebarContent
            chapters={listchapters}
            onClose={onClose}
            handleItemClick={handleItemClick}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        display={{ base: "flex", md: "none" }}
        onOpen={onOpen}
      />
      
    </Box>
  );
};

const SidebarContent = ({ onClose, chapters ,handleItemClick, ...rest }) => {

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60}}
      h={"full"}
      mb={-10}
      {...rest}>
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Logo
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
    
      <NavBarItems  chapitre={chapters} handleItemClick={handleItemClick}/>
    </Box>
  );
};



const NavBarItems = ({ chapitre,handleItemClick }) => {
 
  return (
   
      <Accordion allowMultiple>
        {chapitre.map((item) => (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left">
                  {item.title}
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            {/* sorting the lessons and the videos by the date so they will be displayed correctelly in the panel  */}
            {[...item.lessons, ...item.videos]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item, index) => (
                <AccordionPanel
                  pb="4"
                  as="button"
                  key={item.date}
                  onClick={() => handleItemClick(item.id,item.type)}
                  >
               
                  <Text
                    as="h4"
                    fontSize="xl"
                    fontWeight="medium">
                    {item.title}
                  </Text>
                </AccordionPanel>
              ))}
          </AccordionItem>
        ))}
      </Accordion>
  
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
