import { Box, Button, Checkbox, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course-card/CourseCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppState } from "../../app/App";
function AllCoursesSection() {
  const [courses, setCourses] = useState([{}]);
  const { state } = useAppState();

  //get the courses from the database
  useEffect(() => {
    console.log("this is educateur", state.data);
    axios
      .get(`/user/getallCourses/`)
      .then((response) => {
        // Sort the data by the date of creation in descending order
        const sortedCourses = response.data.sort((a, b) => {
          return new Date(b.upload_time) - new Date(a.upload_time);
        });
        setCourses(sortedCourses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [state.data]);
  const categories = ["Object", "Competences", "Niveau"];
  const options = [
    [
      "Apprentissage des langues",
      "Arts et science humaines",
      "Business",
      "Développement personnel",
    ],
    [
      "Adaptabilité",
      "Administration de base de données",
      "Algèbre",
      "Algèbre linéaire",
    ],
    ["Débutant"],
  ];
  return (
    <Box p={4}>
      <Grid
        templateColumns="300px 1fr"
        gap={6}>
        {/* Sidebar */}
        <Box>
          <Text
            mb={2}
            fontWeight="bold">
            Filter par
          </Text>
          {/* Add your filter options here */}
          <Box>
            {categories.map((category, i) => (
              <Box key={category}>
                <Text
                  mb={1}
                  fontWeight="semibold">
                  {category}
                </Text>
                {options[i].map((option) => (
                  <Checkbox
                    key={option}
                    colorScheme="blue"
                    mb={1}>
                    {option}
                  </Checkbox>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Courses Grid */}
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={6}>
          {/* Course Card */}

          {courses.map((course, index) => (
            <CourseCard
              id={course.id}
              key={index}>
              {console.log("herse the id inside the component ", course.title)}
              <Link to={`/course_details/${course.id}`}>
                <Button mt={3}> Consulter le cours</Button>
              </Link>
            </CourseCard>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllCoursesSection;
