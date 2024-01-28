import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Center,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Link,  useNavigate } from "react-router-dom";
import { useAppState } from "../../app/App";

export default function NavigationBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { state, setState } = useAppState();
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "grey.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"70px"}
        py={{ base: 3 }}
        px={{ base: 10 }}
        borderBottom={2}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon
                  w={3}
                  h={3}
                />
              ) : (
                <HamburgerIcon
                  w={5}
                  h={5}
                />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}>
          <Avatar
            size="lg"
            src="#"
          />

          <Flex
            display={{ base: "none", md: "flex" }}
            ml={4}>
            <DesktopNav />
          </Flex>

          <Stack ml={10}>
            <InputGroup
              display={{ base: "none", md: "flex" }}
              w="500px">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Rechercher..."
                fontSize="sm"
                fontWeight={400}
                variant="outline"
              />
            </InputGroup>
          </Stack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}>
          {state.user ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}>
                  <Avatar
                    size="sm"
                    src="#"
                  />
                </MenuButton>
                <MenuList alignItems="center">
                  <Center>
                    <Avatar
                      size="2xl"
                      src="#"
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{state.user.username}</p>
                  </Center>

                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem onClick={() => {
                    

                      // Redirect to the logout page
                      if (state.user.user_type ==="kids"){
                        navigate("/kids_profile")
                      }else if(state.user.user_type==="educateur"){
                        navigate("/educateur_profile")

                      }else{
                        navigate("/psychologue_profile")
                      }
                    
                    }}
                  >Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      // Clear user state
                      setState((prev) => ({ ...prev, user: null }));

                      // Remove user from localStorage
                      localStorage.removeItem("user");

                      // Redirect to the logout page
                      navigate("/");
                    }}>
                    Déconnecter
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/login"}>
                Connecter
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"teal.400"}
                  _hover={{
                    bg: "teal.300",
                  }}>
                  Inscription
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={Link}
                    to="/kids_signup">
                    Etudiant
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    to="/psychologue_signup">
                    Psychologue
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    to="/educateur_signup">
                    Enseaignant
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack
      direction={"row"}
      spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover
            trigger={"hover"}
            placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={3}
                href={navItem.href ?? "#"}
                fontSize={"lg"}
                fontWeight={600}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={-10}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={5}
                rounded={"xl"}
                minW={"sm"}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      {...child}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={3}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("teal.50", "gray.900") }}>
      <Stack
        direction={"row"}
        align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "teal.400" }}
            fontWeight={600}
            mb={-3}>
            {label}
          </Text>
          <Text
            mb={"-1"}
            fontSize={"sm"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}>
          <Icon
            color={"teal.400"}
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack
      spacing={4}
      onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue("black", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}>
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.label}
                py={2}
                href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

// Define your navigation items
const NAV_ITEMS = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Nos offres",
    children: [
      {
        label: "Cours interactifs",
        subLabel: "Adaptés à tous les niveaux.",
        href: "#",
      },
      {
        label: "Jeux éducatifs",
        subLabel: "Divertissants et éducatifs pour les enfants.",
        href: "#",
      },
      {
        label: "Soutien psychologique",
        subLabel: "Interagissez avec des psychologues qualifiés.",
        href: "#",
      },
    ],
  },
];
