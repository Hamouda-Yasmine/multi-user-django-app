import { AddIcon, Icon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddCourseModal from "./Modals/AddCourseModal";
import { useAppState } from "../../app/App";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FaBook, FaVideo, FaUserGraduate } from "react-icons/fa";

function Cours() {
  const { state } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([{}]);

  useEffect(() => {
    //get the courses from the database
    console.log("this is educateur", state.data);
    axios
      .get(`/educateur/educateurCourses/${state.data.id}/`)
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    setShowModal(false);
  };
  return (
    <Flex wrap="wrap">
      {courses.map((course, index) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={3}
          key={index}>
          <Image
            src={course.image}
            alt={course.title}
          />

          <Box p="6">
            <Box
              d="flex"
              alignItems="baseline"></Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight">
              {course.title}
            </Box>

            <Text>{course.summary}</Text>
            <Text>{course.price}</Text>

            <Link to={`/coursesedit/${course.id}`}>
              <Button mt={3}>Editer le cours</Button>
            </Link>
          </Box>
        </Box>
      ))}

      {/* Add New course Card */}
      <Box
        maxW="sm"
        borderWidth="2px"
        borderRadius="lg"
        alignItems={"center"}
        overflow="hidden"
        m={3}>
        <Center
          p={5}
          justifyContent="center"
          as="button"
          h="full"
          bg="gray.100"
          _hover={{ bg: "gray.50" }}
          _focus={{ bg: "gray.200", outline: "none" }}
          tabIndex={0}
          onClick={handleOpenModal}
          flexDirection="column">
          <AddIcon
            w={6}
            h={6}
            color="gray.600"
            mt={8}
          />
          <Text mt={-1}>Ajouter un nouveau cours</Text>
        </Center>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden">
        <Image
          src="path_to_your_image"
          alt="course image"
        />

        <Box p="6">
          <Box
            d="flex"
            alignItems="baseline">
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2">
              <Icon
                as={FaBook}
                mr="2"
              />
              12 Lessons
              <Icon
                as={FaVideo}
                ml="4"
                mr="2"
              />
              65 Videos
              <Icon
                as={FaUserGraduate}
                ml="4"
                mr="2"
              />
              4.0 Enroll Students
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
            React Front To Back
          </Box>

          <Box>
            $60{" "}
            <Box
              as="span"
              color="gray.600"
              fontSize="sm">
              {" "}
              $120
            </Box>
          </Box>

          <Box
            d="flex"
            mt="2"
            alignItems="center">
            <StarRatings
              rating={4}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />
            {/* Add number of reviews */}
          </Box>

          <Text mt="2">
            It is a long established fact that a reader will be distracted.
          </Text>

          <Box
            d="flex"
            mt="2"
            alignItems="center">
            <Text>By Claudia Pruitt In Designing</Text>
          </Box>

          <Button
            mt="3"
            colorScheme="teal"
            variant="outline">
            Learn More
          </Button>
        </Box>
      </Box>
      {/* Modal for Adding New Course */}
      <AddCourseModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onAdd={handleAddCourse}
      />
    </Flex>
  );
}

export default Cours;
