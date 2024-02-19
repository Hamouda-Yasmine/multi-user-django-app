import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddCourseModal from "./Modals/AddCourseModal";
import { useAppState } from "../../app/App";
import { Link } from "react-router-dom";
import CourseCard from "../Course-card/CourseCard";
import DeleteAlertDialog from "../Dialogs/DeleteAlertDialog";


function Cours() {

  const { state } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([{}]);
  const toast = useToast();
   //get the courses from the database
  useEffect(() => {
   console.log("this is educateur", state.data);
    axios
      .get(`/educateur/educateurCourses/${state.data.id}/`)
      .then((response) => {
        setCourses(response.data);
      
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [state.data]);

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


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    setDeleteId(id);
    onOpen();
  };
  //deleting a course by the id
  const handleConfirmDeleteCourse = async () => {
    try {
       await axios.delete(
        `/educateur/CourseCRUD/${deleteId}/`
      );
      setCourses((prevItems) => prevItems.filter((item) => item.id !== deleteId));
      toast({
        title: "Success",
        description: "La suppretion a été effectuer avec succés.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast({
        title: "Error",
        description: "La suppression a échoué.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex wrap="wrap">
      {courses.map((course, index) => (
        <CourseCard
          id={course.id}
          key={index}>
            {console.log("herse the id inside the component ",course.title)}
          <Link to={`/coursesedit/${course.id}`}>
            <Button mt={3}>Editer le cours</Button>
          </Link>
          <Button onClick={ ()=>handleDelete(course.id)}>Supprimer le cours</Button>
        </CourseCard>
      ))}
         <DeleteAlertDialog
                  isOpen={isOpen}
                  onClose={onClose}
                  onConfirm={handleConfirmDeleteCourse}
                />

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
