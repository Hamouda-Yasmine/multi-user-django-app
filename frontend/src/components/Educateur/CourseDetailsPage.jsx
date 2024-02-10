import React, { useState, useRef } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import LessonModal from "./Modals/LessonModal";

const CourseDetailsPage = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const chapterRef = useRef();
  const toast = useToast();


  useEffect(() => {
    // Fetch data from the database when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make an API call to fetch data from the database
      const response = await axios.get('your-api-endpoint');
      const data = response.data; // Assuming data is an array of objects

      // Update the component state with the fetched data
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Define a function to handle the chapter input change
  const handleChapterChange = (e) => {
    // Get the value of the input field
    const chapter = e.target.value;

    // Update the state of the chapter input field
    // This is optional, but it can be useful for validation or other logic
    // You can also use a single state object instead of multiple states
    // setChapter(chapter);
  };

  const handleSubmit = (e) => {
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
      const newItem = {
        chapter,
        lessons: [],
        videos: [],
        id: Math.random().toString(36).substr(2, 9),
       
      };
      setItems((prevItems) => [...prevItems, newItem]);
      toast({
        title: "Success",
        description: "You have added a new chapter.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      chapterRef.current.value = "";
    }
  };

  const handleAddData = (data) => {
    setShow(false);
    const updatedItems = items.map((item) => {
      if (item.id === currentChapterId) {
        if (modalType === "lesson") {
          return {
            ...item,
            lessons: [...item.lessons, data],
          };
        } else if (modalType === "video") {
          return {
            ...item,
            videos: [...item.videos, data],
          };
        }
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteChapter = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this chapter?"
    );
    if (confirm) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast({
        title: "Success",
        description: "You have deleted the chapter.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddOption = (type, id) => {
    setModalType(type);
    setCurrentChapterId(id);
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
    setModalType(null);
  };

  return (
    <Box p="4">
      <Heading
        as="h1"
        size="2xl"
        mb="4">
        LMS Project
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex mb="4">
          <Input
            name="chapter"
            placeholder="Enter chapter title"
            ref={chapterRef}
            onChange={handleChapterChange}
          />
          <Spacer mx="2" />
          <Button
            type="submit"
            colorScheme="blue">
            Add
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
                  {item.chapter}
                </Box>
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
                <IconButton
                  aria-label="Delete chapter"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  mr="2"
                  onClick={() => handleDeleteChapter(item.id)}
                />
                <AccordionIcon />
              </AccordionButton>
            </h2>
             {/* sorting the lessons and the vedios by the date so they will be displayed correctelly in the panel  */}
            {[...item.lessons, ...item.videos]
              .sort((a, b) => a.date - b.date)
              .map((item, index) => (
                <AccordionPanel
                  pb="4"
                  key={item.id}>
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
      <LessonModal
        isOpen={show}
        onClose={handleModalClose}
        onSave={(data) => handleAddData(data)}
        chapterId={currentChapterId}
        modalType={modalType}
      />
    </Box>
  );
};

export default CourseDetailsPage;
