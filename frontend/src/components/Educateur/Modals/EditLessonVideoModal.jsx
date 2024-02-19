import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const EditLessonVideoModal = ({ isOpen, onClose, onSave, initialData,type }) => {
  const [data, setData] = useState(initialData);
  const [lessonTitle,setLessonTitle]=useState(type==="lesson"?initialData.title:"");
 

  // Update the local state if initialData changes
  useEffect(() => {
    setData(initialData);
    type==="lesson"?setLessonTitle(initialData.title):setLessonTitle("");
  }, [initialData]);


  const handleLessonContentChange = (event, editor) => {
    const content = editor.getData();
    setData({ ...data, content });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = async() => {

   if (type==="lesson"){
    try {
      console.log("this is the id ",data.id)
      const response=axios.put(`/educateur/lessonsRUD/${data.id}/`,data);

     //setData(response.data);
    } catch (error) {
      
    }
    
   }else if (type==="video"){
    try {
      const response=axios.put(`/educateur/videosRUD/${data.id}/`,data);
     
     //setData(response.data)
   
    } catch (error) {
      
    }
  }
   setData([]);
    onClose();
    onSave(data);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={type === "lesson" ? "full" : "xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === "lesson" && "Ajouter une nouvelle lesson"}
          {type === "video" && "Ajouter une nouvelle video"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type === "lesson" && (
            <>
              <FormControl mb="4">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={lessonTitle}
                  onChange={handleInputChange}
                />
              </FormControl>
              <CKEditor
                editor={ClassicEditor}
                data={data.content}
                onChange={handleLessonContentChange}
              />
            </>
          )}
          {type === "video" && (
            <>
              <FormControl mb="4">
                <FormLabel>Video Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Video URL</FormLabel>
                <Input
                  type="text"
                  name="url"
                  value={data.url}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Duration de la video</FormLabel>
                <Input
                  type="text"
                  name="duration"
                  value={data.duration}
                  onChange={handleInputChange}
                />
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLessonVideoModal;
