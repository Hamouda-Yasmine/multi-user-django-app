import React, { useEffect, useState } from "react";
import { Badge, Box, Image, Text } from "@chakra-ui/react";
import StarRatings from "react-star-ratings";
import { FaBook, FaVideo, FaUserGraduate } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";
import axios from "axios";
function CourseCard({ id, children }) {
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/educateur/CourseCRUD/${id}/`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
        // Handle error state here if necessary
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxW="sm"
        m={3}>
        <Image
          src="path_to_your_image"
          alt="course image"
        />

        <Box p="6">
          <Box
            d="flex"
            alignItems="baseline">
           
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
              {course.num_lessons}
              <Icon
                as={FaVideo}
                ml="4"
                mr="2"
              />
              {course.num_videos}
              <Icon
                as={FaUserGraduate}
                ml="4"
                mr="2"
              />
              4.0
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
            {course.title}
          </Box>

          <Text mt="2">{course.summary}</Text>

          <Box
            d="flex"
            mt="2"
            alignItems="center">
            <Text>
              Par {course.educateur_firstname} {course.educateur_lastname}
            </Text>
            <Text>Niveau {course.level}</Text>
          </Box>
          <Box
            d="flex"
            mt="2"
            alignItems="center"
            style={{ fontSize: "0.5rem" }}>
            {/* Add number of reviews */}
            <StarRatings
              rating={course.ratting}
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
          </Box>
          <Box>
            {course.is_free ? (
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="teal">
                Gratuit
              </Badge>
            ) : (
              course.price 
            )}

            {/* this is for solde <Box
              as="span"
              color="gray.600"
              fontSize="sm">
              {" "}
              $120
            </Box> */}

          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default CourseCard;
