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
import { useParams } from "react-router-dom";
import axios from "axios";
const LessonModal = ({ isOpen, onClose, onSave, modalType, chapterId }) => {
  const { id } = useParams();
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");

  const handleLessonContentChange = (event, editor) => {
    const data = editor.getData();
    setLessonContent(data);
  };

  const handleSave = async () => {
    const currentDate = new Date();
    console.log("this is the chapter id", chapterId);
    if (modalType === "lesson") {
      const lessonData = {
        course: id,
        chapter: chapterId,
        title: lessonTitle,
        content: lessonContent,
        date: currentDate,
      };

      try {
        //sending the video data to the backend to create one
        const response = await axios.post(
          "/educateur/lessonscreate/",
          lessonData
        );
        const savedLesson = response.data;
        onSave(savedLesson);
        setLessonContent("");
        setLessonTitle("");
      } catch (error) {
        console.error("Error saving lesson:", error);
      }
    } else if (modalType === "video") {
      const videoData = {
        course: id,
        chapter: chapterId,
        title: videoTitle,
        url: videoUrl,
        duration: duration,
        type: "video",
        date: currentDate,
      };

      try {
        // sending the video data to the backend to create one
        const response = await axios.post("/educateur/videocreate/", videoData);
        const savedVideo = response.data; // Assuming the backend returns the saved video
        onSave(savedVideo);
        setVideoUrl("");
        setVideoTitle("");
        setDuration("");
      } catch (error) {
        console.error("Error saving video:", error);
      }
    }

    onClose(); // Close the modal after saving
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalType === "lesson" ? "full" : "xl"}>
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
              <FormControl mb="4">
                <FormLabel>Duration de la video </FormLabel>
                <Input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
