import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Input,
  Spacer,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Text,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import LessonModal from "./Modals/LessonModal";
import EditLessonVideoModal from "./Modals/EditLessonVideoModal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DeleteAlertDialog from "../Dialogs/DeleteAlertDialog";
import { TbEyeEdit } from "react-icons/tb";
import EditChapterModal from "./Modals/EditChapterModal";
import EditCourseForm from "./EditCourseForm";
const CourseDetailsPage = () => {
  const { id } = useParams();
  const id_course = id;

  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const chapterRef = useRef();
  const toast = useToast();

  /*------ fetshing the data from the backend api ----------*/
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/educateur/educateurChaptersCourses/${id_course}/`
      );
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* --------- this part handles the creation of the chapters  ------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const chapter = chapterRef.current.value;
    if (!chapter) {
      toast({
        title: "Error",
        description: "Please enter a chapter title.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        const response = await axios.post(
          `/educateur/educateurChaptersCreate/`,
          { title: chapter, course: id }
        );
        const updatedItems = [
          ...items,
          { title: chapter, lessons: [], videos: [], id: response.id },
        ];
        setItems(updatedItems);
        toast({
          title: "Success",
          description: "Vous avez ajouter un Chapitre .",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        chapterRef.current.value = "";
      } catch (error) {
        console.error("Error adding chapter:", error);
        toast({
          title: "Error",
          description: "Failed to add new chapter.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  /* ---------- this part handles the edit of a chapter --------*/

  const [isModalopen, setIsModalopen] = useState(false);
  const [chapterData, setChapterData] = useState({});
  const handleChapterEdit = (item) => {
    console.log(
      "this is the title of the chapter from course details",
      item.title
    );
    setChapterData(item);
    setIsModalopen(true);
  };
  const handleSavechapter = () => {
    fetchData();
  };

  /*--------  this part handles the creation of lessons or videos ----------*/
  //function to open the modal
  const handleAddOption = (type, id) => {
    setModalType(type);
    setCurrentChapterId(id);
    setShow(true);
  };
  const handleAddData = (data) => {
    setShow(false);
    const updatedItems = items.map((item) => {
      if (item.id === currentChapterId) {
        if (modalType === "lesson") {
          return { ...item, lessons: [...item.lessons, data] };
        } else if (modalType === "video") {
          return { ...item, videos: [...item.videos, data] };
        }
      }
      return item;
    });
    setItems(updatedItems);
  };
  const handleModalClose = () => {
    setShow(false);
    setModalType(null);
  };

  /*------------ this part hundels the editing of the lessons and videos ------------*/
  const [isOpenedit, setIsOpenedit] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  //opens the modal to handle the edit of a video or a lesson
  const handleEditLessonorVideo = (item) => {
    if (item.url) {
      setModalType("video");
      setEditModalData(item);
      setIsOpenedit(true);
    } else {
      setModalType("lesson");
      setEditModalData(item);
      setIsOpenedit(true);
    }
  };
  // retrieving the new data after updating
  const handleSaveLessonVideoEdit = () => {
    fetchData();
  };

  /*-------------  this part handels the dialogs and the deleting functionalities ----------*/
  /*deleting a chapter */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    setDeleteId(id);
    onOpen();
  };
  //deleting a chapter by his id
  const handleConfirmDeleteChapter = async () => {
    try {
      const response = await axios.delete(
        `/educateur/chaptersRUD/${deleteId}/`
      );
      setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
      toast();
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
  /*deleting a lesson or a video */
  const [item, setItem] = useState();
  const [isLessonDeleteOpen, setIsLessonDeleteOpen] = useState(false);
  // deleting a lesson or a video by the id
  const handleDeleteLV = (item) => {
    setItem(item);
    setIsLessonDeleteOpen(true);
  };
  const handleConfirmDeleteLessonVideo = async () => {
    try {
      if (item.url) {
        await axios.delete(`/educateur/videosRUD/${item.id}/`);
      } else {
        await axios.delete(`/educateur/lessonsRUD/${item.id}/`);
      }
      toast({
        title: "Success",
        description: "La suppretion a ete effectuer avec succee.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
      setIsLessonDeleteOpen(false);
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
    <Box p="5" 
    shadow="base"
 
    borderRadius="md">
      <Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to='/educateur'>
      Mes cours
    </BreadcrumbLink>
  </BreadcrumbItem>
 
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Page actuelle</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
      <Heading
        as="h3"
        size="1xl"
        mb="4">
        Les informations de votre cours
      </Heading>
       <EditCourseForm  />
      <Heading
        as="h3"
        size="1xl"
        mb="4">
        Ajouter du contenue a votre cours
      </Heading>
     
      <form onSubmit={handleSubmit}>
        <Flex mb="4">
          <Input
            name="chapter"
            placeholder="Enter chapter title"
            ref={chapterRef}
          />
          <Spacer mx="2" />
          <Button
            type="submit"
            colorScheme="blue">
            Ajouter
          </Button>
        </Flex>
      </form>
      <Accordion allowMultiple>
        {items.map((item) => (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left">
                  {item.title}
                </Box>

                <IconButton
                  aria-label="edit chapter"
                  icon={<EditIcon />}
                  colorScheme="blue"
                  size="sm"
                  mr="2"
                  onClick={() => handleChapterEdit(item)}
                />

                <IconButton
                  aria-label="Delete chapter"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  mr="2"
                  onClick={() => handleDelete(item.id)}
                />
                <DeleteAlertDialog
                  isOpen={isOpen}
                  onClose={onClose}
                  onConfirm={handleConfirmDeleteChapter}
                />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Add option"
                    icon={<AddIcon />}
                    colorScheme="green"
                    size="sm"
                    mr="2"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={() => handleAddOption("lesson", item.id)}>
                      Add lesson
                    </MenuItem>
                    <MenuItem onClick={() => handleAddOption("video", item.id)}>
                      Add video
                    </MenuItem>
                    <MenuItem onClick={() => handleAddOption("quiz", item.id)}>
                      Add quiz
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                  <IconButton
                    aria-label="edit lesson or video"
                    icon={<TbEyeEdit />}
                    alignSelf={"center"}
                    size="sm"
                    mr="2"
                    onClick={() => handleEditLessonorVideo(item)}
                  />
                  <IconButton
                    aria-label="Delete chapter"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    mr="2"
                    onClick={() => handleDeleteLV(item)}
                  />

                  <DeleteAlertDialog
                    isOpen={isLessonDeleteOpen}
                    onClose={() => setIsLessonDeleteOpen(false)}
                    onConfirm={handleConfirmDeleteLessonVideo}
                  />
                </AccordionPanel>
              ))}
          </AccordionItem>
        ))}
      </Accordion>
      <LessonModal
        isOpen={show}
        onClose={handleModalClose}
        onSave={(data) => handleAddData(data)}
        chapterId={currentChapterId}
        modalType={modalType}
      />
      <EditLessonVideoModal
        isOpen={isOpenedit}
        onClose={() => setIsOpenedit(false)}
        onSave={handleSaveLessonVideoEdit}
        initialData={editModalData}
        type={modalType}
      />
      <EditChapterModal
        isOpen={isModalopen}
        onClose={() => setIsModalopen(false)}
        chapterData={chapterData}
        onSave={handleSavechapter}
      />
    </Box>
  );
};

export default CourseDetailsPage;
