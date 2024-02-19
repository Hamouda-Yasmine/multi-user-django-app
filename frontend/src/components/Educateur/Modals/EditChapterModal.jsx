// EditChapterModal.js

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditChapterModal = ({ isOpen, onClose, chapterData, onSave }) => {
  const [chapterTitle, setChapterTitle] = useState(chapterData.title);
  const toast = useToast();

  useEffect(() => {
    //const response=axios.get(`/educateur/chaptersRUD/${chapterData.id}/`)
    setChapterTitle(chapterData.title);
  }, [chapterData]);

  
  const handleSaveChapter = async () => {
    try {
      const response = axios.patch(
        `/educateur/chaptersRUD/${chapterData.id}/`,
        {
          title: chapterTitle,
        }
      );

      toast({
        title: "Success",
        description: "Chapter updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSave();
      onClose();
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to update chapter.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editer le Chapitre</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Titre</FormLabel>
            {console.log(
              "this is the title from edit chapter modal",
              chapterTitle
            )}
            <Input
              type="text"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
            />
          </FormControl>
          {/* Add other form fields for chapter data here */}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSaveChapter}>
            Sauvgarder
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditChapterModal;
