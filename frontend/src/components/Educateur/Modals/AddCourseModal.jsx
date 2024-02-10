import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "react-cookies";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { useAppState } from "../../../app/App";

function AddCourseModal({ isOpen, onClose, onAdd }) {
  let csrftoken = Cookies.load("csrftoken");
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
  const { state } = useAppState();
  const [newCourse, setNewCourse] = useState({
    slug: "titre3",
    title: "",
    summary: "",
    price: 0,
    is_free: true,
    level: "Facile",
    educateur: state.data.id,
    categorie: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddCourse = () => {
    axios
      .post(
        "/educateur/CourseCRUD/",
        newCourse,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      )
      .then((response) => {
        console.log("Course added successfully:", response.data);

        // Call the onAdd function to notify the parent component about the new course
        onAdd(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un nouveau cours</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Titre</FormLabel>
            <Input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Résumé</FormLabel>
            <Input
              type="text"
              name="summary"
              value={newCourse.summary}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Prix</FormLabel>
            <Input
              type="number"
              name="price"
              value={newCourse.price}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Gratuit</FormLabel>
            <Checkbox
              name="is_free"
              checked={newCourse.is_free}
              onChange={(e) =>
                setNewCourse((prevCourse) => ({
                  ...prevCourse,
                  is_free: e.target.checked,
                }))
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Niveau</FormLabel>
            <Select
              name="level"
              value={newCourse.level}
              onChange={handleInputChange}>
              <option value="Facile">Facile</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Difficile">Difficile</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Catégorie</FormLabel>
            <Input
              type="text"
              name="categorie"
              value={newCourse.categorie}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddCourse}>
            Ajouter
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddCourseModal;
