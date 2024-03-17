import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Flex,
  Icon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  TagLeftIcon,
} from "@chakra-ui/react";

import { MdLocalShipping, MdLanguage, MdOutlineCheck } from "react-icons/md";

import ReactStars from "react-rating-stars-component";
import FloatingCard from "./FloatingCard";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbCalendarTime } from "react-icons/tb";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const [course, setCourse] = useState({});
  const [chapterCourse, setChapterCourse] = useState([]);
  const { id } = useParams();

  /* fetshing the course by his id */
  useEffect(() => {
    fetshCourse();
  }, [id]);
  const fetshCourse = async () => {
    try {
      const response = await axios.get(`/educateur/CourseCRUD/${id}/`);
      setCourse(response.data);
      console.log("this is the course",response.data);
      const id_course = id;
      const response2 = await axios.get(
        `/educateur/educateurChaptersCourses/${id_course}`
      );
      setChapterCourse(response2.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  return (
    <>
      <Container
        maxW={"100%"}
        bg={useColorModeValue("blue.50", "gray.400")}>
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 20 }}
            mb={"-20"}>
            <Box
              as={"header"}
              width={"100%"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
                {course.title}
              </Heading>

              <Text
                mt={5}
                fontSize={"larger"}>
                {course.summary}
              </Text>

              <Flex>
                {" "}
                <Text mr={1}>{course.ratting}</Text> {""}
                <ReactStars
                  count={5}
                  value={course.ratting}
                  isHalf={true}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />{" "}
                {""} <Text ml={2}>(129 avis)</Text>
              </Flex>

              <Flex>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={400}
                  fontSize={"2x0"}>
                  <Icon as={FaChalkboardTeacher} /> crée par :{" "}
                  <a>
                    {" "}
                    {course.educateur_firstname} {course.educateur_lastname}
                  </a>
                </Text>
              </Flex>
              <Flex>
                {" "}
                <Text fontSize={"2x0"}>
                  {" "}
                  <Icon
                    mb={1}
                    color={"black"}
                    as={TbCalendarTime}
                  />{" "}
                  Dernière mise à jour :{" "}
                  {course.update_time
                    ? new Date(course.update_time).toLocaleDateString()
                    : new Date(course.upload_time).toLocaleDateString()}
                </Text>
                <Text
                  fontSize={"2x0"}
                  ml={5}>
                  {" "}
                  <Icon
                    mb={1}
                    color={"black"}
                    as={MdLanguage}
                  />{" "}
                  Français
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>
      </Container>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }>
              <></>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("teal.300", "teal.100")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}>
                  Ce que vous apprendrez
                </Text>

                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={10}>
                  {/* First List */}
                  <List spacing={2}>
                    {course.features &&
                      course.features.length > 0 &&
                      course.features
                        .slice(0, Math.ceil(course.features.length / 2))
                        .map((feature, index) => (
                          <ListItem key={index}>
                            <Icon
                              as={MdOutlineCheck}
                              mr={1}></Icon>{" "}
                            {feature.name}
                          </ListItem>
                        ))}
                  </List>

                  {/* Second List */}
                  <List spacing={2}>
                    {course.features &&
                      course.features.length > 0 &&
                      course.features
                        .slice(Math.ceil(course.features.length / 2))
                        .map((feature, index) => (
                          <ListItem key={index}>
                            <Icon
                              as={MdOutlineCheck}
                              mr={1}></Icon>{" "}
                            {feature.name}
                          </ListItem>
                        ))}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("teal.300", "teal.100")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}>
                  Contenu du cours
                </Text>

                <Accordion allowMultiple>
                  {chapterCourse.map((item) => (
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
                            key={item.date}>
                            {console.log("id in the loop of lessson", item.id)}
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
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}>
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        <FloatingCard course={course} />
      </Container>
    </>
  );
}

export default CourseDetails;
