import React, { useState } from "react";
import { Box, Image, Badge, Button, Icon, Flex, Text, useDisclosure } from "@chakra-ui/react";

import { FaBook, FaPencilAlt } from "react-icons/fa";
import { RiInfinityLine } from "react-icons/ri";
import { PiVideoLight, PiStudentDuotone } from "react-icons/pi";
import { ImFileText2 } from "react-icons/im";
import Enrolling from "./Modals/Enrolling";

const FloatingCard = ({ course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
 
 
  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="12rem"
      p="6"
      bg="white"
      boxShadow="xl"
      borderRadius="md"
      maxW="300px"
      w="100%">
      {course.image ? (
        <Image
          borderRadius="md"
          src={course.image}
          alt={course.title}
        />
      ) : (
        <Flex
          justify="center"
          align="center"
          bg="gray.200"
          borderRadius="md"
          h="200px">
          <Icon
            as={FaBook}
            w={10}
            h={10}
            mr={2}
          />
          <Icon
            as={FaPencilAlt}
            w={10}
            h={10}
          />
        </Flex>
      )}
      <Box mt="4">
        Le niveau {""}
        <Badge
          variant="solid"
          colorScheme="teal">
          {course.level}
        </Badge>
        <Flex
          align="center"
          mt={"2"}>
          <Text
            fontSize={"large"}
            fontWeight={"2000"}>
            Ce cours comprend :
          </Text>
        </Flex>
        <Flex
          align="center"
          mt={-3}>
          <Icon as={ImFileText2} />
          <Box ml="2">{course.num_lessons} Leçons</Box>
        </Flex>
        <Flex
          align="center"
          mt="2">
          <Icon as={PiVideoLight} />
          <Box ml="2">{course.num_videos} Vidéos</Box>
        </Flex>
        <Flex
          align="center"
          mt="2">
          <Icon as={PiStudentDuotone} />
          <Box ml="2">{course.videos} Déjà inscrits</Box>
        </Flex>
        {/*  <Flex align="center" mt="2">
          <Icon as={FaQuestion} />
          <Box ml="2">{course.quizzes} quizzes</Box>
        </Flex> */}
        <Flex
          align="center"
          mt="2">
          <Icon as={RiInfinityLine} />
          <Box ml="2"> Accès illimité</Box>
        </Flex>
        <Flex
          direction="column"
          mt={4}>
          <Text
            fontWeight="bold"
            alignSelf="end"
            fontSize="x-large"
            mr="1"
            mb={2}>
            {course.price} €
          </Text>
          <Button
            colorScheme="teal"
            size="md"
            width="100%"
            onClick={onOpen}>
            S'inscrire
          </Button>
        </Flex>
        {/* <Flex align="center" justify="space-between" mt="4">
          <Flex align="center">
            <Button
              leftIcon={<FaRegThumbsUp />}
              variant="outline"
              size="sm"
              mr="2"
            >
              Like
            </Button>
            <Button
              leftIcon={<FaShoppingCart />}
              variant="outline"
              size="sm"
            >
              Cart
            </Button>
          </Flex>
        
        </Flex> */}
      
      </Box>
      <Enrolling isOpen={isOpen} onClose={onClose}/>
    </Box>
  );
};

export default FloatingCard;
