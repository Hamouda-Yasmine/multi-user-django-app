import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditCourseForm = (courseID) => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const toast = useToast();
  useEffect(() => {
    axios
      .get(`/educateur/CourseCRUD/${id}/`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCourse({
      ...course,
      [id]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCourse({
      ...course,
      [id]: checked,
      price: checked ? 0 : course.price // Reset the price when toggling free
    });
  };

  const handleSave = async() => {
    try {
       const response = await axios.patch(
          `/educateur/CourseCRUD/${id}/`,
          course
        );
        
        toast({
          title: "Success",
          description: "Course updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
       console.log("this is the data", response.data)
       setCourse(response.data);
      } catch (error) {
        // Show error toast
        toast({
          title: "Error",
          description: "Failed to update course.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    /* axios
      .put(
        `/user/userCRUD/${userData.id}/`,
        userData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      )
      .then((response) => {
        console.log("hellow this is the data", response.data);
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });*/
  };
  return (
    <Box>
      <Flex>
        <FormControl
          id="title"
          marginBottom="3"
          mr="2">
          <FormLabel>Titre</FormLabel>
          <Input
            type="text"
            id="title"
            value={course.title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl
          id="categorie"
          marginBottom="3">
          <FormLabel>Catégorie</FormLabel>
          <Input
            type="text"
            id="categorie"
            value={course.categorie}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      <Flex>
        <FormControl
          id="level"
          marginBottom="3"
          mr="2">
          <FormLabel>Niveau</FormLabel>
          <Select
            id="level"
            value={course.level}
            onChange={handleChange}>
            <option value="Facile">Facile</option>
            <option value="Intermediaire">Intermediaire</option>
            <option value="Difficil">Difficil</option>
          </Select>
        </FormControl>
        <FormControl
          id="price"
          marginBottom="3">
          <FormLabel>Prix</FormLabel>
          <Input
            type="text"
            id="price"
            value={course.price}
            onChange={handleChange}
            isDisabled={course.is_free}
          />
        </FormControl>
        <FormControl
          id="is_free"
          mt={"10"}
          mr={"-480"}
          ml={2}>
          <Checkbox
            id="is_free"
            isChecked={course.is_free}
            onChange={handleCheckboxChange}>
            Gratuit
          </Checkbox>
        </FormControl>
      </Flex>
      <FormControl
        id="summary"
        marginBottom="3">
        <FormLabel>Résumé</FormLabel>
        <Textarea
          id="summary"
          value={course.summary}
          onChange={handleChange}
          size="sm"
        />{" "}
      </FormControl>

      <Flex justify="flex-end">
        <Button
          colorScheme="green"
          onClick={handleSave}>
          Sauvegarder
        </Button>
      </Flex>
    </Box>
  );
};

export default EditCourseForm;
