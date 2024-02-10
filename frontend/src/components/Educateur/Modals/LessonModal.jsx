import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const LessonModal = ({ isOpen, onClose, onSave, modalType, chapterId }) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleLessonContentChange = (event, editor) => {
    const data = editor.getData();
    setLessonContent(data);
  };

  const handleSave = () => {
    if (modalType === "lesson") {
      onSave({ title: lessonTitle, content: lessonContent, type: "lesson",date:new Date() });
    } else if (modalType === "video") {
      onSave({ title: videoTitle, url: videoUrl, type: "video",date:new Date() });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalType === "lesson" && "Ajouter une nouvelle lesson"}
          {modalType === "video" && "Ajouter une nouvelle video"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalType === "lesson" && (
            <>
              <FormControl mb="4">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                />
              </FormControl>
              <CKEditor
                editor={ClassicEditor}
                data={lessonContent}
                onChange={handleLessonContentChange}
              />
            </>
          )}
          {modalType === "video" && (
            <>
              <FormControl mb="4">
                <FormLabel>Video Title</FormLabel>
                <Input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Video URL</FormLabel>
                <Input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
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

export default LessonModal;
